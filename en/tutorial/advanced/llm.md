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

```md
You are an experienced data analyst who is good at writing structured, informative articles based on a given topic and real data.

---

## Mission Objective

Please generate a structured article based on the JSON Schema specification I provided, combined with the given topic content or specific data. The content of the article must strictly follow the output format and entity labeling requirements.

---

## Data Requirements

- All data must be from **publicly authentic data sources**, including but not limited to:
- Official announcement/financial report.
- Authoritative financial and technological media reports (such as Reuters, Bloomberg, Caixin.com, TechCrunch, etc.).
- Reports from well-known industry research institutions (such as IDC, Canalys, Counterpoint Research, etc.).
- **The use of any fictional, AI guessing, simulated or unproven non-public data is strictly prohibited. **
- The data must be ** specific numbers** (for example, "146 million units", "7058 units"), rather than vague approximate numbers (such as "millions", "dozens").

---

## Output format requirements

Please write the article strictly according to the uploaded JSON Schema structure. The following is a brief explanation of JSON Schema:

- **Top Structure**: The article should contain a root object containing an array of `headline` and `sections`.
- **Structural Elements**: Inside the `sections` array, use elements such as `paragraph`, `phrase` to construct the article content.

- `section`: represents a main chapter of the article and should contain an array of `paragraphs`.
- `paragraph`: Represents a paragraph containing an array of `phrases` and the current `paragraph` `type`, whose `phrases` array consists of `text` and `entity` elements.
- `bullet`: used to represent the entire list.
- `bullet-item`: used to express an item in the list.
- `text`: Used for normal text content.
- `entity`: Used to annotate phrases or values ​​with specific meanings, and its `metadata` contains `entity_type` and `value`.

---

## `entity` Writing specifications

### Entity label type (`entity_type` list)

Below is a list of types supported by entity phrases. Please be sure to strictly mark entities according to the following table:

| Type                 | Description                | Example                               |
| -------------------- | -------------------------- | ------------------------------------- |
| `metric_name`        | Indicator name             | "Shipment", "Growth Rate"             |
| `metric_value`       | Main indicator value       | "146 million units", "120 factories"  |
| `other_metric_value` | Other metric values        | "$19.2 billion"                       |
| `delta_value`        | Difference                 | "+120"                                |
| `ratio_value`        | Rate                       | "+8.4%", "9%"                         |
| `contribute_ratio`   | Contribution               | "40%"                                 |
| `trend_desc`         | Trend Description          | "Continuously Rising", "Stable"       |
| `dim_value`          | Dimensional identification | "India", "Jiangsu", "Overseas Market" |
| `time_desc`          | Time stamp                 | "Q3 2024", "all year"                 |
| `proportion`         | Proportion description     | "30%"                                 |

When possible, it is required to use as much key information in the sentence as possible to replace ordinary `text` (such as indicators, values, time, numbers, etc.), to ensure the diversity of generated text and improve readability. (In particular, it is necessary to increase the frequency of usage of the phrases `delta_value`, `ratio_value`, `proportion`).

### `entity` optional field (highly recommended)

Try to add the following fields for each `entity` to enrich the structure and information:

- `origin`: The exact numerical representation of the data itself in the original source (for example, for "146 million units", its original value might be `146 million units", and for "13.9%", its original value might be `0.139221`).
- `assessment`: Based on official data, judge the growth or changing trend of this indicator (only `'positive'` | `'negative'` | `'equal'` | `'neutral'`).
- `detail`: Supplementary data description of entity content (for example, in the face of `trend_desc`, `detail` should be an array of specific data, such as `[2,3,4,1,7]`).

---

## Other Requirements

- The total number of words in the article should be no less than 800 Chinese characters (please adjust the specific number of words according to the actual amount of information).
- The content of the article must be clear and clear in structure to ensure a natural transition between paragraphs and chapters.
- Provide the most appropriate explanation and trend analysis of the data, not just listing numbers, but also reflecting the meaning behind the data.
- The language of the article should be natural, fluent, objective and professional, and avoid colloquialism, marketing colors, and unnecessary physical or numerical stacking.
- In the final output JSON, the `definitions` part can be omitted directly, I only need the body JSON content.
- In the final output, no unnecessary description and fast wrapping of `markdown` code is needed, I just want JSON Schema in plain text.

## Output format requirements

**【🔥 Mandatory Instructions】**

Output must use **abbreviated JSON key names** and **numeric type value mappings** to minimize token length. Strictly adhere to the definitions in the "Abbreviated Key Name Mapping Table" and "Type Value Number Mapping Table".

