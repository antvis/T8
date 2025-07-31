---
url: /zh/schema/types/section.md
---

# Section

`SectionSpec` 定义了文档中的段落区块，是内容组织的核心单元。它支持标准的段落组织形式和完全自定义的区块结构，为文档提供了灵活的布局能力。

## 类型定义

```ts
import type { CommonProps, CustomBlockElement } from './common';
import type { ParagraphSpec } from './paragraph';

export type StandardSectionSpec = {
  paragraphs?: ParagraphSpec[];
};

export type SectionSpec = (StandardSectionSpec | CustomBlockElement) & CommonProps;
```

## 类型说明

### StandardSectionSpec

标准段落区块，用于组织常规的文档内容：

| 属性 | 类型 | 必填 | 描述 |
|------|------|------|------|
| `paragraphs` | `ParagraphSpec[]` | 否 | 段落列表，可以包含不同类型的段落 |

### CustomBlockElement

自定义区块，用于扩展特殊的展示需求：

| 属性 | 类型 | 必填 | 描述 |
|------|------|------|------|
| `customType` | `string` | 是 | 自定义区块的类型标识 |
| `styles` | `CSSProperties` | 否 | 区块的 CSS 样式 |
| `className` | `string` | 否 | 区块的 CSS 类名 |
| `key` | `string` | 否 | 自定义标识 |
| `[key: string]` | `unknown` | 否 | 其他自定义属性 |

## 使用示例

### 标准段落区块

```ts
const standardSection: SectionSpec = {
  paragraphs: [
    {
      type: 'heading1',
      phrases: [
        {
          type: 'text',
          value: '数据概览',
        },
      ],
    },
    {
      type: 'normal',
      phrases: [
        {
          type: 'text',
          value: '本报告将从以下几个维度分析数据：',
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
              value: '用户增长趋势',
            },
          ],
        },
        {
          type: 'bullet-item',
          phrases: [
            {
              type: 'text',
              value: '地域分布情况',
            },
          ],
        },
      ],
    },
  ],
};
```

## 最佳实践

1. **内容组织**
   * 使用 `StandardSectionSpec` 组织常规文本内容
   * 通过 `paragraphs` 数组合理安排段落顺序
   * 保持段落层级的清晰和一致

2. **样式管理**
   * 使用 `styles` 定义区块级样式
   * 通过 `className` 实现主题定制
   * 注意样式的作用域，避免样式污染
