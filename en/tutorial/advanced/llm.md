---
url: /en/tutorial/advanced/llm.md
---

# Large Language Model Applications

Large language models excel in understanding and processing textual information, while `T8` provides a standardized Schema and rendering capability for text display. By combining these two, we can effortlessly achieve the visualization of user data briefings, improving the efficiency of reading and interpreting text-based data.

Through this approach, we can provide users with an AI Agent application or use it as a tool or MCP for Agent applications to assist in establishing business workflows.

## Overall Process

* **Data Retrieval**: Acquire data by integrating various data retrieval tools such as search results, knowledge bases, datasets, models, tools, APIs, etc.
* **Structuring Text Data**: Process the retrieved data into a T8-compatible and renderable JSON Schema format using large language models combined with prompt engineering.
* **Render Schema**: If working within a code-editing application, integrate with `T8`'s API; if on an Agent platform, integrate `T8` using the platform's "Custom Card" feature.

## Prompt Engineering

## JSON Schema

We provide the latest standard JSON Schema definition for `T8`, used for generating data with large models.

* `NPM Package`: [unpkg.com](http://unpkg.com/@antv/t8/dist/schema.json).
* `GitHub Repository`: [GitHub](https://github.com/antvis/T8/blob/main/schema.json).
* `Build`: Clone the T8 source code and run the `npm run build` command to generate the `schema.json` file.

## Case Study

We have built a T8 case study based on Ant Group’s Agent Platform [TBox](https://www.tbox.cn/). You can refer to \[Text Summary].
