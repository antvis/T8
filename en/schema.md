---
url: /en/schema.md
---

# Schema

## Overview

T8 Schema is a JSON Schema specification for declaratively describing data interpretation reports. It provides a complete type system for building structured narrative text visualization content.

## Core Concepts

T8 Schema system includes the following core concepts:

1. **NarrativeText**

   * Acts as the top-level container for the entire document
   * Contains Headline and multiple Section blocks
   * Supports global style configuration

2. **Section**

   * Used to organize and manage collections of related paragraphs
   * Supports standard paragraph groups and custom blocks
   * Can be flexibly extended to accommodate different display requirements

3. **Paragraph**

   * Supports multiple paragraph types: headings, body text, lists, etc.
   * Each type has its specific structure and purpose
   * Can be extended through custom types

4. **Phrase**
   * Serves as the smallest unit of text composition
   * Includes plain text, entities, and custom phrases
   * Supports rich styling and interaction configuration

## Type System

You can use T8's type definitions in TypeScript projects as follows:

```ts
import type {
  NarrativeTextSpec,
  ParagraphSpec,
  PhraseSpec,
  // ...
} from '@antv/t8';
```

The main type definitions include:

* `NarrativeTextSpec`: Top-level document structure
* `SectionSpec`: Section block structure
* `ParagraphSpec`: Paragraph type definitions
* `PhraseSpec`: Phrase type definitions
* `EntityType`: Entity type enumeration
* `CommonProps`: Common property definitions

## Extensibility

T8 Schema has designed a comprehensive extension mechanism:

1. **Custom Blocks**

   * Extend through the `CustomBlockElement` interface
   * Can implement completely custom block structures

2. **Custom Phrases**

   * Extend through the `CustomPhraseSpec` interface
   * Supports custom metadata and rendering logic

3. **Style System**
   * All components support `CommonProps`
   * Can customize styles through `styles` and `className`

## Detailed Documentation

* [Overall Structure](./structure.md) - Understand the overall organization of the Schema
* Type Definitions
  * [NarrativeText](./types/narrative-text.md) - Top-level text structure
  * [Section](./types/section.md) - Section blocks
  * [Paragraph](./types/paragraph.md) - Paragraph types
  * [Phrase & Entity](./types/phrase.md) - Phrases and entities
