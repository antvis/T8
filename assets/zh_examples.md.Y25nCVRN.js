import{C as d,o as s,c as m,j as a,a as l,E as i,aO as r}from"./chunks/framework.CIpEyjR8.js";const h=JSON.parse('{"title":"交互式示例","description":"","frontmatter":{"title":"交互式示例"},"headers":[],"relativePath":"zh/examples.md","filePath":"zh/examples.md"}'),c={name:"zh/examples.md"},v=Object.assign(c,{setup(u){const t=`# 2024 年智能手机市场分析

## 市场概况

全球[智能手机出货量](metric_name)在 [2024 年](time_desc)达到 [12 亿台](metric_value, origin=1200000000)，同比显示出[适度下降 2.1%](ratio_value, origin=-0.021, assessment="negative")。

**高端市场**（800 美元以上设备）表现出*显著的*[韧性](trend_desc, assessment="positive")，增长了 [5.8%](ratio_value, origin=0.058, assessment="positive")。[平均售价](other_metric_value)为 [420 美元](metric_value, origin=420, unit="USD")。

## 主要发现

1. [亚太地区](dim_value)仍然是__最大的市场__
2. [高端设备](dim_value)表现出**强劲增长**
3. 预算市场面临*阻力*

### 亚太地区

[亚太地区](dim_value)仍然是最大的市场，出货量为 [6.8 亿台](metric_value, origin=680000000)，尽管这代表着比去年[下降了 1.8 亿台](delta_value, origin=-180000000, assessment="negative")。

主要市场：
- [中国](dim_value)：[3.2 亿台](metric_value, origin=320000000) - 下降 [8.5%](ratio_value, origin=-0.085, assessment="negative")，全球[排名第 1](rank, detail=[320, 180, 90, 65, 45])，占地区销售额的 [47%](contribute_ratio, origin=0.47, assessment="positive")
- [印度](dim_value)：[1.8 亿台](metric_value, origin=180000000) - 增长 [12.3%](ratio_value, origin=0.123, assessment="positive")，[排名第 2](rank, detail=[320, 180, 90, 65, 45])，占预算市场的 [四分之三](proportion, origin=0.45)
- [东南亚](dim_value)：[1.8 亿台](metric_value, origin=180000000) - [稳定](trend_desc, assessment="equal")

[中国](dim_value)和[印度](dim_value)之间的 [1.4 亿台差距](difference, detail=[200, 180, 160, 140])正在[缩小](trend_desc, assessment="neutral")。

### 市场动态

销售额与经济指标显示出[强相关性](association, detail=[{"x":100,"y":105},{"x":120,"y":128},{"x":150,"y":155}])。[分布](distribution, detail=[15, 25, 35, 15, 10])是[不均匀的](anomaly, detail=[15, 18, 20, 65, 22])，在城市地区有[意外集中](anomaly, detail=[15, 18, 20, 65, 22])。

我们观察到[明显的季节性](seasonality, detail={"data":[80, 90, 95, 135], "range":[0, 150]})，[第四季度高峰](seasonality, detail={"data":[80, 90, 95, 135]})由假日购物驱动。

有关详细方法，请访问[我们的研究页面](https://example.com/methodology)。`;return(_,e)=>{const n=d("CopyOrDownloadAsMarkdownButtons"),o=d("T8Example");return s(),m("div",null,[e[0]||(e[0]=a("div",{style:{display:"none"},hidden:"true","aria-hidden":"true"},"Are you an LLM? You can read better optimized documentation at /zh/examples.md for this page in Markdown format",-1)),e[1]||(e[1]=a("h1",{id:"交互式示例",tabindex:"-1"},[l("交互式示例 "),a("a",{class:"header-anchor",href:"#交互式示例","aria-label":'Permalink to "交互式示例"'},"​")],-1)),i(n),e[2]||(e[2]=r('<p>探索 T8 功能和特性的综合示例。每个示例展示了 T8 文本可视化能力的不同方面，并包含完整的 T8 语法源代码。</p><h2 id="示例-2024-年智能手机市场分析" tabindex="-1">示例：2024 年智能手机市场分析 <a class="header-anchor" href="#示例-2024-年智能手机市场分析" aria-label="Permalink to &quot;示例：2024 年智能手机市场分析&quot;">​</a></h2><p>这个综合示例展示了 T8 在渲染具有丰富实体注释和内联可视化的数据驱动叙事文本方面的能力。该示例包括：</p><ul><li>多种实体类型（指标、维度、趋势、比率等）</li><li>内联迷你图表（分布、相关性、季节性）</li><li>复杂的数据关系（排名、比例、比较）</li><li>带有章节和小节的结构化 Markdown</li></ul><h3 id="流式渲染" tabindex="-1">流式渲染 <a class="header-anchor" href="#流式渲染" aria-label="Permalink to &quot;流式渲染&quot;">​</a></h3><p>观看内容逐步渲染，模拟实时数据流或 AI 生成的内容。非常适合数据逐步到达的场景。</p>',6)),i(o,{syntax:t,mode:"streaming"}),e[3]||(e[3]=a("h3",{id:"暗色主题与自定义设置",tabindex:"-1"},[l("暗色主题与自定义设置 "),a("a",{class:"header-anchor",href:"#暗色主题与自定义设置","aria-label":'Permalink to "暗色主题与自定义设置"'},"​")],-1)),e[4]||(e[4]=a("p",null,"使用暗色主题和自定义排版设置（12px 字体大小，20px 行高）渲染相同的内容。",-1)),i(o,{syntax:t,mode:"dark","container-class":"dark"}),e[5]||(e[5]=a("h3",{id:"自定义插件-样式化维度值",tabindex:"-1"},[l("自定义插件 - 样式化维度值 "),a("a",{class:"header-anchor",href:"#自定义插件-样式化维度值","aria-label":'Permalink to "自定义插件 - 样式化维度值"'},"​")],-1)),e[6]||(e[6]=a("p",null,"此示例展示了如何使用插件自定义实体渲染。在这里，维度值（如国家/地区名称）使用自定义颜色和字体进行样式化。",-1)),i(o,{syntax:t,mode:"custom-plugin"}),e[7]||(e[7]=r('<h2 id="理解-t8-语法" tabindex="-1">理解 T8 语法 <a class="header-anchor" href="#理解-t8-语法" aria-label="Permalink to &quot;理解 T8 语法&quot;">​</a></h2><p>以上示例使用 <strong>T8 语法</strong> - 一种基于 Markdown 的声明式语言，用于叙事文本可视化。演示的主要功能：</p><h3 id="实体注释" tabindex="-1">实体注释 <a class="header-anchor" href="#实体注释" aria-label="Permalink to &quot;实体注释&quot;">​</a></h3><p>实体使用括号表示法标记：<code>[文本](entity_type, properties)</code></p><ul><li><code>[智能手机出货量](metric_name)</code> - 指标名称</li><li><code>[12 亿台](metric_value, origin=1200000000)</code> - 带有原始数据的指标值</li><li><code>[2024 年](time_desc)</code> - 时间描述</li><li><code>[适度下降 2.1%](ratio_value, origin=-0.021, assessment=&quot;negative&quot;)</code> - 带有情感的比率</li><li><code>[亚太地区](dim_value)</code> - 维度值（类别、地区等）</li><li><code>[韧性](trend_desc, assessment=&quot;positive&quot;)</code> - 趋势描述</li><li><code>[排名第 1](rank, detail=[320, 180, 90, 65, 45])</code> - 带有数据的排名</li></ul><h3 id="内联可视化" tabindex="-1">内联可视化 <a class="header-anchor" href="#内联可视化" aria-label="Permalink to &quot;内联可视化&quot;">​</a></h3><ul><li><code>[分布](distribution, detail=[15, 25, 35, 15, 10])</code> - 迷你条形图</li><li><code>[强相关性](association, detail=[...])</code> - 散点图</li><li><code>[明显的季节性](seasonality, detail={...})</code> - 折线图</li><li><code>[1.4 亿台差距](difference, detail=[200, 180, 160, 140])</code> - 差异指示器</li></ul><h3 id="markdown-格式" tabindex="-1">Markdown 格式 <a class="header-anchor" href="#markdown-格式" aria-label="Permalink to &quot;Markdown 格式&quot;">​</a></h3><p>支持标准 Markdown 语法：</p><ul><li><code>**粗体**</code> 表示强调</li><li><code>*斜体*</code> 表示轻微强调</li><li><code>__下划线__</code> 表示突出显示</li><li>标题（<code>#</code>、<code>##</code>、<code>###</code>）用于结构</li><li>列表（编号和项目符号）</li><li>链接</li></ul><p>在 <a href="/zh/syntax/">T8 语法文档</a>中了解更多。</p>',11))])}}});export{h as __pageData,v as default};
