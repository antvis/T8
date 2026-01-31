---
title: Phrase 和 Entity
---

# Phrase & Entity 

`PhraseSpec` 定义了文本中的最小语义单位，包括纯文本、实体和自定义短语。它是 T8 中最基础的内容承载单元，通过不同类型的短语来实现丰富的文本表达和数据可视化。

## 类型定义

```ts
import type { CommonProps, CustomMetaData } from './common';

export enum PhraseType {
  TEXT = 'text',
  ENTITY = 'entity',
  CUSTOM = 'custom',
}

export type PhraseSpec = TextPhraseSpec | EntityPhraseSpec | CustomPhraseSpec;

// 纯文本短语
export interface TextPhraseSpec extends CommonProps {
  type: PhraseType.TEXT;
  value: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

// 实体短语
export interface EntityPhraseSpec extends CommonProps {
  type: PhraseType.ENTITY;
  value?: string;
  metadata?: EntityMetaData;
}

// 自定义短语
export interface CustomPhraseSpec<P extends CustomMetaData = CustomMetaData> extends CommonProps {
  type: PhraseType.CUSTOM;
  value?: string;
  metadata?: P;
}

// 实体类型定义
export type ValueAssessment = 'positive' | 'negative' | 'equal';

export const EntityType = [
  'metric_name',      // 主指标名，如：DAU
  'metric_value',     // 主指标值，如：1.23 million
  'other_metric_value', // 其他指标值
  'contribute_ratio', // 贡献度，如：23%
  'delta_value',      // 变化值，如：-1.2
  'ratio_value',      // 变化率，如：+23%
  'trend_desc',       // 趋势描述，如：up/down
  'dim_value',        // 维值，如：sex = man
  'time_desc',        // 时间描述，如：2021-11-19
  'proportion',       // 占比，如：20%
] as const;

export type EntityType = (typeof EntityType)[number];

export type EntityMetaData = {
  entityType: EntityType;
  assessment?: ValueAssessment;
  origin?: number;
  detail?: unknown;
  sourceId?: string;
};
```

## 短语类型说明

### 文本短语 (TextPhraseSpec)

最基础的文本展示单元：

| 属性 | 类型 | 必填 | 描述 |
|------|------|------|------|
| `type` | `PhraseType.TEXT` | 是 | 固定为 'text' |
| `value` | `string` | 是 | 文本内容 |
| `bold` | `boolean` | 否 | 是否加粗 |
| `italic` | `boolean` | 否 | 是否斜体 |
| `underline` | `boolean` | 否 | 是否下划线 |
| `styles` | `CSSProperties` | 否 | 自定义样式 |
| `className` | `string` | 否 | CSS 类名 |

### 实体短语 (EntityPhraseSpec)

用于展示数据实体：

| 属性 | 类型 | 必填 | 描述 |
|------|------|------|------|
| `type` | `PhraseType.ENTITY` | 是 | 固定为 'entity' |
| `value` | `string` | 否 | 显示文本 |
| `metadata` | `EntityMetaData` | 否 | 实体元数据 |
| `styles` | `CSSProperties` | 否 | 自定义样式 |
| `className` | `string` | 否 | CSS 类名 |

### 自定义短语 (CustomPhraseSpec)

用于扩展自定义展示：

| 属性 | 类型 | 必填 | 描述 |
|------|------|------|------|
| `type` | `PhraseType.CUSTOM` | 是 | 固定为 'custom' |
| `value` | `string` | 否 | 显示文本 |
| `metadata` | `CustomMetaData` | 否 | 自定义元数据 |
| `styles` | `CSSProperties` | 否 | 自定义样式 |
| `className` | `string` | 否 | CSS 类名 |

## 实体类型系统

### EntityType

| 类型 | 说明 | 示例 | 用途 |
|------|------|------|------|
| `metric_name` | 主指标名 | DAU | 标识关键指标 |
| `metric_value` | 主指标值 | 100w | 展示主要数据 |
| `other_metric_value` | 其他指标值 | 1.23 | 展示次要数据 |
| `delta_value` | 差值 | -12 | 展示变化量 |
| `ratio_value` | 差率 | +10% | 展示变化率 |
| `contribute_ratio` | 贡献度 | 40% | 展示占比贡献 |
| `trend_desc` | 趋势描述 | 周期性 | 描述数据趋势 |
| `dim_value` | 维值 | 北京 | 展示维度数据 |
| `time_desc` | 时间 | 7月15日 | 时间信息 |
| `proportion` | 占比 | 20% | 展示比例 |

### EntityMetaData

实体元数据配置：

| 属性 | 类型 | 必填 | 描述 |
|------|------|------|------|
| `entityType` | `EntityType` | 是 | 实体类型 |
| `assessment` | `ValueAssessment` | 否 | 数值评估（正/负/持平）|
| `origin` | `number` | 否 | 原始数据值 |
| `detail` | `unknown` | 否 | 详细信息（用于弹窗等）|
| `sourceId` | `string` | 否 | 数据源标识 |

## 使用示例

### 文本短语

```ts
const text: TextPhraseSpec = {
  type: 'text',
  value: '总体表现',
  bold: true,
  styles: {
    color: '#666',
  },
};
```

### 实体短语
<!-- TODO: -->

```ts
const entity: EntityPhraseSpec = {
  type: 'entity';,
  value: '15%',
  metadata: {
    entityType: 'ratio_value',
    assessment: 'positive',
    origin: 0.15,
    detail: {
      previousValue: '12%',
      change: '+3%',
    },
  },
  styles: {
    color: '#f5222d',
  },
};
```

## 最佳实践

1. **短语类型选择**
   - 使用 TextPhraseSpec 处理普通文本
   - 使用 EntityPhraseSpec 处理数据实体
   - 使用 CustomPhraseSpec 实现特殊展示需求

2. **实体数据处理**
   - 合理使用 EntityType 分类数据
   - 通过 assessment 标注数据趋势
   - 利用 detail 提供更多上下文信息

3. **样式管理**
   - 使用主题系统统一样式
   - 通过 className 实现样式复用
   - 使用 styles 处理特殊样式需求