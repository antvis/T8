---
url: /zh/schema/types/narrative-text.md
---

# NarrativeText

`NarrativeTextSpec` 是 T8 Schema 系统的顶层类型，用于描述整个叙事文本文档的结构。它定义了文档的整体布局、组织方式和样式规范。

## 类型定义

```ts
import type { CommonProps } from './common';
import type { HeadlineSpec, SectionSpec } from './structure';

type NarrativeTextSpec = CommonProps & {
  headline?: HeadlineSpec;
  sections?: SectionSpec[];
};
```

## 核心组件

### HeadlineSpec

标题组件用于定义文档的主标题：

```ts
type HeadlineSpec = CommonProps & {
  type: 'headline';
  phrases: PhraseSpec[];
};
```

## 属性说明

### NarrativeTextSpec

| 属性 | 类型 | 必填 | 描述 |
|------|------|------|------|
| `headline` | `HeadlineSpec` | 否 | 文档标题配置 |
| `sections` | `SectionSpec[]` | 否 | 文档的段落区块列表 |
| `styles` | `CSSProperties` | 否 | 文档级别的 CSS 样式 |
| `className` | `string` | 否 | 文档容器的 CSS 类名 |
| `key` | `string` | 否 | Preact key 属性，用于优化渲染性能 |

### HeadlineSpec

| 属性 | 类型 | 必填 | 描述 |
|------|------|------|------|
| `type` | `'headline'` | 是 | 固定值，标识这是一个标题组件 |
| `phrases` | `PhraseSpec[]` | 是 | 标题内容，由短语组成 |
| `styles` | `CSSProperties` | 否 | 标题的 CSS 样式 |
| `className` | `string` | 否 | 标题的 CSS 类名 |
| `key` | `string` | 否 | Preact key 属性 |

## 使用示例

### 基础用法

```ts
const spec: NarrativeTextSpec = {
  headline: {
    type: 'headline',
    phrases: [
      {
        type: 'text',
        value: '数据分析报告',
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
              value: '报告内容...',
            },
          ],
        },
      ],
    },
  ],
};
```

## 最佳实践

1. **文档结构**
   * 使用 `headline` 定义清晰的文档标题
   * 通过 `sections` 合理组织内容结构
   * 保持层级结构的清晰和一致

2. **样式管理**
   * 使用 `styles` 定义全局样式
   * 通过 `className` 实现主题定制
   * 避免在顶层定义过多的样式，保持样式的可维护性

3. **性能优化**
   * 合理使用 `key` 属性
   * 避免过深的嵌套结构
   * 控制 sections 和 phrases 的数量
