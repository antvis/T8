---
title: 主题配置
---

# 主题配置

T8 提供了一个灵活的主题系统，允许你自定义叙事文本可视化的外观。你可以通过主题系统配置字体、颜色和其他视觉属性。

## 基本用法

```ts
import { NarrativeTextVis } from '@antv/narrative-text-vis';

// 使用亮色主题（默认）
<NarrativeTextVis theme="light" />

// 使用暗色主题
<NarrativeTextVis theme="dark" />

// 使用自定义主题
<NarrativeTextVis theme={{
  fontSize: 14,
  lineHeight: 24,
  fontFamily: 'Arial, sans-serif',
  // ... 其他主题选项
}} />
```

## 主题选项

主题配置接受以下选项：

### 字体设置

| 属性         | 类型     | 描述                 | 默认值                     |
| ------------ | -------- | -------------------- | -------------------------- |
| `fontSize`   | `number` | 基础字体大小（像素） | `14`                       |
| `lineHeight` | `number` | 基础行高（像素）     | `24`                       |
| `fontFamily` | `string` | 字体族               | `'PingFangSC, sans-serif'` |

### 标题大小倍数

你可以配置不同标题级别的大小倍数：

```ts
{
  fontSizeMultiples: {
    h1: 2,     // 基础字体大小的 2 倍
    h2: 1.72,  // 基础字体大小的 1.72 倍
    h3: 1.4,   // 基础字体大小的 1.4 倍
    h4: 1.15,  // 基础字体大小的 1.15 倍
    h5: 1.08,  // 基础字体大小的 1.08 倍
    h6: 1.08   // 基础字体大小的 1.08 倍
  },
  lineHeightMultiples: {
    h1: 1.5,   // 基础行高的 1.5 倍
    h2: 1.3,   // 基础行高的 1.3 倍
    h3: 1.15,  // 基础行高的 1.15 倍
    h4: 1,     // 基础行高的 1 倍
    h5: 1,     // 基础行高的 1 倍
    h6: 1      // 基础行高的 1 倍
  }
}
```

### 颜色

主题系统提供了两种预设的配色方案：亮色和暗色。以下是你可以自定义的颜色选项：

| 属性                    | 亮色主题              | 暗色主题                    | 描述           |
| ----------------------- | --------------------- | --------------------------- | -------------- |
| `colorBase`             | `rgba(0, 0, 0, 0.65)` | `rgba(255, 255, 255, 0.65)` | 基础文本颜色   |
| `colorEntityBase`       | `rgba(0, 0, 0, 0.65)` | `rgba(255, 255, 255, 0.65)` | 实体基础颜色   |
| `colorHeadingBase`      | `rgba(0, 0, 0, 0.85)` | `rgba(255, 255, 255, 0.85)` | 标题基础颜色   |
| `colorPositive`         | `#FA541C`             | `#FA541C`                   | 正值颜色       |
| `colorNegative`         | `#13A8A8`             | `#13A8A8`                   | 负值颜色       |
| `colorConclusion`       | `#1F0352`             | `#D8C3F3`                   | 结论颜色       |
| `colorDimensionValue`   | `rgba(0, 0, 0, 0.88)` | `rgba(255, 255, 255, 0.88)` | 维度值颜色     |
| `colorMetricName`       | `rgba(0, 0, 0, 0.88)` | `rgba(255, 255, 255, 0.88)` | 指标名颜色     |
| `colorMetricValue`      | `#1677FF`             | `#4B91FF`                   | 指标值颜色     |
| `colorOtherValue`       | `rgba(0, 0, 0, 0.88)` | `rgba(255, 255, 255, 0.88)` | 其他值颜色     |
| `colorProportionShadow` | `#CDDDFD`             | `#CDDDFD`                   | 比例图阴影颜色 |
| `colorProportionFill`   | `#3471F9`             | `#3471F9`                   | 比例图填充颜色 |
| `colorLineStroke`       | `#5B8FF9`             | `#5B8FF9`                   | 折线图描边颜色 |

## 自定义主题示例

以下是创建自定义主题的示例，包含自定义的颜色和字体：

```ts
const customTheme = {
  // 字体设置
  fontSize: 16,
  lineHeight: 28,
  fontFamily: 'Arial, Helvetica, sans-serif',

  // 标题倍数
  fontSizeMultiples: {
    h1: 2.5,
    h2: 2,
    h3: 1.5,
    h4: 1.2,
    h5: 1.1,
    h6: 1
  },

  // 自定义颜色
  colorBase: '#333333',
  colorEntityBase: '#444444',
  colorHeadingBase: '#222222',
  colorPositive: '#28a745',
  colorNegative: '#dc3545',
  colorConclusion: '#6610f2',
  colorDimensionValue: '#495057',
  colorMetricName: '#212529',
  colorMetricValue: '#0d6efd',
  colorOtherValue: '#6c757d',
  colorProportionShadow: '#e9ecef',
  colorProportionFill: '#0d6efd',
  colorLineStroke: '#0d6efd'
};

// 应用自定义主题
<NarrativeTextVis theme={customTheme} />
```
