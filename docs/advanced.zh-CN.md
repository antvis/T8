---
title: 进阶用法
order: 2
group:
  path: /introduce
  title: 简介
  order: 0
nav:
  title: 教程
  path: /guide
  order: 0
---

# NarrativeTextVis 高级特性

NarrativeTextVis 有一套插件体系可以通过传入自定义插件扩展短语和段落。因此可扩展的完成各类数据文本的展示与交互。

## 自定义数据短语样式

虽然我们有提供默认的数据短语（EntityPhrase）样式，并作为规范，但是各类业务中可能会有定制，此时你只需将插件实例化之后传入组件即可完成全局同类型的数据短语样式自定义。如下例子做了如下修改：
- 将默认的指标值（metric_value）修改颜色并提供了背景色；
- 默认的差值为正负号，比率为上下三角，都定制为了上下箭头；

更多自定义 EntityPhrase 的 API 描述可点击 [EntityPhrase](../../narrative/example/custom#自定义实体短语entityphrase展示) 查看。

```jsx
import React from 'react';
import { NarrativeTextVis, PluginManager, createMetricName, createRatioValue, createDeltaValue } from '@antv/narrative-text-vis';
import booking from '../packages/NarrativeTextVis/docs/mock/booking.json';

const plugins = [
  // 修改指标名的显示逻辑
  createMetricName({
    encoding: {
      bgColor: '#F8FAFC',
      color: '#424241',
      fontWeight: 600,
    },
    style: {
      padding: '0 6px',
    }
  }),
  createRatioValue({
    encoding: {
      // 修改默认着色
      color: (text, { assessment }) => assessment === 'positive'? '#f4664a': assessment === 'negative'? '#269075' : '',
      // 修改比率左侧的标记为上下箭头
      prefix: (text, { assessment }) => assessment === 'positive'? '↑': assessment === 'negative'? '↓' : ''
    }
  }),
  createDeltaValue({
    encoding: {
      // 修改差值左侧的标记为上下箭头
      color: (text, { assessment }) => assessment === 'positive'? '#f4664a': assessment === 'negative'? '#269075' : '',
      // 修改默认着色
      prefix: (text, { assessment }) => assessment === 'positive'? '↑': assessment === 'negative'? '↓' : ''
    }
  })
]

const pluginManager = new PluginManager(plugins);

export default () => {
  return (
    <>
      <NarrativeTextVis spec={booking} pluginManager={pluginManager} />
    </>
  )
};
```


## 自定义短语扩展展现与交互

除了内置的 EntityPhrase，还可以通过自定义短语扩展更多自定义实现。点击 [CustomPhrase](../../narrative/example/custom#自定义短语customphrase节点) 查看示例以及更多用法，通过自定义场景类型短语，允许用户 hover 对应场景获得详情。

同时借助自定义短语还可以扩展更多有用的文本交互辅助分析，点击 [洞察分析](../../narrative/example/interactive#洞察分析) 查看 demo。

## 自定义区块嵌入可视化图表

除了短语级别的自定义，快级元素 Section 和 Paragraph 除了默认支持的类型也提供了自定义能力，就可以完成诸如用户完成图表嵌入文本以及相关基本的图文交互等。

点击 [图表联动](../../narrative/example/interactive#图表联动) 查看 demo，点击 [CustomBlock](../../narrative/example/custom#自定义区块customblock) 获取 API 用法详情。
