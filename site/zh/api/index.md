---
title: API 文档
---

# API 参考

## Text

### constructor

```typescript
constructor(container: string | HTMLElement, options?: TextOptions);
```

| 参数      | 类型                  | 必填 | 说明                                   |
| --------- | --------------------- | ---- | -------------------------------------- |
| container | string \| HTMLElement | 是   | 容器元素，可以是 DOM 选择器或 DOM 元素 |

#### theme

| 参数      | 类型                        | 必填 | 说明         |
| --------- | --------------------------- | ---- | ------------ |
| theme     | 'dark' \| 'light'           | 是   | 主题名称     |
| seedToken | Partial\<SeedTokenOptions\> | 否   | 主题令牌配置 |

**返回值**

| 类型 | 说明                    |
| ---- | ----------------------- |
| Text | Text 实例，支持链式调用 |

#### registerPlugin

| 参数   | 类型                       | 必填 | 说明               |
| ------ | -------------------------- | ---- | ------------------ |
| plugin | PluginType \| PluginType[] | 是   | 单个插件或插件数组 |

**返回值**

| 类型 | 说明                    |
| ---- | ----------------------- |
| Text | Text 实例，支持链式调用 |

#### render

渲染叙述性文本可视化。接受 T8 语法字符串或 NarrativeTextSpec 对象。

| 参数    | 类型                        | 必填 | 说明                             |
| ------- | --------------------------- | ---- | -------------------------------- |
| content | string \| NarrativeTextSpec | 否   | 要渲染的 T8 语法字符串或规范对象 |

**返回值**

| 类型     | 说明                     |
| -------- | ------------------------ |
| function | 卸载函数，移除可视化组件 |

**使用示例**

```typescript
// 使用 T8 语法字符串渲染
text.theme('light').render(`
  # 销售报告
  总销售额为 [¥1,234,567](metric_value).
`);

// 使用 NarrativeTextSpec 对象渲染
text.render(spec);
```

#### clear

通过卸载来清除可视化。

| 参数 | 类型 | 必填 | 说明 |
| ---- | ---- | ---- | ---- |
| (无) |      |      |      |

#### unmount

卸载可视化组件。

| 参数 | 类型 | 必填 | 说明 |
| ---- | ---- | ---- | ---- |
| (无) |      |      |      |

## Schema

### NarrativeTextSpec

```typescript
interface NarrativeTextSpec {
  headline?: HeadlineSpec;
  sections?: SectionSpec[];
}
```

| 属性     | 类型          | 必填 | 说明         |
| -------- | ------------- | ---- | ------------ |
| headline | HeadlineSpec  | 否   | 标题规范     |
| sections | SectionSpec[] | 否   | 章节规范数组 |

### SectionSpec

```typescript
type SectionSpec = (StandardSectionSpec | CustomBlockElement) & CommonProps;
```

| 属性       | 类型                  | 必填 | 说明           |
| ---------- | --------------------- | ---- | -------------- |
| paragraphs | ParagraphSpec[]       | 否   | 段落规范数组   |
| customType | string                | 否   | 自定义区块类型 |
| styles     | Record\<string, any\> | 否   | 样式对象       |
| className  | string                | 否   | 类名           |

### ParagraphSpec

```typescript
type ParagraphSpec = HeadingParagraphSpec | TextParagraphSpec | BulletsParagraphSpec | CustomBlockElement;

enum ParagraphType {
  HEADING1 = 'heading1',
  HEADING2 = 'heading2',
  HEADING3 = 'heading3',
  HEADING4 = 'heading4',
  HEADING5 = 'heading5',
  HEADING6 = 'heading6',
  NORMAL = 'normal',
  BULLETS = 'bullets',
}
```

