---
url: /zh/schema/types/paragraph.md
---

# Paragraph

`ParagraphSpec` 定义了文档中的段落类型，包括标题、正文、列表等多种形式。它是文档内容的基本组织单位，通过不同的段落类型来实现多样化的内容展示。

## 类型定义

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

## 段落类型说明

### 标题段落 (HeadingParagraphSpec)

用于创建不同级别的标题：

| 属性 | 类型 | 必填 | 描述 |
|------|------|------|------|
| `type` | `ParagraphType.HEADING1` ~ `HEADING6` | 是 | 标题级别 |
| `phrases` | `PhraseSpec[]` | 是 | 标题内容 |
| `styles` | `CSSProperties` | 否 | 标题样式 |
| `className` | `string` | 否 | CSS 类名 |

### 正文段落 (TextParagraphSpec)

用于普通文本内容：

| 属性 | 类型 | 必填 | 描述 |
|------|------|------|------|
| `type` | `ParagraphType.NORMAL` | 是 | 固定为 'normal' |
| `phrases` | `PhraseSpec[]` | 是 | 段落内容 |
| `styles` | `CSSProperties` | 否 | 段落样式 |
| `className` | `string` | 否 | CSS 类名 |

### 列表段落 (BulletsParagraphSpec)

用于创建有序或无序列表：

| 属性 | 类型 | 必填 | 描述 |
|------|------|------|------|
| `type` | `ParagraphType.BULLETS` | 是 | 固定为 'bullets' |
| `isOrder` | `boolean` | 是 | 是否为有序列表 |
| `bullets` | `BulletItemSpec[]` | 是 | 列表项数组 |
| `styles` | `CSSProperties` | 否 | 列表样式 |
| `className` | `string` | 否 | CSS 类名 |

### 列表项 (BulletItemSpec)

列表中的单个项目：

| 属性 | 类型 | 必填 | 描述 |
|------|------|------|------|
| `type` | `'bullet-item'` | 是 | 固定为 'bullet-item' |
| `phrases` | `PhraseSpec[]` | 是 | 列表项内容 |
| `subBullet` | `BulletsParagraphSpec` | 否 | 嵌套的子列表 |
| `styles` | `CSSProperties` | 否 | 列表项样式 |
| `className` | `string` | 否 | CSS 类名 |

## 使用示例

### 标题段落

```ts
const heading: HeadingParagraphSpec = {
  type: 'heading1',
  phrases: [
    {
      type: 'text',
      value: '数据分析报告',
    },
  ],
  styles: {
    marginBottom: '1em',
  },
};
```

### 正文段落

```ts
const text: TextParagraphSpec = {
  type: 'normal',
  phrases: [
    {
      type: 'text',
      value: '根据数据分析，',
    },
    {
      type: 'entity',
      value: '用户增长率',
      metadata: {
        entityType: 'metric_name',
      },
    },
    {
      type: 'text',
      value: '达到了',
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

### 列表段落

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
          value: '用户增长分析',
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
                value: '新增用户：10,000',
              },
            ],
          },
        ],
      },
    },
  ],
};
```

## 最佳实践

1. **段落组织**
   * 使用适当的段落类型表达内容
   * 保持段落层级的清晰和一致
   * 合理使用标题层级（h1-h6）

2. **列表使用**
   * 根据内容选择有序/无序列表
   * 适度使用嵌套列表
   * 保持列表结构的简洁

3. **样式管理**
   * 使用统一的样式主题
   * 避免内联样式过多
   * 优先使用 className 进行样式管理
