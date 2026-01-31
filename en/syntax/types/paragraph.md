---
url: /en/syntax/types/paragraph.md
---

# Paragraph

`ParagraphSpec` defines the types of paragraphs in a document, including headings, body text, lists, and more. It is the basic organizational unit of document content, using different paragraph types to achieve diverse content presentation.

## Type Definition

```ts
import type { CommonProps, CustomBlockElement } from './common';
import type { PhraseSpec } from './phrase';

export type ParagraphSpec = HeadingParagraphSpec | TextParagraphSpec | BulletsParagraphSpec | CustomBlockElement;

export enum ParagraphType {
  HEADING1 = 'heading1',
  HEADING2 = 'heading2',
  HEADING3 = 'heading3',
  HEADING4 = 'heading4',
  HEADING5 = 'heading5',
  HEADING6 = 'heading6',
  NORMAL = 'normal',
  BULLETS = 'bullets',
}

export type HeadingParagraphSpec = CommonProps & {
  type: ParagraphType.HEADING1 | ParagraphType.HEADING2 | ParagraphType.HEADING3 |
        ParagraphType.HEADING4 | ParagraphType.HEADING5 | ParagraphType.HEADING6;
  phrases: PhraseSpec[];
};

export type TextParagraphSpec = CommonProps & {
  type: ParagraphType.NORMAL;
  phrases: PhraseSpec[];
};

export type BulletsParagraphSpec = CommonProps & {
  type: ParagraphType.BULLETS;
  isOrder: boolean;
  bullets: BulletItemSpec[];
};

export type BulletItemSpec = CommonProps & {
  type: 'bullet-item';
  phrases: PhraseSpec[];
  subBullet?: BulletsParagraphSpec;
};
```

## Paragraph Type Descriptions

### Heading Paragraph (HeadingParagraphSpec)

Used to create headings of different levels:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | `ParagraphType.HEADING1` ~ `HEADING6` | Yes | Heading level |
| `phrases` | `PhraseSpec[]` | Yes | Heading content |
| `styles` | `CSSProperties` | No | Heading styles |
| `className` | `string` | No | CSS class name |

### Text Paragraph (TextParagraphSpec)

Used for regular text content:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | `ParagraphType.NORMAL` | Yes | Fixed as 'normal' |
| `phrases` | `PhraseSpec[]` | Yes | Paragraph content |
| `styles` | `CSSProperties` | No | Paragraph styles |
| `className` | `string` | No | CSS class name |

### Bullets Paragraph (BulletsParagraphSpec)

Used to create ordered or unordered lists:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | `ParagraphType.BULLETS` | Yes | Fixed as 'bullets' |
| `isOrder` | `boolean` | Yes | Whether it's an ordered list |
| `bullets` | `BulletItemSpec[]` | Yes | Array of list items |
| `styles` | `CSSProperties` | No | List styles |
| `className` | `string` | No | CSS class name |

### Bullet Item (BulletItemSpec)

Individual item in a list:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | `'bullet-item'` | Yes | Fixed as 'bullet-item' |
| `phrases` | `PhraseSpec[]` | Yes | List item content |
| `subBullet` | `BulletsParagraphSpec` | No | Nested sub-list |
| `styles` | `CSSProperties` | No | List item styles |
| `className` | `string` | No | CSS class name |

## Usage Examples

### Heading Paragraph

```ts
const heading: HeadingParagraphSpec = {
  type: 'heading1',
  phrases: [
    {
      type: 'text',
      value: 'Data Analysis Report',
    },
  ],
  styles: {
    marginBottom: '1em',
  },
};
```

### Text Paragraph

```ts
const text: TextParagraphSpec = {
  type: 'normal',
  phrases: [
    {
      type: 'text',
      value: 'Based on the data analysis, ',
    },
    {
      type: 'entity',
      value: 'user growth rate',
      metadata: {
        entityType: 'metric_name',
      },
    },
    {
      type: 'text',
      value: 'reached ',
    },
    {
      type: 'entity',
      value: '15%',
      metadata: {
        entityType: 'ratio_value',
        assessment: 'positive',
      },
    },
  ],
};
```

### Bullets Paragraph

```ts
const list: BulletsParagraphSpec = {
  type: 'bullets',
  isOrder: true,
  bullets: [
    {
      type: 'bullet-item',
      phrases: [
        {
          type: 'text',
          value: 'User Growth Analysis',
        },
      ],
      subBullet: {
        type: 'bullets',
        isOrder: false,
        bullets: [
          {
            type: 'bullet-item',
            phrases: [
              {
                type: 'text',
                value: 'New Users: 10,000',
              },
            ],
          },
        ],
      },
    },
  ],
};
```

## Best Practices

1. **Paragraph Organization**
   * Use appropriate paragraph types to express content
   * Maintain clear and consistent paragraph hierarchy
   * Use heading levels (h1-h6) appropriately

2. **List Usage**
   * Choose ordered/unordered lists based on content
   * Use nested lists moderately
   * Keep list structures concise

3. **Style Management**
   * Use unified style themes
   * Avoid excessive inline styles
   * Prioritize using className for style management
