---
url: /zh/schema/structure.md
---

# 总体结构说明

![overview](https://gw.alipayobjects.com/mdn/rms_e59602/afts/img/A*QpAmQYCQL2cAAAAAAAAAAAAAARQnAQ)

一份数据报告从整体结构上，包括：

* `Headline` 标题；
* `Section` 段落，用于划分不同报告主题；

`Section` 内包含了多个 `Paragraph`，段落类型可能有：

* `heading1` ~ `heading6`（注意这里和报告级别的 不同，Headline 不同，Headline 特指文章标题）；
* `normal` 即普通文本段落，对应 html 的 `<p>` 标签；
* `bullets` 列表，可以分为有序列表和无序列表，对应 html 的 `<ul>` 和 `<ol>` 标签，支持多级列表嵌套；
* `custom` 自定义段落类型；
* `visualization` 可视化图表（暂不支持，可通过自定义段落实现）；

`Section` 除了标准类型含多个 `Paragraph` 之外，还可以自定义。

除了自定义段落之外，`heading`、`normal`、`bullets` 都是由多个 `Phrase` 组成的，即短语，`Phrase` 的类型主要包括：

* `text` 纯文本;
* `entity` 实体，也就是数据报告中对应明细数据的内容;
* `custom` 自定义短语;

***

最新的 `T8` 标准 JSON Schema 定义如下，或者从远程源 [unpkg.com](http://unpkg.com/@antv/t8/dist/schema.json) 抓取：

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
        "proportion",
        "rank",
        "difference",
        "anomaly",
        "association",
        "distribution",
        "seasonality"
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
