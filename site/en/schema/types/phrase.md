---
title: Phrase and Entity
---

# Phrase & Entity 

`PhraseSpec` defines the smallest semantic unit in text, including plain text, entities, and custom phrases. It is the most basic content carrier in T8, using different types of phrases to achieve rich text expression and data visualization.

## Type Definition

```ts
import type { CommonProps, CustomMetaData } from './common';

export enum PhraseType {
  TEXT = 'text',
  ENTITY = 'entity',
  CUSTOM = 'custom',
}

export type PhraseSpec = TextPhraseSpec | EntityPhraseSpec | CustomPhraseSpec;

// Plain text phrase
export interface TextPhraseSpec extends CommonProps {
  type: PhraseType.TEXT;
  value: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

// Entity phrase
export interface EntityPhraseSpec extends CommonProps {
  type: PhraseType.ENTITY;
  value?: string;
  metadata?: EntityMetaData;
}

// Custom phrase
export interface CustomPhraseSpec<P extends CustomMetaData = CustomMetaData> extends CommonProps {
  type: PhraseType.CUSTOM;
  value?: string;
  metadata?: P;
}

// Entity type definition
export type ValueAssessment = 'positive' | 'negative' | 'equal';

export const EntityType = [
  'metric_name',      // Main indicator name, e.g., DAU
  'metric_value',     // Main indicator value, e.g., 1.23 million
  'other_metric_value', // Other indicator values
  'contribute_ratio', // Contribution ratio, e.g., 23%
  'delta_value',      // Change value, e.g., -1.2
  'ratio_value',      // Change ratio, e.g., +23%
  'trend_desc',       // Trend description, e.g., up/down
  'dim_value',        // Dimension value, e.g., sex = man
  'time_desc',        // Time description, e.g., 2021-11-19
  'proportion',       // Proportion, e.g., 20%
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

## Phrase Type Descriptions

### Text Phrase (TextPhraseSpec)

The most basic text display unit:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | `PhraseType.TEXT` | Yes | Fixed as 'text' |
| `value` | `string` | Yes | Text content |
| `bold` | `boolean` | No | Whether to bold |
| `italic` | `boolean` | No | Whether to italicize |
| `underline` | `boolean` | No | Whether to underline |
| `styles` | `CSSProperties` | No | Custom styles |
| `className` | `string` | No | CSS class name |

### Entity Phrase (EntityPhraseSpec)

Used to display data entities:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | `PhraseType.ENTITY` | Yes | Fixed as 'entity' |
| `value` | `string` | No | Display text |
| `metadata` | `EntityMetaData` | No | Entity metadata |
| `styles` | `CSSProperties` | No | Custom styles |
| `className` | `string` | No | CSS class name |

### Custom Phrase (CustomPhraseSpec)

Used for custom display extensions:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | `PhraseType.CUSTOM` | Yes | Fixed as 'custom' |
| `value` | `string` | No | Display text |
| `metadata` | `CustomMetaData` | No | Custom metadata |
| `styles` | `CSSProperties` | No | Custom styles |
| `className` | `string` | No | CSS class name |

## Entity Type System

### EntityType

| Type | Description | Example | Usage |
|------|-------------|---------|--------|
| `metric_name` | Main indicator name | DAU | Identify key metrics |
| `metric_value` | Main indicator value | 100w | Display primary data |
| `other_metric_value` | Other indicator value | 1.23 | Display secondary data |
| `delta_value` | Change value | -12 | Show magnitude of change |
| `ratio_value` | Change ratio | +10% | Show rate of change |
| `contribute_ratio` | Contribution ratio | 40% | Show contribution proportion |
| `trend_desc` | Trend description | Periodic | Describe data trends |
| `dim_value` | Dimension value | Beijing | Display dimension data |
| `time_desc` | Time | July 15 | Time information |
| `proportion` | Proportion | 20% | Show ratios |

### EntityMetaData

Entity metadata configuration:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `entityType` | `EntityType` | Yes | Entity type |
| `assessment` | `ValueAssessment` | No | Value assessment (positive/negative/equal) |
| `origin` | `number` | No | Original data value |
| `detail` | `unknown` | No | Detailed information (for popups etc.) |
| `sourceId` | `string` | No | Data source identifier |

## Usage Examples

### Text Phrase

```ts
const text: TextPhraseSpec = {
  type: 'text',
  value: 'Overall Performance',
  bold: true,
  styles: {
    color: '#666',
  },
};
```

### Entity Phrase

```ts
const entity: EntityPhraseSpec = {
  type: 'entity',
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

## Best Practices

1. **Phrase Type Selection**
   - Use TextPhraseSpec for regular text
   - Use EntityPhraseSpec for data entities
   - Use CustomPhraseSpec for special display requirements

2. **Entity Data Handling**
   - Use EntityType appropriately to categorize data
   - Mark data trends through assessment
   - Provide more context through detail

3. **Style Management**
   - Use the theme system for unified styling
   - Implement style reuse through className
   - Use styles for special styling needs 