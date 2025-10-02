---
url: /en/schema/structure.md
---

# Structure Overview

![overview](https://gw.alipayobjects.com/mdn/rms_e59602/afts/img/A*QpAmQYCQL2cAAAAAAAAAAAAAARQnAQ)

A data report includes the following components in its overall structure:

* `Headline`: The title;
* `Section`: Sections used to divide different report topics;

A `Section` contains multiple `Paragraph`s, which can be of the following types:

* `heading1` ~ `heading6` (note that these are different from the report-level Headline, which specifically refers to the article title);
* `normal` for regular text paragraphs, corresponding to the HTML `<p>` tag;
* `bullets` for lists, which can be ordered or unordered, corresponding to HTML `<ul>` and `<ol>` tags, supporting multi-level list nesting;
* `custom` for custom paragraph types;
* `visualization` for visualization charts (not currently supported, can be implemented through custom paragraphs);

Besides the standard type containing multiple `Paragraph`s, `Section` can also be customized.

Except for custom paragraphs, `heading`, `normal`, and `bullets` are all composed of multiple `Phrase`s, which include the following types:

* `text` for plain text;
* `entity` for entities, which correspond to specific data content in the data report;
* `custom` for custom phrases;

***

The latest standard JSON Schema definition for `T8` is as follows, or fetch from [unpkg.com](http://unpkg.com/@antv/t8/dist/schema.json):
