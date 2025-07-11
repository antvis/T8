---
title: 快速开始
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

更详细的 API 及示例请看 [基本样式与 API](./example/style)。