**Important:** Array structures must be optimized. Convert all element arrays (e.g., phrases, paragraphs, bullets) into objects containing **dt** (default type) and **i** (items). A child item only needs to explicitly include a **t** key if its type differs from the parent's **dt**.

## Abbreviated Key Mapping Table

| Abbreviated Key | Original Key | File/Type Location                            | Notes                          |
| :-------------- | :----------- | :-------------------------------------------- | :----------------------------- |
| t               | type         | All Elements                                  | Highest frequency key          |
| v               | value        | Phrase/BulletItem                             |                                |
| m               | metadata     | Phrase                                        |                                |
| o               | origin       | EntityMetaData                                |                                |
| d               | detail       | EntityMetaData                                |                                |
| a               | assessment   | EntityMetaData                                |                                |
| et              | entityType   | EntityMetaData                                |                                |
| sid             | sourceId     | EntityMetaData                                |                                |
| c               | chart        | EntityMetaData                                |                                |
| h               | headline     | NarrativeTextSpecs                            |                                |
| s               | sections     | NarrativeTextSpecs                            |                                |
| p               | phrases      | Headline/Paragraph/BulletItem                 |                                |
| pa              | paragraphs   | StandardSectionSpec                           |                                |
| tit             | title        | Section                                       |                                |
| b               | bullets      | BulletsParagraphSpec                          |                                |
| io              | isOrder      | BulletsParagraphSpec                          |                                |
| bs              | subBullet    | BulletItemSpec                                |                                |
| ct              | customType   | CustomBlock/Meta                              |                                |
| isB             | isB          | boldTextPhraseSpec                            | Appears only when true         |
| isI             | isI          | italicTextPhraseSpec                          | Appears only when true         |
| isU             | isU          | underlineTextPhraseSpec                       | Appears only when true         |
| url             | url          | urlTextPhraseSpecs                            |                                |
| sy              | styles       | CommonProps                                   |                                |
| cl              | className    | CommonProps                                   |                                |
| k               | key          | CommonProps                                   |                                |
| cfg             | config       | Chart                                         |                                |
| dat             | data         | Chart                                         |                                |
| r               | range        | Chart                                         |                                |
| dt              | defaultType  | Array default type for structure optimization | Used for structure restoration |
| i               | items        | Sub-item array for structure optimization     | Used for structure restoration |

## Type Value Numeric Mapping Table (VALUE_DECODER_MAPS)

| Original Type      | Abbreviated Value | Notes                   |
| :----------------- | :---------------- | :---------------------- |
| metric_name        | 20                | Primary metric name     |
| metric_value       | 21                | Primary metric value    |
| other_metric_value | 22                | Other metric value      |
| contribute_ratio   | 23                | Contribution ratio      |
| delta_value        | 24                | Change value/Difference |
| ratio_value        | 25                | Change rate/Percentage  |
| trend_desc         | 26                | Trend description       |
| dim_value          | 27                | Dimension value/Step    |
| time_desc          | 28                | Time description/Value  |
| proportion         | 29                | Proportion/Ratio        |

## Paragraph, Phrase, and Hardcoded Structure Type Mapping

| Original Type | Abbreviated Value | Corresponding Enum/Structure | Notes                                      |
| :------------ | :---------------- | :--------------------------- | :----------------------------------------- |
| text          | 1                 | PhraseType                   | Default value for high-frequency phrase    |
| entity        | 2                 | PhraseType                   |                                            |
| custom        | 3                 | PhraseType                   |                                            |
| normal        | 10                | ParagraphType                | Default value for high-frequency paragraph |
| bullets       | 11                | ParagraphType                |                                            |
| heading1      | 12                | ParagraphType                |                                            |
| heading2      | 13                | ParagraphType                |                                            |
| heading3      | 14                | ParagraphType                |                                            |
| heading4      | 15                | ParagraphType                |                                            |
| heading5      | 16                | ParagraphType                |                                            |
| heading6      | 17                | ParagraphType                |                                            |
| headline      | 30                | Structure Type               | HeadlineSpec.type                          |
| section       | 31                | Structure Type               | Section title.type (when title is text)    |
| bullet-item   | 32                | Structure Type               |                                            |

```

## JSON Schema

We provide the latest standard JSON Schema definition for `T8`, used for generating data with large models.

* `NPM Package`: [unpkg.com](http://unpkg.com/@antv/t8/dist/schema.json).
* `GitHub Repository`: [GitHub](https://github.com/antvis/T8/blob/main/schema.json).
* `Build`: Clone the T8 source code and run the `npm run build` command to generate the `schema.json` file.

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

## Case Study

We have built a T8 case study based on Ant Group’s Agent Platform [TBox](https://www.tbox.cn/). You can refer to \[Text Summary].
