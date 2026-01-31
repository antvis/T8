---
title: NarrativeText
---

# NarrativeText 

`NarrativeTextSpec` is the top-level type in the T8 Schema system, used to describe the structure of an entire narrative text document. It defines the overall layout, organization, and style specifications of the document.

## Type Definition

```ts
import type { CommonProps } from './common';
import type { HeadlineSpec, SectionSpec } from './structure';

type NarrativeTextSpec = CommonProps & {
  headline?: HeadlineSpec;
  sections?: SectionSpec[];
};
```

## Core Components

### HeadlineSpec

The headline component is used to define the document's main title:

```ts
type HeadlineSpec = CommonProps & {
  type: 'headline';
  phrases: PhraseSpec[];
};
```

## Property Descriptions

### NarrativeTextSpec

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `headline` | `HeadlineSpec` | No | Document headline configuration |
| `sections` | `SectionSpec[]` | No | List of document section blocks |
| `styles` | `CSSProperties` | No | Document-level CSS styles |
| `className` | `string` | No | CSS class name for the document container |
| `key` | `string` | No | Preact key property for optimizing rendering performance |

### HeadlineSpec

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | `'headline'` | Yes | Fixed value identifying this as a headline component |
| `phrases` | `PhraseSpec[]` | Yes | Headline content composed of phrases |
| `styles` | `CSSProperties` | No | CSS styles for the headline |
| `className` | `string` | No | CSS class name for the headline |
| `key` | `string` | No | Preact key property |

## Usage Examples

### Basic Usage

```ts
const spec: NarrativeTextSpec = {
  headline: {
    type: 'headline',
    phrases: [
      {
        type: 'text',
        value: 'Data Analysis Report',
      },
    ],
  },
  sections: [
    {
      paragraphs: [
        {
          type: 'normal',
          phrases: [
            {
              type: 'text',
              value: 'Report content...',
            },
          ],
        },
      ],
    },
  ],
};
```

## Best Practices

1. **Document Structure**
   - Use `headline` to define clear document titles
   - Organize content structure through `sections`
   - Maintain clear and consistent hierarchical structure

2. **Style Management**
   - Use `styles` to define global styles
   - Implement theme customization through `className`
   - Avoid defining too many styles at the top level to maintain style maintainability

3. **Performance Optimization**
   - Use the `key` property appropriately
   - Avoid overly deep nested structures
   - Control the number of sections and phrases 