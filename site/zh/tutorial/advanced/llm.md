---
title: 结合大模型使用
---

# 大模型应用

大模型下在于对于文本信息的理解和处理上有很大的优势，而 T8 具备有文本显示的标准 Schema 和渲染能力，二者互相配合，可以轻松实现用户数据简报信息的可视化，提升文本数据阅读的效率。

通过这样的方式，可以提供一个给用户使用的 AI Agent 应用，或者作为 Agent 应用的工具或者 MCP，辅助业务流程的建立。

## 整体流程

- **获取数据信息**：通过增加一些数据检索工具，获取数据信息，比如：搜索结果、知识库、数据集、模型、工具、API 等。
- **对文本数据结构化处理**：通过大模型 + 提示词的方式，将上一步获取的数据信息，处理成 T8 可识别、可渲染的 JSON Schema 格式。
- **渲染 Schema**：如果是通过代码编辑应用，则结合 `T8` 的 API 集成；如果通过 Agent 平台，需要通过平台 `自定义卡片` 的能力集成 `T8`。

## 提示词 Prompt

<<< @/../prompt.zh-CN.md

## JSON Schema

我们提供了 `T8` 最新的标准 JSON Schema 定义，用于给大模型生成数据。

- `NPM 包`：[unpkg.com](http://unpkg.com/@antv/t8/dist/schema.json)。
- `GitHub`：库`：[GitHub](https://github.com/antvis/T8/blob/main/schema.json)。
- `构建`：通过 clone T8 源码，运行 `npm run build` 命令，会生成 `schema.json` 文件。

<<< @/../schema.json

## 案例

我们基于蚂蚁 Agent 平台[百宝箱](https://www.tbox.cn/)，构建了一个 T8 的案例，可以参考 [Text Summary]。
