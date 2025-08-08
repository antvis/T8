---
url: /zh/schema/structure.md
---

# 总体结构说明

![overview](https://gw.alipayobjects.com/mdn/rms_e59602/afts/img/A*QpAmQYCQL2cAAAAAAAAAAAAAARQnAQ)

一份数据报告从整体结构上，包括：

* `Headline` 标题；
* `Section` 段落，用于划分不同报告主题；

`Section` 内包含了多个 `Paragraph`，段落类型可能有：

* `heading1` ~ `heading6`（注意这里和报告级别的 不同，Headline 不同，Headline 特指文章标题）；
* `normal` 即普通文本段落，对应 html 的 `<p>` 标签；
* `bullets` 列表，可以分为有序列表和无序列表，对应 html 的 `<ul>` 和 `<ol>` 标签，支持多级列表嵌套；
* `custom` 自定义段落类型；
* `visualization` 可视化图表（暂不支持，可通过自定义段落实现）；

`Section` 除了标准类型含多个 `Paragraph` 之外，还可以自定义。

除了自定义段落之外，`heading`、`normal`、`bullets` 都是由多个 `Phrase` 组成的，即短语，`Phrase` 的类型主要包括：

* `text` 纯文本;
* `entity` 实体，也就是数据报告中对应明细数据的内容;
* `custom` 自定义短语;

***

最新的 `T8` 标准 JSON Schema 定义如下，或者从远程源 [unpkg.com](http://unpkg.com/@antv/t8/dist/schema.json) 抓取：

<<< @/../schema.json
