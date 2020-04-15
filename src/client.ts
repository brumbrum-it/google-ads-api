import Bottleneck from 'bottleneck'
import crypto from 'crypto'
import { noop } from 'lodash'

import Customer, { CustomerInstance } from './customer'
import GrpcClient, { GoogleAdsNodeOptions } from './grpc'
import { normaliseCustomerId } from './utils'
import { PreReportHook, PostReportHook } from './types'

// FIXME aggiungere typing di ServiceAccount
// le chiavi obbligatorie sono
// private_key (String PEM)
// client_id
// auth_uri
// token_uri
// client_email

// FIXME qua client_secret e client_id devono essere opzionali se
// presente ServiceAcccount
// se puo' renderne opzionale solo una switchamo client_secret
// e allora client_id del serviceaccount non serve piu'
interface ClientOptions {
    readonly client_id: string
    readonly client_secret: string // FIXME default null
    readonly developer_token: string
    readonly redis_options?: any
}

interface CustomerAuth {
    customer_account_id?: string
    refresh_token?: string
    login_customer_id?: string
}

interface CustomerOptions extends CustomerAuth, GoogleAdsNodeOptions {
    pre_report_hook?: PreReportHook
    post_report_hook?: PostReportHook
}

export default class GoogleAdsApi {
    private readonly options: ClientOptions
    private throttler: Bottleneck

    constructor(options: ClientOptions) {
        this.options = options

        const throttler_options = {
            minTime: 10, // roughly 100 requests per second
            id:
                'id' +
                crypto
                    .createHash('md5')
                    .update(this.options.developer_token)
                    .digest('hex'), // don't want to leak dev token to redis
            /* Clustering options */
            datastore: this.options.redis_options ? 'redis' : 'local',
            clearDatastore: false,
            clientOptions: this.options.redis_options,
            timeout: 1000 * 60 * 10,
        }

        this.throttler = new Bottleneck(throttler_options)

        this.throttler.on('error', err => {
            console.error('Could not connect to redis: ')
            console.error(err)
        })
    }

    public Customer({
        customer_account_id,
        refresh_token,
        login_customer_id,
        pre_report_hook,
        post_report_hook,
        prevent_mutations,
        logging,
    }: CustomerOptions): CustomerInstance {
        if (!customer_account_id || !refresh_token) {
            throw new Error('Must specify {customer_account_id, refresh_token}')
        }

        pre_report_hook = pre_report_hook || noop
        post_report_hook = post_report_hook || noop

        customer_account_id = normaliseCustomerId(customer_account_id)
        login_customer_id = normaliseCustomerId(login_customer_id)

        const gads_node_options = {
            prevent_mutations,
            logging,
        }

        const client = new GrpcClient(
            //FIXME levare tutti i parametri singoli
            //e passare un GrpcClientOptions
            this.options.developer_token,
            this.options.client_id,
            this.options.client_secret,
            refresh_token as string,
            login_customer_id,
            gads_node_options
        )

        return Customer(customer_account_id, client, this.throttler, pre_report_hook, post_report_hook)
    }
}
