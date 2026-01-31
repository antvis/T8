---
title: 语法结构
---

# 语法结构

![overview](https://gw.alipayobjects.com/mdn/rms_e59602/afts/img/A*QpAmQYCQL2cAAAAAAAAAAAAAARQnAQ)

## 文档结构

T8 文档采用层级结构组织，包含以下组件：

### 顶层

- **标题 (Headline)**（可选）：文档标题
- **段落区块 (Sections)**：一个或多个内容区块

### 区块层级

`Section` 将相关段落组织在一起，可以包含：

- **段落 (Paragraphs)**：多个段落元素
- **自定义区块**：扩展内容类型

### 段落层级

段落支持标准 Markdown 语法：

- **标题**：`#` 到 `######` 对应 H1-H6
- **文本**：常规段落（类似 HTML `<p>`）
- **列表**：有序列表（`1.`）和无序列表（`-` 或 `*`），支持嵌套
- **自定义**：扩展段落类型

### 短语层级

在段落内，文本由短语组成：

- **纯文本**：常规文本内容
- **实体**：使用 `[文本](实体类型, ...)` 标注的数据元素
- **自定义短语**：扩展短语类型

## 语法示例

### 基本文档

```markdown
# Q4 销售报告

## 概述

总销售额达到 [¥120万](metric_value, origin=1200000)。

## 各地区表现

- 华东地区：[¥80万](metric_value)
- 华西地区：[¥40万](metric_value)
```

### 带实体标注

```markdown
销售额相比[上季度](time_desc)增长了 [15%](ratio_value, assessment="positive")。
[表现最佳的地区](dim_value)是[华东](dim_value)，销售额为 [¥80万](metric_value)。
```

## 类型系统参考

对于 TypeScript 用户，T8 提供类型定义：

```typescript
import type {
  NarrativeTextSpec,
  SectionSpec,
  ParagraphSpec,
  PhraseSpec,
  EntityType
} from '@antv/t8';
```

完整的类型定义请参阅 [API 文档](../../api/index.md)。
