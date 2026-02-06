import{C as d,o as s,c as m,j as a,a as l,E as i,aO as r}from"./chunks/framework.B94FpWDj.js";const h=JSON.parse('{"title":"交互式示例","description":"","frontmatter":{"title":"交互式示例"},"headers":[],"relativePath":"zh/examples.md","filePath":"zh/examples.md"}'),c={name:"zh/examples.md"},v=Object.assign(c,{setup(u){const t=`# 2024 年智能手机市场分析

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

有关详细方法，请访问[我们的研究页面](https://example.com/methodology)。`;return(_,e)=>{const n=d("CopyOrDownloadAsMarkdownButtons"),o=d("T8Example");return s(),m("div",null,[e[0]||(e[0]=a("div",{style:{display:"none"},hidden:"true","aria-hidden":"true"},"Are you an LLM? You can read better optimized documentation at /zh/examples.md for this page in Markdown format",-1)),e[1]||(e[1]=a("h1",{id:"交互式示例",tabindex:"-1"},[l("交互式示例 "),a("a",{class:"header-anchor",href:"#交互式示例","aria-label":'Permalink to "交互式示例"'},"​")],-1)),i(n),e[2]||(e[2]=r("",6)),i(o,{syntax:t,mode:"streaming"}),e[3]||(e[3]=a("h3",{id:"暗色主题与自定义设置",tabindex:"-1"},[l("暗色主题与自定义设置 "),a("a",{class:"header-anchor",href:"#暗色主题与自定义设置","aria-label":'Permalink to "暗色主题与自定义设置"'},"​")],-1)),e[4]||(e[4]=a("p",null,"使用暗色主题和自定义排版设置（12px 字体大小，20px 行高）渲染相同的内容。",-1)),i(o,{syntax:t,mode:"dark","container-class":"dark"}),e[5]||(e[5]=a("h3",{id:"自定义插件-样式化维度值",tabindex:"-1"},[l("自定义插件 - 样式化维度值 "),a("a",{class:"header-anchor",href:"#自定义插件-样式化维度值","aria-label":'Permalink to "自定义插件 - 样式化维度值"'},"​")],-1)),e[6]||(e[6]=a("p",null,"此示例展示了如何使用插件自定义实体渲染。在这里，维度值（如国家/地区名称）使用自定义颜色和字体进行样式化。",-1)),i(o,{syntax:t,mode:"custom-plugin"}),e[7]||(e[7]=r("",11))])}}});export{h as __pageData,v as default};
