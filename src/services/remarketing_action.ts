// @ts-ignore
import { RemarketingAction } from 'google-ads-node/build/lib/resources'

import Service, { Mutation } from './service'
import { ServiceListOptions, ServiceCreateOptions } from '../types'

/**
 * @constants
 */
const RESOURCE_URL_NAME = 'remarketingActions'
const MUTATE_METHOD = 'mutateRemarketingActions'
const MUTATE_REQUEST = 'MutateRemarketingActionsRequest'
const OPERATION_REQUEST = 'RemarketingActionOperation'
const GET_METHOD = 'getRemarketingAction'
const GET_REQUEST = 'GetRemarketingActionRequest'
const RESOURCE = 'RemarketingAction'

export default class RemarketingActionService extends Service {
    public async get(id: number | string): Promise<RemarketingAction> {
        return this.serviceGet({
            request: GET_REQUEST,
            resource: `${RESOURCE_URL_NAME}/${id}`,
            method: GET_METHOD,
            entity_id: id,
        }) as RemarketingAction
    }

    public async list(options?: ServiceListOptions): Promise<Array<{ remarketing_action: RemarketingAction }>> {
        return this.getListResults('remarketing_action', options)
    }

    public async create(
        remarketing_action: RemarketingAction | Array<RemarketingAction>,
        options?: ServiceCreateOptions
    ): Promise<Mutation> {
        return this.serviceCreate({
            request: MUTATE_REQUEST,
            operation: OPERATION_REQUEST,
            mutate: MUTATE_METHOD,
            entity: [RESOURCE, remarketing_action],
            ...options,
        })
    }

    public async update(
        remarketing_action: RemarketingAction | Array<RemarketingAction>,
        options?: ServiceCreateOptions
    ): Promise<Mutation> {
        return this.serviceUpdate({
            request: MUTATE_REQUEST,
            operation: OPERATION_REQUEST,
            mutate: MUTATE_METHOD,
            entity: [RESOURCE, remarketing_action],
            ...options,
        })
    }

    public async delete(id: number | string, options?: ServiceCreateOptions) {
        return this.serviceDelete({
            request: MUTATE_REQUEST,
            operation: OPERATION_REQUEST,
            mutate: MUTATE_METHOD,
            resource: `${RESOURCE_URL_NAME}/${id}`,
            entity_id: id,
            ...options,
        })
    }
}
