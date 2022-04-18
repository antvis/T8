---
title: Show Case
order: 0
group:
  path: /show
  title: 使用示例
  order: 0
nav:
  title: 解读文本可视化
  path: /narrative
  order: 1
---

## Booking

```jsx
import React from 'react';
import { NarrativeTextVis } from '@antv/narrative-text-vis';
import booking from './mock/booking.json';

export default () => <NarrativeTextVis spec={booking} />;
```
