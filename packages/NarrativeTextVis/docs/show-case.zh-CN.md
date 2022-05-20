---
title: Show Case
order: 1
group:
  path: /example
  title: 使用示例
  order: 1
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
