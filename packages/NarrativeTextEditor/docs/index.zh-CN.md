---
title: 解读编辑器
order: 0
group:
  path: /
  title: 解读编辑器
  order: 0
nav:
  title: 解读编辑器
  path: /editor
  order: 2
---

# 解读编辑器

```jsx
import React from 'react';
import { NarrativeTextEditor } from '@antv/narrative-text-editor';

export default () => (
  <NarrativeTextEditor
    id="basic"
    variableMap={{
      "startDate": { value: '2022.03', metadata: { entityType: 'time_desc' } },
      "endDate": { value: '2022.04', metadata: { entityType: 'time_desc' } },
      "主指标": { value: 'DAU', metadata: { entityType: 'metric_name' } },
      "指标值": { value: '1.23亿', metadata: { entityType: 'metric_value' } },
    }}  
  />
);
```
