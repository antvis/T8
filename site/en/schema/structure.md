---
title: Overall Structure
---

# Overall Structure Description

![overview](https://gw.alipayobjects.com/mdn/rms_e59602/afts/img/A*QpAmQYCQL2cAAAAAAAAAAAAAARQnAQ)

A data report's overall structure includes:

- `Headline`: The title of the report
- `Section`: Paragraphs that divide different report topics

A `Section` contains multiple `Paragraph`s, which can be of the following types:

- `heading1` through `heading6` (note that these are different from the report-level Headline, which specifically refers to the article title)
- `normal`: Regular text paragraphs, corresponding to HTML's `<p>` tag
- `bullets`: Lists, which can be ordered or unordered, corresponding to HTML's `<ul>` and `<ol>` tags, supporting nested multi-level lists
- `custom`: Custom paragraph types
- `visualization`: Visualization charts (not currently supported, can be implemented through custom paragraphs)

Besides the standard type containing multiple `Paragraph`s, `Section` can also be customized.

Except for custom paragraphs, `heading`, `normal`, and `bullets` are all composed of multiple `Phrase`s. The main types of `Phrase` include:

- `text`: Plain text
- `entity`: Entities, which correspond to detailed data content in the data report
- `custom`: Custom phrases
