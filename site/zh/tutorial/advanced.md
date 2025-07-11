---
title: 进阶用法
---

# Text 高级特性

Text 有一套插件体系可以通过传入自定义插件扩展短语和段落。因此可扩展的完成各类数据文本的展示与交互。

## 自定义数据短语样式

虽然我们有提供默认的数据短语（EntityPhrase）样式，并作为规范，但是各类业务中可能会有定制，此时你只需将插件实例化之后传入组件即可完成全局同类型的数据短语样式自定义。如下例子做了如下修改：

- 将默认的指标值（metric_value）修改颜色并提供了背景色；
- 默认的差值为正负号，比率为上下三角，都定制为了上下箭头；

更多自定义 EntityPhrase 的 API 描述可点击 [EntityPhrase](../narrative/example/custom#自定义实体短语entityphrase展示) 查看。

```jsx
import { Text, createDimensionValue } from '@antv/t8';

const booking = {
  /* */
};

const dimensionValueDescriptor = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  style: (value, _, themeSeedToken) => ({
    color: 'red',
    fontSize: 28,
  }),
  tooltip: false,
};

export const dimensionPlugin = createDimensionValue(dimensionValueDescriptor, 'overwrite');

const text = new Text({
  container: 'container',
});

text4.schema(book);
text4.registerPlugin(dimensionPlugin);
text4.render();
```

<!-- TODO: -->

## 自定义短语扩展展现与交互

除了内置的 EntityPhrase，还可以通过自定义短语扩展更多自定义实现。点击 [CustomPhrase](../vis/custom.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%9F%AD%E8%AF%AD-customphrase-%E8%8A%82%E7%82%B9) 查看示例以及更多用法，通过自定义场景类型短语，允许用户 hover 对应场景获得详情。

<!-- 同时借助自定义短语还可以扩展更多有用的文本交互辅助分析，点击 [洞察分析](../../narrative/example/interactive#洞察分析) 查看 demo。 -->

## 自定义区块嵌入可视化图表

除了短语级别的自定义，快级元素 Section 和 Paragraph 除了默认支持的类型也提供了自定义能力，就可以完成诸如用户完成图表嵌入文本以及相关基本的图文交互等。

点击 [图表联动](../../narrative/example/interactive#图表联动) 查看 demo，点击 [CustomBlock](../../narrative/example/custom#自定义区块customblock) 获取 API 用法详情。
