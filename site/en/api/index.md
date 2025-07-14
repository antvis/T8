---
title: API Documentation
---

# API Reference

## Text

### constructor

```typescript
constructor(container: string | HTMLElement, options?: TextOptions);
```

| Parameter | Type                  | Required | Description                                             |
| --------- | --------------------- | -------- | ------------------------------------------------------- |
| container | string \| HTMLElement | Yes      | Container element, can be a DOM selector or DOM element |

#### schema

| Parameter | Type              | Required | Description                             |
| --------- | ----------------- | -------- | --------------------------------------- |
| spec      | NarrativeTextSpec | Yes      | Text visualization specification object |

**Return Value**

| Type | Description                             |
| ---- | --------------------------------------- |
| Text | Text instance, supports method chaining |

#### theme

| Parameter | Type                        | Required | Description               |
| --------- | --------------------------- | -------- | ------------------------- |
| theme     | 'dark' \| 'light'           | Yes      | Theme name                |
| seedToken | Partial\<SeedTokenOptions\> | No       | Theme token configuration |

**Return Value**

| Type | Description                             |
| ---- | --------------------------------------- |
| Text | Text instance, supports method chaining |

#### registerPlugin

| Parameter | Type                       | Required | Description                       |
| --------- | -------------------------- | -------- | --------------------------------- |
| plugin    | PluginType \| PluginType[] | Yes      | Single plugin or array of plugins |

**Return Value**

| Type | Description                             |
| ---- | --------------------------------------- |
| Text | Text instance, supports method chaining |

## Schema

### NarrativeTextSpec

```typescript
interface NarrativeTextSpec {
  headline?: HeadlineSpec;
  sections?: SectionSpec[];
}
```

| Property | Type          | Required | Description                     |
| -------- | ------------- | -------- | ------------------------------- |
| headline | HeadlineSpec  | No       | Headline specification          |
| sections | SectionSpec[] | No       | Array of section specifications |

### SectionSpec

```typescript
type SectionSpec = (StandardSectionSpec | CustomBlockElement) & CommonProps;
```

| Property   | Type                  | Required | Description                       |
| ---------- | --------------------- | -------- | --------------------------------- |
| paragraphs | ParagraphSpec[]       | No       | Array of paragraph specifications |
| customType | string                | No       | Custom block type                 |
| styles     | Record\<string, any\> | No       | Style object                      |
| className  | string                | No       | Class name                        |

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

| Property   | Type             | Required | Description                                   |
| ---------- | ---------------- | -------- | --------------------------------------------- |
| type       | ParagraphType    | Yes      | Paragraph type                                |
| phrases    | PhraseSpec[]     | Yes      | Array of phrase specifications                |
| bullets    | BulletItemSpec[] | No       | Array of bullet items (only for BULLETS type) |
| customType | string           | No       | Custom block type (only for custom blocks)    |

### PhraseSpec

```typescript
type PhraseSpec = TextPhraseSpec | EntityPhraseSpec | CustomPhraseSpec<CustomMetaData>;

enum PhraseType {
  TEXT = 'text',
  ENTITY = 'entity',
  CUSTOM = 'custom',
}
```

| Property | Type                             | Required | Description    |
| -------- | -------------------------------- | -------- | -------------- |
| type     | PhraseType                       | Yes      | Phrase type    |
| value    | string                           | Yes      | Phrase content |
| metadata | EntityMetaData \| CustomMetaData | No       | Metadata       |

### EntityType

```typescript
type EntityType =
  | 'metric_name' // Metric name, e.g., DAU
  | 'metric_value' // Metric value, e.g., 1.23 million
  | 'other_metric_value' // Other metric value
  | 'contribute_ratio' // Contribution ratio, e.g., 23%
  | 'delta_value' // Change value, e.g., -1.2
  | 'ratio_value' // Change ratio, e.g., +23%
  | 'trend_desc' // Trend description, e.g., up/down
  | 'dim_value' // Dimension value, e.g., sex = man
  | 'time_desc' // Time description, e.g., 2021-11-19
  | 'proportion'; // Proportion, e.g., 20%
```

## Plugin System

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

| Parameter | Type         | Required | Description      |
| --------- | ------------ | -------- | ---------------- |
| plugins   | PluginType[] | No       | Array of plugins |

### PhraseDescriptor

```typescript
interface PhraseDescriptor<MetaData> {
  key: string;
  isEntity: boolean;
  render?: ((value: string, metadata: MetaData) => HTMLElement | DocumentFragment) | HTMLElement | DocumentFragment;
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

| Property    | Type                                        | Required | Description                                |
| ----------- | ------------------------------------------- | -------- | ------------------------------------------ |
| key         | string                                      | Yes      | Unique plugin identifier                   |
| isEntity    | boolean                                     | Yes      | Whether it's an entity phrase plugin       |
| render      | function \| HTMLElement \| DocumentFragment | No       | Render function or element                 |
| tooltip     | false \| object                             | No       | Tooltip configuration                      |
| classNames  | string[] \| function                        | No       | Array of class names or generator function |
| style       | CSSProperties \| function                   | No       | Style object or generator function         |
| onHover     | function                                    | No       | Hover event handler                        |
| onClick     | function                                    | No       | Click event handler                        |
| getText     | function                                    | No       | Get plain text content function            |
| getMarkdown | function                                    | No       | Get Markdown content function              |

### BlockDescriptor

```typescript
interface BlockDescriptor<CustomBlockSpec> {
  key: string;
  isBlock: true;
  className?: string | ((spec: CustomBlockSpec) => string);
  style?: CSSProperties | ((spec: CustomBlockSpec) => CSSProperties);
  render?: (spec: CustomBlockSpec) => HTMLElement | DocumentFragment;
  getText?: (spec: CustomBlockSpec) => string;
  getMarkdown?: (spec: CustomBlockSpec) => string;
}
```

| Property    | Type                      | Required | Description                        |
| ----------- | ------------------------- | -------- | ---------------------------------- |
| key         | string                    | Yes      | Unique plugin identifier           |
| isBlock     | true                      | Yes      | Identifies as a block plugin       |
| className   | string \| function        | No       | Class name or generator function   |
| style       | CSSProperties \| function | No       | Style object or generator function |
| render      | function                  | No       | Render function                    |
| getText     | function                  | No       | Get plain text content function    |
| getMarkdown | function                  | No       | Get Markdown content function      |

### Preset Plugin Factory Functions

```typescript
function createMetricName(
  customDescriptor?: SpecificEntityPhraseDescriptor,
  mode?: CustomEntityMode,
): PhraseDescriptor<EntityMetaData>;
```

| Parameter        | Type                           | Required | Description                        |
| ---------------- | ------------------------------ | -------- | ---------------------------------- |
| customDescriptor | SpecificEntityPhraseDescriptor | No       | Custom descriptor                  |
| mode             | CustomEntityMode               | No       | Merge mode, 'merge' or 'overwrite' |

**Return Value**

| Type                               | Description                     |
| ---------------------------------- | ------------------------------- |
| PhraseDescriptor\<EntityMetaData\> | Entity phrase plugin descriptor |

_Note: Other preset plugin factory functions (createMetricValue, createDeltaValue, etc.) have the same parameters and return values as createMetricName._

## Theme System

### SeedTokenOptions

```typescript
interface SeedTokenOptions {
  // Base configuration
  fontSize: number;
  lineHeight: number;
```
