---
title: Schema 介绍
---

# Schema

## 概述

T8 Schema 是一套用于声明式描述数据解读报告的 JSON Schema 规范。它提供了一个完整的类型系统，用于构建结构化的叙事文本可视化内容。

## 核心概念

T8 Schema 系统主要包含以下核心概念：

1. **叙事文本 (NarrativeText)**

   - 作为整个文档的顶层容器
   - 包含标题（Headline）和多个段落区块（Section）
   - 支持全局样式配置

2. **段落区块 (Section)**

   - 用于组织和管理相关内容的段落集合
   - 支持标准段落组和自定义区块
   - 可以灵活扩展以适应不同的展示需求

3. **段落 (Paragraph)**

   - 支持多种段落类型：标题、正文、列表等
   - 每种类型都有其特定的结构和用途
   - 可以通过自定义类型扩展

4. **短语 (Phrase)**
   - 作为文本的最小组成单位
   - 包括纯文本、实体和自定义短语
   - 支持丰富的样式和交互配置

## 类型系统

通过以下方式可以在 TypeScript 项目中使用 T8 的类型定义：

```ts
import type {
  NarrativeTextSpec,
  ParagraphSpec,
  PhraseSpec,
  // ...
} from '@antv/t8';
```

主要的类型定义包括：

- `NarrativeTextSpec`: 顶层文档结构
- `SectionSpec`: 段落区块结构
- `ParagraphSpec`: 段落类型定义
- `PhraseSpec`: 短语类型定义
- `EntityType`: 实体类型枚举
- `CommonProps`: 通用属性定义

## 扩展性

T8 Schema 设计了完善的扩展机制：

1. **自定义区块**

   - 通过 `CustomBlockElement` 接口扩展
   - 可以实现完全自定义的区块结构

2. **自定义短语**

   - 通过 `CustomPhraseSpec` 接口扩展
   - 支持自定义元数据和渲染逻辑

3. **样式系统**
   - 所有组件都支持 `CommonProps`
   - 可以通过 `styles` 和 `className` 自定义样式

## 详细文档

- [总体结构](./structure.md) - 了解 Schema 的整体组织结构
- 类型定义
  - [NarrativeText](./types/narrative-text.md) - 顶层文本结构
  - [Section](./types/section.md) - 段落区块
  - [Paragraph](./types/paragraph.md) - 段落类型
  - [Phrase & Entity](./types/phrase.md) - 短语和实体
