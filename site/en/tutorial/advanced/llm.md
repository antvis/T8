---
title: Using in LLM
---

# Large Language Model Applications

Large language models excel in understanding and processing textual information, while `T8` provides a standardized Schema and rendering capability for text display. By combining these two, we can effortlessly achieve the visualization of user data briefings, improving the efficiency of reading and interpreting text-based data.

Through this approach, we can provide users with an AI Agent application or use it as a tool or MCP for Agent applications to assist in establishing business workflows.

## Overall Process

- **Data Retrieval**: Acquire data by integrating various data retrieval tools such as search results, knowledge bases, datasets, models, tools, APIs, etc.
- **Structuring Text Data**: Process the retrieved data into T8 Syntax format using large language models combined with prompt engineering. T8 Syntax is a markdown-like language that combines text formatting with entity annotations.
- **Render Content**: If working within a code-editing application, integrate with `T8`'s API; if on an Agent platform, integrate `T8` using the platform's "Custom Card" feature.

## Prompt Engineering

<<< @/../prompt.md

## T8 Syntax

T8 uses a markdown-like syntax for rendering narrative text with rich entity annotations. The syntax supports:

- Headings (# to ######)
- Text formatting (**bold**, _italic_, **underline**)
- Links `[text](url)`
- Entity syntax: `[displayText](entityType, key1=value1, key2="value2")`
- Bullet lists (unordered and ordered)

For complete syntax documentation, see the [T8 Syntax Guide](/en/syntax/).

## Case Study

We have built a T8 case study based on Ant Group’s Agent Platform [TBox](https://www.tbox.cn/). You can refer to [Text Summary].
