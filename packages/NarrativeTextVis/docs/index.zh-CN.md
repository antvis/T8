---
title: NarrativeTextVis
order: 0
group:
  path: /intro
  title: 介绍
  order: 0
nav:
  title: 解读文本可视化
  path: /narrative
  order: 1
---

`@antv/narrative-text-vis` 是一套消费 [text-schema](../../schema/intro) 实现的数据解读文本渲染的 React 组件库。引入方式如下：

```js | pure
import {
  NarrativeTextVis,
  Paragraph,
  Phrase,
  // ...
} from '@antv/narrative-text-vis';
```

包括内容如下：
- 整体解读文本组件 `NarrativeTextVis`；
- 各级解读结构 `Section`、`Paragraph` 和 `Phrase`；
- 导出全量 [text-schema](../../schema/intro)；


## Show Case

```jsx
import React from 'react';
import { NarrativeTextVis } from '@antv/narrative-text-vis';
import booking from './mock/booking.json';

export default () => <NarrativeTextVis spec={booking} />;
```
