---
title: Get FeedItem
order: 2.1
type: get_code
entity: FeedItem
---

```javascript
// Getting the entity
let result = await customer.feedItems.get('customers/3827277046/feedItems/43009393~9779152283')
```

```javascript
// Example result
;({
  attribute_values: [
    {
      feed_attribute_id: 1,
      string_value: 'AdWords Knowledge Base',
      integer_values_list: [],
      boolean_values_list: [],
      string_values_list: [],
      double_values_list: [],
    },
    {
      feed_attribute_id: 3,
      string_value: 'Adwords Guides, Case Studies',
      integer_values_list: [],
      boolean_values_list: [],
      string_values_list: [],
      double_values_list: [],
    },
    {
      feed_attribute_id: 4,
      string_value: 'Chrome Extensions and more!',
      integer_values_list: [],
      boolean_values_list: [],
      string_values_list: [],
      double_values_list: [],
    },
    {
      feed_attribute_id: 5,
      integer_values_list: [],
      boolean_values_list: [],
      string_values_list: ['https://opteo.com/docs'],
      double_values_list: [],
    },
  ],
  feed: 'customers/3827277046/feeds/43009393',
  geo_targeting_restriction: 0,
  id: 9779152283,
  policy_infos: [
    {
      placeholder_type_enum: 2,
      feed_mapping_resource_name: 'customers/3827277046/feedMappings/43009393~46066123',
      review_status: 3,
      approval_status: 2,
      policy_topic_entries_list: [{ topic: 'DESTINATION_MISMATCH', type: 2, evidences_list: [], constraints_list: [] }],
      validation_status: 4,
      validation_errors_list: [],
      quality_approval_status: 0,
      quality_disapproval_reasons_list: [],
    },
  ],
  resource_name: 'customers/3827277046/feedItems/43009393~9779152283',
  status: 3,
  url_custom_parameters: [],
})
```
