---
title: Update CampaignBudget
order: 5
type: update
entity: CampaignBudget
---

This section describes how to update a CampaignBudget.

```javascript
// Updating the entity

const campaign_budget = {
    resource_name: 'customers/9262111890/campaignBudgets/1536143460', // The resource_name is required
    // ...any other fields that you would like to update
}

const results = await customer.campaignBudgets.update(campaign_budget)

console.log(results) // ['customers/9262111890/campaignBudgets/1536143460']
```