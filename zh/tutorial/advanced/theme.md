---
url: /zh/tutorial/advanced/theme.md
---

# 主题配置

T8 提供了灵活的主题配置系统，你可以通过 `theme` 方法来设置文本可视化的主题样式。

## 基础用法

```ts
const text = new Text('#container');

// 使用亮色主题
text.theme('light');

// 使用暗色主题
text.theme('dark');

// 自定义主题配置
text.theme('dark', {
  fontSize: 12,
  lineHeight: 20,
  // ... 其他配置
});
```

::: my-sandbox {template=vanilla-ts}

```ts index.ts
import { Text } from '@antv/t8';
import spec from './example.json';

const app = document.getElementById('app');

app.style.background = 'black';

// 实例化 Text
const text = new Text(document.getElementById('app'));

// 指定可视化元素
text.schema(spec).theme('dark', { fontSize: 40 });

// 渲染
text.render();
```

```json example.json
{
  "sections": [
    {
      "key": "insight",
      "paragraphs": [
        {
          "type": "normal",
          "phrases": [
            {
              "type": "text",
              "value": "The "
            },
            {
              "type": "entity",
              "value": "average deal size",
              "metadata": {
                "entityType": "metric_name"
              }
            },
            {
              "type": "text",
              "value": " ("
            },
            {
              "type": "entity",
              "value": "$12k",
              "metadata": {
                "entityType": "metric_value"
              }
            },
            {
              "type": "text",
              "value": ") "
            },
            {
              "type": "text",
              "value": "is down "
            },
            {
              "type": "entity",
              "value": "$2k",
              "metadata": {
                "entityType": "delta_value",
                "assessment": "negative"
              }
            },
            {
              "type": "text",
              "value": " "
            },
            {
              "type": "text",
              "value": "relative to the same time last quarter"
            },
            {
              "type": "text",
              "value": " ("
            },
            {
              "type": "entity",
              "value": "$14k",
              "metadata": {
                "entityType": "metric_value"
              }
            },
            {
              "type": "text",
              "value": ") "
            },
            {
              "type": "text",
              "value": ". "
            }
          ]
        }
      ]
    }
  ]
}
```

:::

## 配置项

### 基础配置

基础配置项控制文本的基本样式：

| 配置项      | 类型   | 默认值                   | 说明         |
| ----------- | ------ | ------------------------ | ------------ |
| fontFamily  | string | 'PingFangSC, sans-serif' | 字体族       |
| fontSize    | number | 14                       | 基础字号大小 |
| lineHeight  | number | 24                       | 基础行高     |
| borderColor | string | 'rgb(199, 199, 199)'     | 边框颜色     |

### 标题配置

通过 `fontSizeMultiples` 和 `lineHeightMultiples` 可以配置不同级别标题的大小和行高：

```ts
{
  // 标题字号倍数
  fontSizeMultiples: {
    h1: 2,      // 2 倍基础字号
    h2: 1.72,   // 1.72 倍基础字号
    h3: 1.4,    // 1.4 倍基础字号
    h4: 1.15,   // 1.15 倍基础字号
    h5: 1.08,   // 1.08 倍基础字号
    h6: 1.08,   // 1.08 倍基础字号
  },

  // 标题行高倍数
  lineHeightMultiples: {
    h1: 1.5,    // 1.5 倍基础行高
    h2: 1.3,    // 1.3 倍基础行高
    h3: 1.15,   // 1.15 倍基础行高
    h4: 1,      // 1 倍基础行高
    h5: 1,      // 1 倍基础行高
    h6: 1,      // 1 倍基础行高
  }
}
```

### 颜色配置

T8 为亮色和暗色主题提供了一套完整的预设颜色。每个主题都包含以下颜色配置：

| 配置项                | 说明           | 亮色主题            | 暗色主题                  |
| --------------------- | -------------- | ------------------- | ------------------------- |
| colorBase             | 基础文本颜色   | rgba(0, 0, 0, 0.65) | rgba(255, 255, 255, 0.65) |
| colorEntityBase       | 实体基础颜色   | rgba(0, 0, 0, 0.65) | rgba(255, 255, 255, 0.65) |
| colorHeadingBase      | 标题基础颜色   | rgba(0, 0, 0, 0.85) | rgba(255, 255, 255, 0.85) |
| colorPositive         | 正向值颜色     | #FA541C             | #FA541C                   |
| colorNegative         | 负向值颜色     | #13A8A8             | #13A8A8                   |
| colorConclusion       | 结论颜色       | #1F0352             | #D8C3F3                   |
| colorDimensionValue   | 维度值颜色     | rgba(0, 0, 0, 0.88) | rgba(255, 255, 255, 0.88) |
| colorMetricName       | 指标名称颜色   | rgba(0, 0, 0, 0.88) | rgba(255, 255, 255, 0.88) |
| colorMetricValue      | 指标值颜色     | #1677FF             | #4B91FF                   |
| colorOtherValue       | 其他值颜色     | rgba(0, 0, 0, 0.88) | rgba(255, 255, 255, 0.88) |
| colorProportionShadow | 比例图阴影颜色 | #CDDDFD             | #CDDDFD                   |
| colorProportionFill   | 比例图填充颜色 | #3471F9             | #3471F9                   |
| colorLineStroke       | 折线图描边颜色 | #5B8FF9             | #5B8FF9                   |

## 主题定制

### 覆盖预设主题

你可以在使用预设主题的基础上覆盖部分配置：

```ts
text.theme('dark', {
  // 覆盖基础配置
  fontSize: 16,
  lineHeight: 28,

  // 覆盖颜色配置
  colorMetricValue: '#1890ff',
  colorPositive: '#52c41a',
  colorNegative: '#ff4d4f',

  // 覆盖标题配置
  fontSizeMultiples: {
    h1: 2.5,
    h2: 2,
    // ... 其他标题配置
  },
});
```

### 完整示例

这是一个包含所有配置项的完整示例：

```ts
text.theme('dark', {
  // 基础配置
  fontFamily: 'PingFangSC, sans-serif',
  fontSize: 14,
  lineHeight: 24,
  borderColor: 'rgb(199, 199, 199)',

  // 标题大小配置
  fontSizeMultiples: {
    h1: 2,
    h2: 1.72,
    h3: 1.4,
    h4: 1.15,
    h5: 1.08,
    h6: 1.08,
  },

  // 标题行高配置
  lineHeightMultiples: {
    h1: 1.5,
    h2: 1.3,
    h3: 1.15,
    h4: 1,
    h5: 1,
    h6: 1,
  },

  // 颜色配置
  colorBase: 'rgba(255, 255, 255, 0.65)',
  colorEntityBase: 'rgba(255, 255, 255, 0.65)',
  colorHeadingBase: 'rgba(255, 255, 255, 0.85)',
  colorPositive: '#FA541C',
  colorNegative: '#13A8A8',
  colorConclusion: '#D8C3F3',
  colorDimensionValue: 'rgba(255, 255, 255, 0.88)',
  colorMetricName: 'rgba(255, 255, 255, 0.88)',
  colorMetricValue: '#4B91FF',
  colorOtherValue: 'rgba(255, 255, 255, 0.88)',
  colorProportionShadow: '#CDDDFD',
  colorProportionFill: '#3471F9',
  colorLineStroke: '#5B8FF9',
});
```