| 属性       | 类型             | 必填 | 说明                                  |
| ---------- | ---------------- | ---- | ------------------------------------- |
| type       | ParagraphType    | 是   | 段落类型                              |
| phrases    | PhraseSpec[]     | 是   | 短语规范数组                          |
| bullets    | BulletItemSpec[] | 否   | 列表项规范数组（仅用于 BULLETS 类型） |
| customType | string           | 否   | 自定义区块类型（仅用于自定义区块）    |

### PhraseSpec

```typescript
type PhraseSpec = TextPhraseSpec | EntityPhraseSpec | CustomPhraseSpec<CustomMetaData>;

enum PhraseType {
  TEXT = 'text',
  ENTITY = 'entity',
  CUSTOM = 'custom',
}
```

| 属性     | 类型                             | 必填 | 说明     |
| -------- | -------------------------------- | ---- | -------- |
| type     | PhraseType                       | 是   | 短语类型 |
| value    | string                           | 是   | 短语内容 |
| metadata | EntityMetaData \| CustomMetaData | 否   | 元数据   |

### EntityType

```typescript
type EntityType =
  | 'metric_name' // 指标名称，如 DAU
  | 'metric_value' // 指标值，如 1.23 million
  | 'other_metric_value' // 其他指标值
  | 'contribute_ratio' // 贡献度，如 23%
  | 'delta_value' // 变化值，如 -1.2
  | 'ratio_value' // 变化率，如 +23%
  | 'trend_desc' // 趋势描述，如 up/down
  | 'dim_value' // 维值，如 sex = man
  | 'time_desc' // 时间描述，如 2021-11-19
  | 'proportion'; // 占比，如 20%
```

## 插件系统

### PluginManager

```typescript
class PluginManager {
  constructor(plugins?: PluginType[]);
  protected entities: Partial<Record<EntityType, PhraseDescriptor<EntityMetaData>>>;
  protected customPhrases: Record<string, PhraseDescriptor<any>>;
  protected customBlocks: Record<string, BlockDescriptor<any>>;
}
```

#### constructor

| 参数    | 类型         | 必填 | 说明     |
| ------- | ------------ | ---- | -------- |
| plugins | PluginType[] | 否   | 插件数组 |

### PhraseDescriptor

```typescript
interface PhraseDescriptor<MetaData> {
  key: string;
  isEntity: boolean;
  render?: ((value: string, metadata: MetaData) => HTMLElement) | HTMLElement;
  tooltip?:
    | false
    | (Omit<TooltipProps, 'children' | 'title'> & {
        title: ((value: string, metadata: MetaData) => HTMLElement | string | number) | HTMLElement | string | number;
      });
  classNames?: string[] | ((value: string, metadata: MetaData) => string[]);
  style?: CSSProperties | ((value: string, metadata: MetaData, themeSeedToken: SeedTokenOptions) => CSSProperties);
  onHover?: (value: string, metadata: MetaData) => string;
  onClick?: (value: string, metadata: MetaData) => string;
  getText?: (value: string, metadata: MetaData) => string;
  getMarkdown?: (value: string, metadata: MetaData) => string;
}
```

| 属性        | 类型                      | 必填 | 说明                   |
| ----------- | ------------------------- | ---- | ---------------------- |
| key         | string                    | 是   | 插件唯一标识           |
| isEntity    | boolean                   | 是   | 是否为实体短语插件     |
| render      | function \| HTMLElement   | 否   | 渲染函数或元素         |
| tooltip     | false \| object           | 否   | 工具提示配置           |
| classNames  | string[] \| function      | 否   | 类名数组或生成函数     |
| style       | CSSProperties \| function | 否   | 样式对象或生成函数     |
| onHover     | function                  | 否   | 悬停事件处理函数       |
| onClick     | function                  | 否   | 点击事件处理函数       |
| getText     | function                  | 否   | 获取纯文本内容函数     |
| getMarkdown | function                  | 否   | 获取 Markdown 内容函数 |

### BlockDescriptor

