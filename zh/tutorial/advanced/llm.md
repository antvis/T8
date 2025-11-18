---
url: /zh/tutorial/advanced/llm.md
---

# 大模型应用

大模型下在于对于文本信息的理解和处理上有很大的优势，而 T8 具备有文本显示的标准 Schema 和渲染能力，二者互相配合，可以轻松实现用户数据简报信息的可视化，提升文本数据阅读的效率。

通过这样的方式，可以提供一个给用户使用的 AI Agent 应用，或者作为 Agent 应用的工具或者 MCP，辅助业务流程的建立。

## 整体流程

* **获取数据信息**：通过增加一些数据检索工具，获取数据信息，比如：搜索结果、知识库、数据集、模型、工具、API 等。
* **对文本数据结构化处理**：通过大模型 + 提示词的方式，将上一步获取的数据信息，处理成 T8 可识别、可渲染的 JSON Schema 格式。
* **渲染 Schema**：如果是通过代码编辑应用，则结合 `T8` 的 API 集成；如果通过 Agent 平台，需要通过平台 `自定义卡片` 的能力集成 `T8`。

## 提示词 Prompt

```md
你是一位经验丰富的数据分析师, 擅长根据给定主题和真实数据，撰写结构化、信息丰富的文章。

---

## 任务目标

请根据我提供的 JSON Schema 规范，结合给定的**主题内容**或者**具体数据**，生成一篇结构化的文章。文章内容需严格遵循输出格式和实体标注要求。

---

## 数据要求

- 所有数据必须来源于**公开真实的数据源**，包括但不限于：
  - 官方公告/财报。
  - 权威财经、科技媒体报道（如路透社、彭博社、财新网、TechCrunch 等）。
  - 知名行业研究机构报告（如 IDC、Canalys、Counterpoint Research 等）。
- **严禁使用任何虚构、AI猜测、模拟或未经证实的非公开数据。**
- 数据必须是**具体的数字**（例如，“1.46亿台”、“7058台”），而非模糊的大概数字（如“几百万”、“数十辆”）。

---

## 输出格式要求

请严格按照上传的 JSON Schema 结构来撰写文章内容，下面是对 JSON Schema 简单的讲解：

- **顶级结构**：文章应包含一个根对象，其中包含 `headline` 和 `sections` 数组 。
- **结构元素**：在 `sections` 数组内部，使用 `paragraph`、`phrase` 等元素来构建文章内容。

  - `section`：代表文章的一个主要章节，应包含 `paragraphs` 数组。
  - `paragraph`：代表一个段落，其中包含 `phrases` 数组和当前 `paragraph` 的 `type`，其 `phrases` 数组由 `text` 和 `entity` 元素构成。
  - `bullet`：用于表示列表整体。
  - `bullet-item`：用于表述列表中的某个项。
  - `text`：用于普通文本内容。
  - `entity`：用于标注具有特定含义的短语或数值，其 `metadata` 包含 `entity_type` 和 `value`。

---

## `entity` 书写规范

### 实体标注类型 (`entity_type` 列表)

下面是实体短语支持的类型列表，请务必严格按照下表进行实体标注：

| 类型                 | 说明       | 示例                       |
| -------------------- | ---------- | -------------------------- |
| `metric_name`        | 指标名称   | “出货量”、“增长率”         |
| `metric_value`       | 主指标值   | “1.46亿台”、“120座工厂”    |
| `other_metric_value` | 其他指标值 | “192亿美元”                |
| `delta_value`        | 差值       | “+120”                     |
| `ratio_value`        | 差率       | “+8.4%”、“9%”              |
| `contribute_ratio`   | 贡献度     | “40%”                      |
| `trend_desc`         | 趋势描述   | “持续上升”、“趋于平稳”     |
| `dim_value`          | 维度标识   | “印度”、“江苏”、“海外市场” |
| `time_desc`          | 时间标识   | “2024年Q3”、“全年”         |
| `proportion`         | 比例描述   | “30%"                      |

在可能的情况下，要求尽可能多的将句子中的关键信息使用 `entity` 来取代普通 `text`（如指标、数值、时间、数字等），保证生成文本的多元性，提高可读性。(尤其要提升 `delta_value`, `ratio_value`, `proportion`短语的使用频率)。

### `entity` 可选字段（强烈推荐使用）

为每个 `entity` 尽量添加以下字段，以丰富结构和信息：

- `origin`：数据本身在原始来源中的精确数值表示（例如，对于“1.46亿台”，其原始数值可能是 `146000000`；对于“13.9%”，其原始数值可能是 `0.139221`）。
- `assessment`：根据官方数据，对该指标的增长或变化趋势进行判断（仅限 `'positive'` | `'negative'` | `'equal'` | `'neutral'`）。
- `detail`：对实体内容的补充数据说明（例如，面对 `trend_desc`， `detail`应为一个具体数据组成的数组，例如 `[2,3,4,1,7]`）。

---

## 其他要求

- 文章总字数应**不少于 800 个汉字**（请根据实际信息量调整具体字数）。
- 文章内容需**逻辑清晰、结构分明**，确保段落之间、章节之间过渡自然。
- 对数据提供**适当的解释和趋势分析**，不仅仅是罗列数字，要体现数据背后的意义。
- 文章语言应**自然流畅、客观专业**，避免口语化、营销色彩，以及不必要的实体或数值堆砌。
- 在最终输出的 JSON 中，`definitions` 部分可以**直接省略**，我只需要主体 JSON 内容。
- 在最终的输出中，任何多余的描述和 `markdown` 的代码快包裹都不需要，我只要纯文本形式的 JSON Schema。

## 输出格式要求

**【🔥 强制指令】**

输出必须使用**缩写的 JSON 键名**和**数字类型值映射**，以最小化令牌长度。严格遵守“缩减键名映射表”和“类型值数字映射表”中的定义。

**重要提示：** 数组结构必须进行优化。将所有元素数组（例如，短语、段落、项目符号）转换为包含 **dt**（默认类型）和 **i**（项目）的对象。只有当子项的类型与父级的 **dt** **不同**时，才需要显式包含 **t** 键。

## 缩减键名映射表

| 缩写键 | 原始键      | 所在文件/类型                 | 备注             |
| ------ | ----------- | ----------------------------- | ---------------- |
| t      | type        | 所有元素                      | 最高频键         |
| v      | value       | Phrase/BulletItem             |                  |
| m      | metadata    | Phrase                        |                  |
| o      | origin      | EntityMetaData                |                  |
| d      | detail      | EntityMetaData                |                  |
| a      | assessment  | EntityMetaData                |                  |
| et     | entityType  | EntityMetaData                |                  |
| sid    | sourceId    | EntityMetaData                |                  |
| c      | chart       | EntityMetaData                |                  |
| h      | headline    | NarrativeTextSpecs            |                  |
| s      | sections    | NarrativeTextSpecs            |                  |
| p      | phrases     | Headline/Paragraph/BulletItem |                  |
| pa     | paragraphs  | StandardSectionSpec           |                  |
| tit    | title       | Section                       |                  |
| b      | bullets     | BulletsParagraphSpec          |                  |
| io     | isOrder     | BulletsParagraphSpec          |                  |
| bs     | subBullet   | BulletItemSpec                |                  |
| ct     | customType  | CustomBlock/Meta              |                  |
| isB    | isB         | boldTextPhraseSpec            | 只在 true 时出现 |
| isI    | isI         | italicTextPhraseSpec          | 只在 true 时出现 |
| isU    | isU         | underlineTextPhraseSpec       | 只在 true 时出现 |
| url    | url         | urlTextPhraseSpecs            |                  |
| sy     | styles      | CommonProps                   |                  |
| cl     | className   | CommonProps                   |                  |
| k      | key         | CommonProps                   |                  |
| cfg    | config      | Chart                         |                  |
| dat    | data        | Chart                         |                  |
| r      | range       | Chart                         |                  |
| dt     | defaultType | 结构优化数组默认类型          | 用于结构还原     |
| i      | items       | 结构优化子项数组              | 用于结构还原     |

## 类型值数字映射表 (VALUE_DECODER_MAPS)

| 原始类型           | 缩写值 | 备注          |
| ------------------ | ------ | ------------- |
| metric_name        | 20     | 主指标名      |
| metric_value       | 21     | 主指标值      |
| other_metric_value | 22     | 其他指标值    |
| contribute_ratio   | 23     | 贡献度        |
| delta_value        | 24     | 变化值/差值   |
| ratio_value        | 25     | 变化率/百分比 |
| trend_desc         | 26     | 趋势描述      |
| dim_value          | 27     | 维值/步骤     |
| time_desc          | 28     | 时间描述/值   |
| proportion         | 29     | 占比/比例     |

## 段落、短语和硬编码结构类型映射

| 原始类型    | 缩写值 | 所属枚举/结构 | 备注                                  |
| ----------- | ------ | ------------- | ------------------------------------- |
| text        | 1      | PhraseType    | 高频短语默认值                        |
| entity      | 2      | PhraseType    |                                       |
| custom      | 3      | PhraseType    |                                       |
| normal      | 10     | ParagraphType | 高频段落默认值                        |
| bullets     | 11     | ParagraphType |                                       |
| heading1    | 12     | ParagraphType |                                       |
| heading2    | 13     | ParagraphType |                                       |
| heading3    | 14     | ParagraphType |                                       |
| heading4    | 15     | ParagraphType |                                       |
| heading5    | 16     | ParagraphType |                                       |
| heading6    | 17     | ParagraphType |                                       |
| headline    | 30     | 结构类型      | HeadlineSpec.type                     |
| section     | 31     | 结构类型      | Section title.type (title 为 text 时) |
| bullet-item | 32     | 结构类        |

```

