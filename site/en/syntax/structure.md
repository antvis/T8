---
title: Syntax Structure
---

# Syntax Structure

![overview](https://gw.alipayobjects.com/mdn/rms_e59602/afts/img/A*QpAmQYCQL2cAAAAAAAAAAAAAARQnAQ)

## Document Structure

A T8 document is organized hierarchically with the following components:

### Top Level

- **Headline** (optional): The document title
- **Sections**: One or more content sections

### Section Level

A `Section` groups related paragraphs together. It can contain:

- **Paragraphs**: Multiple paragraph elements
- **Custom blocks**: Extended content types

### Paragraph Level

Paragraphs support standard Markdown syntax:

- **Headings**: `#` through `######` for H1-H6
- **Text**: Regular paragraphs (like HTML `<p>`)
- **Lists**: Ordered (`1.`) and unordered (`-` or `*`) with nesting support
- **Custom**: Extended paragraph types

### Phrase Level

Within paragraphs, text is composed of phrases:

- **Plain text**: Regular text content
- **Entities**: Annotated data elements using `[text](entity_type, ...)`
- **Custom phrases**: Extended phrase types

## Syntax Examples

### Basic Document

```markdown
# Q4 Sales Report

## Overview

Total sales reached [¥1.2M](metric_value, origin=1200000).

## Regional Performance

- Eastern region: [¥800K](metric_value)
- Western region: [¥400K](metric_value)
```

### With Entity Annotations

```markdown
Sales increased by [15%](ratio_value, assessment="positive") compared to
[last quarter](time_desc). The [top performing region](dim_value) was
[Eastern China](dim_value) with [¥800,000](metric_value).
```

## Type System Reference

For TypeScript users, T8 provides type definitions:

```typescript
import type { NarrativeTextSpec, SectionSpec, ParagraphSpec, PhraseSpec, EntityType } from '@antv/t8';
```

See the [API documentation](../api/) for complete type definitions.
