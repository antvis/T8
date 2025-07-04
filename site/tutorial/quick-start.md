---
title: 快速开始
order: 0
group:
  path: /introduce
  title: 简介
  order: 0
nav:
  title: 教程
  path: /guide
  order: 0
---

# 快速开始

## T8 是什么

> WIP: T8 是 AntV 技术栈下文本可视化解决方案，其中 T 代表 Text，8 代表一个字节 8 bits，寓意这个工具可以深度透视文本底下的洞察。

当前主要致力于细分领域：**基于洞察的解读文本（narrative-text）展示及编辑能力**，本站点均是 narrative-text 相关内容。

<div style="padding: 12px; background-color: rgba(129, 179, 248, 0.5);">

**_text-schema 构建成本高不如直接拼接 DOM 快，我为什么还要用 T8？_**

要解答这个问题需要先明确 json 从哪儿来？

narrative 相关技术基于 json 数据来自服务端生成的假设，前端消费 schema 进行渲染即可。随着数据表达的多样性和即时性的要求越来越高，以及 NLP 技术越来越多的被应用，前端维护文本模版将不可持续。此时使用 NarrativeTextVis 进行统一渲染将是最佳选择。

但是不可否认仍然将有很长一段时间，类似的文本表达可以通过默认的一套或者几套模版满足需求，结合 text-schema 的学习成本，使用前端熟悉的 dom/jsx 进行开发似乎是更好的选择。<u>_如果你的业务对文本表述扩展性要求不高，且模版相对固定，请使用你熟悉的语法。_</u> 但是如果使用 text-schema 将带来以下好处：

- 作为一种解读文本的标准描述，可静态化文本数据结构，一处维护各处复用，比如之后复用给 vue、web components，还有利于数据储存和进一步消费。
- 样式规范，默认好看；
- 行内小图（word-scale chart）是默认的支持的，并且随着版本升级可获得更多行内数据展示；
- 相关交互的可扩展性；

</div>

## 使用场景

在数据分析全流程展示上，除了可视化图表外，通过**文本**描述数据现象、给出洞察结论辅助分析，也十分重要。

尤其随着增强分析技术的发展，借助 NLP（自然语言处理）直接输出的数据文本描述需要渲染引擎将其呈现在用户界面。narrative-text 相关技术方案就是针对该场景的解决方案。

## 特性

- 数据解读文本的规范描述 json schema（[narrative-text-schema](../../schema/intro)）；
- text-schema 的 React 渲染引擎 [\<NarrativeTextVis \/\>](../../narrative/intro)；
  - 解析文本结构描述 json schema 为 html；
  - 数据短语（如指标值、比率、差值、占比、贡献度等）标准视觉表示；
  - 行内小图（mini pie、mini line）数据驱动展示，提高文本看数效率；
  - WIP：图文联动、图图联动提高看数效率，辅助洞察分析；
- 交互优化辅助构建 text-schema 的解读富文本编辑器 [NarrativeTextEditor](../../editor/intro)（WIP，内部孵化中，联系开发同学辅助使用）

## 技术架构

![T8 架构图](https://gw.alipayobjects.com/mdn/rms_e59602/afts/img/A*Of0KQoxGnHAAAAAAAAAAAAAAARQnAQ)

## 基本使用

### Step1：获取/构建 `narrative-text-schema`

`narrative-text-schema` 是描述解读的标准化 json 结构，是输入到渲染引擎的标准数据结构，该结构包括三个层次：

- `Narrative`：文章整体结构，含标题（`Headline`）和主题区块（`Section`）；
- `Section`：由多个段落（`Paragraph`）组成；
- `Paragraph`：段落有由多个短语（`Phrase`）组成；
- `Phrase`：短语即原子数据描述单元，分为三种：
  - 纯文本短语（Text Phrase）；
  - 数据实体短语（Entity Phrase）：内置的数据分析领域中常见的描述数据相关属性的短语，如指标值、指标名、贡献度、占比等，完整内置短语列表可点击 [Entity Phrase 样式](../../narrative/example/style#phrase) 查看；
  - 自定义短语（Custom Phrase）；

更多细节可点击 [text-schema 介绍](../../schema/intro) 查看。

### Step2：将 schema 数据输入给 `<NarrativeTextVis />` 组件即可；

```jsx | pure
import { NarrativeTextVis } from '@antv/narrative-text-vis';
export default () => <NarrativeTextVis spec={textSpec} />;
```

```jsx
import React from 'react';
import { Row, Col } from 'antd';
import { NarrativeTextVis } from '@antv/narrative-text-vis';
import ReactJson from 'react-json-view';
import booking from '../packages/NarrativeTextVis/docs/mock/booking.json';

export default () => (
  <Row gutter={32}>
    <Col span={12}>
      <NarrativeTextVis spec={booking} />
    </Col>
    <Col span={12}>
      <ReactJson src={booking} name="textSpec" collapsed={4} />
    </Col>
  </Row>
);
```

所有数据短语样式一览：
![Entity Phrase 样式](https://gw.alipayobjects.com/mdn/rms_e59602/afts/img/A*dWJAQZjoYnQAAAAAAAAAAAAAARQnAQ)
