---
title: 快速开始
---

# 快速开始

## T8 是什么

> T8 是 AntV 技术栈下文本可视化解决方案，其中 T 代表 Text，8 代表一个字节 8 bits，寓意这个工具可以深度透视文本底下的洞察。

当前主要致力于细分领域：**基于洞察的解读文本（narrative-text）展示及编辑能力**。

<div class="info-box">

**_`text-schema` 构建成本高不如直接拼接 DOM 快，我为什么还要用 T8？_**

要解答这个问题需要先明确 `JSON` 从哪儿来？

narrative 相关技术基于 `JSON` 数据来自 LLM 大模型生成的假设，前端消费 schema 进行渲染即可。随着数据表达的多样性和即时性的要求越来越高，以及 NLP 技术越来越多的被应用，前端维护文本模版将不可持续。此时使用 NarrativeTextVis 进行统一渲染将是最佳选择。

但是不可否认仍然将有很长一段时间，类似的文本表达可以通过默认的一套或者几套模版满足需求，结合 `text-schema` 对于的学习成本，使用前端熟悉的 `dom/jsx` 进行开发似乎是更好的选择。<u>_如果你的业务对文本表述扩展性要求不高，且模版相对固定，请使用你熟悉的语法。_</u> 但是如果使用 text-schema 将带来以下好处：

- 作为一种解读文本的标准描述，可静态化文本数据结构，一处维护各处复用;
- `JSON` 格式决定了其有利于数据储存和进一步消费;
- 样式规范，默认好看；
- 行内小图（word-scale chart）是默认的支持的，并且随着版本升级可获得更多行内数据展示；
- 相关交互的可扩展性；

</div>

## 使用场景

在数据分析全流程展示上，除了可视化图表外，通过**文本**描述数据现象、给出洞察结论辅助分析，也十分重要。

尤其随着增强分析技术的发展，借助 NLP（自然语言处理）直接输出的数据文本描述需要渲染引擎将其呈现在用户界面。narrative-text 相关技术方案就是针对该场景的解决方案。

## 特性

- 数据解读文本的 T8 语法描述（[T8 语法参考](../syntax/index.md)）；
- text-schema 的纯 JS 渲染引擎 `Text`；
  - 解析文本结构描述 json schema 为 html；
  - 数据短语（如指标值、比率、差值、占比、贡献度等）标准视觉表示；
  - 行内小图（mini pie、mini line）数据驱动展示，提高文本看数效率；

## 基本使用

T8 可以使用常规的包管理工具安装，例如 npm 或者 Yarn 等。

```bash
$ npm install @antv/t8
```

```bash
$ yarn add @antv/t8
```

安装之后，在 T8 这个库中，就可以导出 `Text` 对象和 API。

```html
<div id="container"></div>
```

```js
import { Text } from '@antv/t8';

// 使用 T8-DSL 语法编写的叙述性文本
const narrativeText = `
# 销售报告

本季度 [销售额](metric_name) 高于往常。销售额为 [¥348k](metric_value, origin=348.12)。

[销售额](metric_name) 相比上季度同期上涨了 [¥180.3k](delta_value, assessment="positive")。
`;

// 实例化 Text
const text = new Text(document.getElementById('app'));

// 使用 render 方法传入 T8 语法字符串
text.theme('dark').render(narrativeText);

// 卸载
const unmount = text.render(narrativeText);
unmount();
```

如果没有遇到其他问题的话，你就可以获得以下的数据清晰的文本可视化效果了。

你也可以使用 T8-DSL 语法，这是一种更直观的创建叙述性文本的方式：

::: my-sandbox {template=vanilla-ts}

```ts index.ts
import { Text } from '@antv/t8';

// 使用 T8-DSL 语法编写的叙述性文本
const narrativeText = `
# 本季度销售额高于往常

本季度 [销售额](metric_name) 高于往常。销售额为 [¥348k](metric_value, origin=348.12)。共完成了 [29 笔交易](metric_value)，[平均交易额](metric_name) 为 [¥12k](metric_value)。

[销售额](metric_name) 相比上季度同期上涨了 [¥180.3k](delta_value, assessment="positive")。相比去年同期上涨了 [¥106.1k](delta_value, assessment="positive")。
`;

// 实例化 Text
const text = new Text(document.getElementById('app'));

// 使用 render 方法传入 T8 语法字符串
text.theme('light').render(narrativeText);
```

:::

<style>
.info-box {
  padding: 12px;
  background-color: #646cff24;
  border-radius: 8px;
}
</style>