## JSON Schema

我们提供了 `T8` 最新的标准 JSON Schema 定义，用于给大模型生成数据。

* `NPM 包`：[unpkg.com](http://unpkg.com/@antv/t8/dist/schema.json)。
* `GitHub`：库\`：[GitHub](https://github.com/antvis/T8/blob/main/schema.json)。
* `构建`：通过 clone T8 源码，运行 `npm run build` 命令，会生成 `schema.json` 文件。

```json
{
  "$ref": "#/definitions/NarrativeTextSpec",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "definitions": {
    "BulletItemSpec": {
      "additionalProperties": false,
      "properties": {
        "className": {
          "type": "string"
        },
        "key": {
          "type": "string"
        },
        "phrases": {
          "items": {
            "$ref": "#/definitions/PhraseSpec"
          },
          "type": "array"
        },
        "styles": {
          "type": "object"
        },
        "subBullet": {
          "$ref": "#/definitions/BulletsParagraphSpec"
        },
        "type": {
          "const": "bullet-item",
          "type": "string"
        }
      },
      "required": ["phrases", "type"],
      "type": "object"
    },
    "BulletsParagraphSpec": {
      "additionalProperties": false,
      "properties": {
        "bullets": {
          "items": {
            "$ref": "#/definitions/BulletItemSpec"
          },
          "type": "array"
        },
        "className": {
          "type": "string"
        },
        "isOrder": {
          "type": "boolean"
        },
        "key": {
          "type": "string"
        },
        "styles": {
          "type": "object"
        },
        "type": {
          "const": "bullets",
          "type": "string"
        }
      },
      "required": ["bullets", "isOrder", "type"],
      "type": "object"
    },
    "CustomBlockElement": {
      "description": "basic block element structure, used for extends",
      "properties": {
        "className": {
          "type": "string"
        },
        "customType": {
          "type": "string"
        },
        "key": {
          "type": "string"
        },
        "styles": {
          "type": "object"
        }
      },
      "required": ["customType"],
      "type": "object"
    },
    "CustomMetaData": {
      "additionalProperties": {},
      "description": "custom phrase metadata",
      "properties": {
        "customType": {
          "type": "string"
        }
      },
      "required": ["customType"],
      "type": "object"
    },
    "CustomPhraseSpec<CustomMetaData>": {
      "additionalProperties": false,
      "properties": {
        "className": {
          "type": "string"
        },
        "key": {
          "type": "string"
        },
        "metadata": {
          "$ref": "#/definitions/CustomMetaData"
        },
        "styles": {
          "type": "object"
        },
        "type": {
          "const": "custom",
          "type": "string"
        },
        "value": {
          "type": "string"
        }
      },
      "required": ["type"],
      "type": "object"
    },
    "EntityMetaData": {
      "additionalProperties": false,
      "properties": {
        "assessment": {
          "$ref": "#/definitions/ValueAssessment",
          "description": "assessment up or down, used for derived value 衍生指标评估参数，指定上涨或者下跌"
        },
        "detail": {
          "description": "detail data, 明细数据，用于弹框展示"
        },
        "entityType": {
          "$ref": "#/definitions/EntityType",
          "description": "entity type, 实体类型标记"
        },
        "origin": {
          "description": "original data, 原始数据",
          "type": "number"
        },
        "sourceId": {
          "description": "source id of the variable, to access the variable info from variableSourceMap",
          "type": "string"
        }
      },
      "required": ["entityType"],
      "type": "object"
    },
    "EntityPhraseSpec": {
      "additionalProperties": false,
      "properties": {
        "className": {
          "type": "string"
        },
        "key": {
          "type": "string"
        },
        "metadata": {
          "$ref": "#/definitions/EntityMetaData"
        },
        "styles": {
          "type": "object"
        },
        "type": {
          "const": "entity",
          "type": "string"
        },
        "value": {
          "type": "string"
        }
      },
      "required": ["type"],
      "type": "object"
    },
    "EntityType": {
      "enum": [
        "metric_name",
        "metric_value",
        "other_metric_value",
        "contribute_ratio",
        "delta_value",
        "ratio_value",
        "trend_desc",
        "dim_value",
        "time_desc",
        "proportion"
      ],
      "type": "string"
    },
    "HeadingParagraphSpec": {
      "additionalProperties": false,
      "properties": {
        "className": {
          "type": "string"
        },
        "key": {
          "type": "string"
        },
        "phrases": {
          "items": {
            "$ref": "#/definitions/PhraseSpec"
          },
          "type": "array"
        },
        "styles": {
          "type": "object"
        },
        "type": {
          "enum": ["heading1", "heading2", "heading3", "heading4", "heading5", "heading6"],
          "type": "string"
        }
      },
      "required": ["phrases", "type"],
      "type": "object"
    },
    "HeadlineSpec": {
      "additionalProperties": false,
      "properties": {
        "className": {
          "type": "string"
        },
        "key": {
          "type": "string"
        },
        "phrases": {
          "items": {
            "$ref": "#/definitions/PhraseSpec"
          },
          "type": "array"
        },
        "styles": {
          "type": "object"
        },
        "type": {
          "const": "headline",
          "type": "string"
        }
      },
      "required": ["phrases", "type"],
      "type": "object"
    },
    "NarrativeTextSpec": {
      "additionalProperties": false,
      "properties": {
        "className": {
          "type": "string"
        },
        "headline": {
          "$ref": "#/definitions/HeadlineSpec"
        },
        "key": {
          "type": "string"
        },
        "sections": {
          "items": {
            "$ref": "#/definitions/SectionSpec"
          },
          "type": "array"
        },
        "styles": {
          "type": "object"
        }
      },
      "type": "object"
    },
    "ParagraphSpec": {
      "anyOf": [
        {
          "$ref": "#/definitions/HeadingParagraphSpec"
        },
        {
          "$ref": "#/definitions/TextParagraphSpec"
        },
        {
          "$ref": "#/definitions/BulletsParagraphSpec"
        },
        {
          "$ref": "#/definitions/CustomBlockElement"
        }
      ]
    },
    "PhraseSpec": {
      "anyOf": [
        {
          "$ref": "#/definitions/TextPhraseSpec"
        },
        {
          "$ref": "#/definitions/EntityPhraseSpec"
        },
        {
          "$ref": "#/definitions/CustomPhraseSpec<CustomMetaData>"
        }
      ]
    },
    "SectionSpec": {
      "anyOf": [
        {
          "additionalProperties": false,
          "properties": {
            "className": {
              "type": "string"
            },
            "key": {
              "type": "string"
            },
            "paragraphs": {
              "items": {
                "$ref": "#/definitions/ParagraphSpec"
              },
              "type": "array"
            },
            "styles": {
              "type": "object"
            }
          },
          "type": "object"
        },
        {
          "properties": {
            "className": {
              "type": "string"
            },
            "customType": {
              "type": "string"
            },
            "key": {
              "type": "string"
            },
            "styles": {
              "type": "object"
            }
          },
          "required": ["customType"],
          "type": "object"
        }
      ]
    },
    "TextParagraphSpec": {
      "additionalProperties": false,
      "properties": {
        "className": {
          "type": "string"
        },
        "key": {
          "type": "string"
        },
        "phrases": {
          "items": {
            "$ref": "#/definitions/PhraseSpec"
          },
          "type": "array"
        },
        "styles": {
          "type": "object"
        },
        "type": {
          "const": "normal",
          "type": "string"
        }
      },
      "required": ["phrases", "type"],
      "type": "object"
    },
    "TextPhraseSpec": {
      "additionalProperties": false,
      "properties": {
        "bold": {
          "type": "boolean"
        },
        "className": {
          "type": "string"
        },
        "italic": {
          "type": "boolean"
        },
        "key": {
          "type": "string"
        },
        "styles": {
          "type": "object"
        },
        "type": {
          "const": "text",
          "type": "string"
        },
        "underline": {
          "type": "boolean"
        },
        "url": {
          "type": "string"
        },
        "value": {
          "type": "string"
        }
      },
      "required": ["type", "value"],
      "type": "object"
    },
    "ValueAssessment": {
      "enum": ["positive", "negative", "equal"],
      "type": "string"
    }
  }
}

```

## 案例

我们基于蚂蚁 Agent 平台[百宝箱](https://www.tbox.cn/)，构建了一个 T8 的案例，可以参考 \[Text Summary]。
