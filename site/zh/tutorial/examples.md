---
title: 交互式示例
---

# 交互式示例

探索 T8 功能和特性的综合示例。每个示例展示了 T8 文本可视化能力的不同方面，并包含完整的 T8 语法源代码。

## 示例：2024 年智能手机市场分析

这个综合示例展示了 T8 在渲染具有丰富实体注释和内联可视化的数据驱动叙事文本方面的能力。该示例包括：

- 多种实体类型（指标、维度、趋势、比率等）
- 内联迷你图表（分布、相关性、季节性）
- 复杂的数据关系（排名、比例、比较）
- 带有章节和小节的结构化 Markdown

### 流式渲染

观看内容逐步渲染，模拟实时数据流或 AI 生成的内容。非常适合数据逐步到达的场景。

::: my-sandbox {template=vanilla-ts}

```ts index.ts
import { Text } from '@antv/t8';

const syntax = `
# 2024 年智能手机市场分析

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

有关详细方法，请访问[我们的研究页面](https://example.com/methodology)。
`;

// 流式渲染 - 逐步渲染内容
const app = document.getElementById('app');
const text = new Text(app!);

(async () => {
  let chunk = '';
  for (let i = 0; i < syntax.length; i += 10) {
    chunk += syntax.slice(i, i + 10);
    text.render(chunk);
    await new Promise((resolve) => setTimeout(resolve, 160));
  }
})();
```

:::

### 暗色主题与自定义设置

使用暗色主题和自定义排版设置（12px 字体大小，20px 行高）渲染相同的内容。

::: my-sandbox {template=vanilla-ts}

```ts index.ts
import { Text } from '@antv/t8';

const syntax = `
# 2024 年智能手机市场分析

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

有关详细方法，请访问[我们的研究页面](https://example.com/methodology)。
`;

// 暗色主题与自定义设置
const app = document.getElementById('app');
const text = new Text(app!);
text.theme('dark', { fontSize: 12, lineHeight: 20 }).render(syntax);
```

:::

### 自定义插件 - 样式化维度值

此示例展示了如何使用插件自定义实体渲染。在这里，维度值（如国家/地区名称）使用自定义颜色和字体进行样式化。

::: my-sandbox {template=vanilla-ts}

```ts index.ts
import { Text } from '@antv/t8';
import { createDimensionValue } from '@antv/t8/plugin';

const syntax = `
# 2024 年智能手机市场分析

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

有关详细方法，请访问[我们的研究页面](https://example.com/methodology)。
`;

// 创建自定义插件来样式化维度值
const dimensionValueDescriptor = {
  style: () => ({
    color: 'red',
    fontSize: 19,
  }),
  tooltip: false,
};

const dimensionPlugin = createDimensionValue(dimensionValueDescriptor, 'overwrite');

// 应用自定义插件
const app = document.getElementById('app');
const text = new Text(app!);
text.registerPlugin(dimensionPlugin);
text.render(syntax);
```

:::

## 理解 T8 语法

以上示例使用 **T8 语法** - 一种基于 Markdown 的声明式语言，用于叙事文本可视化。演示的主要功能：

### 实体注释

实体使用括号表示法标记：`[文本](entity_type, properties)`

- `[智能手机出货量](metric_name)` - 指标名称
- `[12 亿台](metric_value, origin=1200000000)` - 带有原始数据的指标值
- `[2024 年](time_desc)` - 时间描述
- `[适度下降 2.1%](ratio_value, origin=-0.021, assessment="negative")` - 带有情感的比率
- `[亚太地区](dim_value)` - 维度值（类别、地区等）
- `[韧性](trend_desc, assessment="positive")` - 趋势描述
- `[排名第 1](rank, detail=[320, 180, 90, 65, 45])` - 带有数据的排名

### 内联可视化

- `[分布](distribution, detail=[15, 25, 35, 15, 10])` - 迷你条形图
- `[强相关性](association, detail=[...])` - 散点图
- `[明显的季节性](seasonality, detail={...})` - 折线图
- `[1.4 亿台差距](difference, detail=[200, 180, 160, 140])` - 差异指示器

### Markdown 格式

支持标准 Markdown 语法：

- `**粗体**` 表示强调
- `*斜体*` 表示轻微强调
- `__下划线__` 表示突出显示
- 标题（`#`、`##`、`###`）用于结构
- 列表（编号和项目符号）
- 链接

在 [T8 语法文档](../syntax/index.md)中了解更多。
