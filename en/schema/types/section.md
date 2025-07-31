---
url: /en/schema/types/section.md
---

# Section

`SectionSpec` defines the paragraph blocks in a document and is the core unit of content organization. It supports both standard paragraph organization and fully customized block structures, providing flexible layout capabilities for documents.

## Type Definition

```ts
import type { CommonProps, CustomBlockElement } from './common';
import type { ParagraphSpec } from './paragraph';

export type StandardSectionSpec = {
  paragraphs?: ParagraphSpec[];
};

export type SectionSpec = (StandardSectionSpec | CustomBlockElement) & CommonProps;
```

## Type Descriptions

### StandardSectionSpec

Standard paragraph block, used for organizing regular document content:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `paragraphs` | `ParagraphSpec[]` | No | List of paragraphs, can contain different types of paragraphs |

### CustomBlockElement

Custom block, used for extending special display requirements:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `customType` | `string` | Yes | Custom block type identifier |
| `styles` | `CSSProperties` | No | Block CSS styles |
| `className` | `string` | No | Block CSS class name |
| `key` | `string` | No | Custom identifier |
| `[key: string]` | `unknown` | No | Other custom properties |

## Usage Examples

### Standard Section Block

```ts
const standardSection: SectionSpec = {
  paragraphs: [
    {
      type: 'heading1',
      phrases: [
        {
          type: 'text',
          value: 'Data Overview',
        },
      ],
    },
    {
      type: 'normal',
      phrases: [
        {
          type: 'text',
          value: 'This report will analyze data from the following dimensions:',
        },
      ],
    },
    {
      type: 'bullets',
      isOrder: false,
      bullets: [
        {
          type: 'bullet-item',
          phrases: [
            {
              type: 'text',
              value: 'User Growth Trends',
            },
          ],
        },
        {
          type: 'bullet-item',
          phrases: [
            {
              type: 'text',
              value: 'Geographic Distribution',
            },
          ],
        },
      ],
    },
  ],
};
```

## Best Practices

1. **Content Organization**
   * Use `StandardSectionSpec` to organize regular text content
   * Arrange paragraphs in a logical order through the `paragraphs` array
   * Maintain clear and consistent paragraph hierarchy

2. **Style Management**
   * Use `styles` to define block-level styles
   * Implement theme customization through `className`
   * Be mindful of style scoping to avoid style pollution