```typescript
interface BlockDescriptor<CustomBlockSpec> {
  key: string;
  isBlock: true;
  className?: string | ((spec: CustomBlockSpec) => string);
  style?: CSSProperties | ((spec: CustomBlockSpec) => CSSProperties);
  render?: (spec: CustomBlockSpec) => HTMLElement;
  getText?: (spec: CustomBlockSpec) => string;
  getMarkdown?: (spec: CustomBlockSpec) => string;
}
```

| 属性        | 类型                      | 必填 | 说明                   |
| ----------- | ------------------------- | ---- | ---------------------- |
| key         | string                    | 是   | 插件唯一标识           |
| isBlock     | true                      | 是   | 标识为区块插件         |
| className   | string \| function        | 否   | 类名或生成函数         |
| style       | CSSProperties \| function | 否   | 样式对象或生成函数     |
| render      | function                  | 否   | 渲染函数               |
| getText     | function                  | 否   | 获取纯文本内容函数     |
| getMarkdown | function                  | 否   | 获取 Markdown 内容函数 |

### 预设插件工厂函数

```typescript
function createMetricName(
  customDescriptor?: SpecificEntityPhraseDescriptor,
  mode?: CustomEntityMode,
): PhraseDescriptor<EntityMetaData>;
```

| 参数             | 类型                           | 必填 | 说明                             |
| ---------------- | ------------------------------ | ---- | -------------------------------- |
| customDescriptor | SpecificEntityPhraseDescriptor | 否   | 自定义描述符                     |
| mode             | CustomEntityMode               | 否   | 合并模式，'merge' 或 'overwrite' |

**返回值**

| 类型                               | 说明               |
| ---------------------------------- | ------------------ |
| PhraseDescriptor\<EntityMetaData\> | 实体短语插件描述符 |

_注：其他预设插件工厂函数（createMetricValue, createDeltaValue 等）的参数和返回值与 createMetricName 相同。_

## 主题系统

### SeedTokenOptions

```typescript
interface SeedTokenOptions {
  // 基础配置
  fontSize: number;
  lineHeight: number;
  fontFamily: string;

  // 颜色系统
  colorBase: string; // 基础文本颜色
  colorEntityBase: string; // 实体基础颜色
  colorHeadingBase: string; // 标题基础颜色
  colorPositive: string; // 正向颜色
  colorNegative: string; // 负向颜色
  colorConclusion: string; // 结论颜色
  colorDimensionValue: string; // 维度值颜色
  colorMetricName: string; // 指标名颜色
  colorMetricValue: string; // 指标值颜色
  colorOtherValue: string; // 其他值颜色
  colorProportionShadow: string; // 占比图表阴影颜色
  colorProportionFill: string; // 占比图表填充颜色
  colorLineStroke: string; // 折线图线条颜色
}
```

| 属性                  | 类型   | 必填 | 说明             |
| --------------------- | ------ | ---- | ---------------- |
| fontSize              | number | 是   | 基础字号大小     |
| lineHeight            | number | 是   | 基础行高         |
| fontFamily            | string | 是   | 字体族           |
| colorBase             | string | 是   | 基础文本颜色     |
| colorEntityBase       | string | 是   | 实体基础颜色     |
| colorHeadingBase      | string | 是   | 标题基础颜色     |
| colorPositive         | string | 是   | 正向颜色         |
| colorNegative         | string | 是   | 负向颜色         |
| colorConclusion       | string | 是   | 结论颜色         |
| colorDimensionValue   | string | 是   | 维度值颜色       |
| colorMetricName       | string | 是   | 指标名颜色       |
| colorMetricValue      | string | 是   | 指标值颜色       |
| colorOtherValue       | string | 是   | 其他值颜色       |
| colorProportionShadow | string | 是   | 占比图表阴影颜色 |
| colorProportionFill   | string | 是   | 占比图表填充颜色 |
| colorLineStroke       | string | 是   | 折线图线条颜色   |
