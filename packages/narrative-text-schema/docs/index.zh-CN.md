---
title: 介绍
order: 0
group:
  path: /intro
  title: 介绍
  order: 0
nav:
  title: 解读文本 schema
  path: /schema
  order: 1
---

## 是什么

一套用于声明式描述数据解读报告的 json schema，在 T8 整个系统作为底层

## 用法

通过以下方法可导入 typescript 类型使用。

```ts | pure
import type { 
  NarrativeTextSpec, 
  ParagraphSpec,
  PhraseSpec,
  // ...
} from '@antv/narrative-text-schema';

```

## 总结构说明

![overview](https://gw.alipayobjects.com/mdn/rms_e59602/afts/img/A*QpAmQYCQL2cAAAAAAAAAAAAAARQnAQ)

如上图，一份数据报告从整体结构上，包括：
- `Headline` 标题；
- `Section` 段落，用于划分不同报告主题；

`Section` 内包含了多个 `Paragraph`，段落类型可能有：
- `heading1` ~ `heading6`（注意这里和报告级别的 不同，Headline 不同，Headline 特指文章标题）；
- `normal` 即普通文本段落，对应 html 的 `<p>` 标签；
- `bullets` 列表，可以分为有序列表和无序列表，对应 html 的 `<ul>` 和 `<ol>` 标签，支持多级列表嵌套；
- `custom` 自定义段落类型；
- `visualization` 可视化图表（暂不支持，可通过自定义段落实现）；
`Section` 除了标准类型含多个 `Paragraph` 之外，还可以自定义；

除了自定义段落之外，`heading`、`normal`、`bullets` 都是由多个 `Phrase` 组成的，即短语，`Phrase` 的类型主要包括：
- `text` 纯文本;
- `entity` 实体，也就是数据报告中对应明细数据的内容;
- `custom` 自定义短语;

`entity` 实体类型一览：
|type	|说明|	举例|
|--	|--|	--|
|metric_name	|主指标名|	DAU|
|metric_value|	主指标值|	100w|
|other_metric_value|	其他指标值|	1.23|
|delta_value|	差值|	-12|
|ratio_value	|差率|	+10%|
|contribute_ratio|	贡献度|	40%|
|trend_desc|	趋势描述|	周期性|
|dim_value|	维值|	北京|
|time_value|	时间|	7月15日|
|proportion| 占比	|	20%|

## 类型定义

为了降低提高阅读体验，以下将所有泛型相关定义均略掉。更多需要传入泛型进行自定义扩展可通过源码查阅。

### `NarrativeTextSpec`

```ts | pure
type NarrativeTextSpec = CommonProps & {
  headline?: HeadlineSpec;
  sections?: SectionSpec[];
};

// 默认自定义块级元素结构
interface DefaultBlockStructure extends ExcludeKeys {
  customType: string;
  [key: string]: unknown;
}

// 样式扩展
type CommonProps = {
  styles?: CSSProperties;
  className?: string;
};
```

### `HeadlineSpec`

```ts | pure
export type HeadlineSpec = CommonProps & {
  type: 'headline';
  phrases: PhraseSpec[];
};
```

### `SectionSpec`

```ts | pure
export type SectionSpec = (StandardSectionSpec | S) & CommonProps;

type StandardSectionSpec = {
  paragraphs?: ParagraphSpec[];
};
```

### `ParagraphSpec`

```ts | pure
type ParagraphSpec = HeadingParagraphSpec | TextParagraphSpec | BulletsParagraphSpec;

type HeadingParagraphSpec = CommonProps & {
  type: 'heading1' | 'heading2' | 'heading3' | 'heading4' | 'heading5' | 'heading6';
  phrases: PhraseSpec[];
};

type TextParagraphSpec = CommonProps & {
  type: 'normal';
  phrases: PhraseSpec[];
};

type BulletsParagraphSpec = CommonProps & {
  type: 'bullets';
  isOrder: boolean;
  bullets: BulletItemSpec[];
};

type BulletItemSpec = CommonProps & {
  type: 'bullet-item';
  phrases: PhraseSpec[];
  // nested list
  subBullet?: BulletsParagraphSpec;
};
```

### `PhraseSpec`

```ts | pure
type PhraseSpec =
  | TextPhraseSpec
  | EntityPhraseSpec
  | CustomPhraseSpec

// 纯文本短语
interface TextPhraseSpec {
  type: 'text';
  value: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  styles?: CSSProperties;
}

// 实体短语
interface EntityPhraseSpec {
  type: 'entity';
  value?: string;
  metadata?: EntityMetaData;
  styles?: CSSProperties;
}

// 自定义短语类型
interface CustomPhraseSpec<P extends CustomMetaData = CustomMetaData> {
  type: 'custom';
  value?: string;
  metadata?: P;
  styles?: CSSProperties;
}

type ValueAssessment = 'positive' | 'negative' | 'equal';

const EntityType = [
  /**
   * @description main indicator value 主指标名
   * @example DAU
   * */
  'metric_name',
  /**
   * @description main indicator name 主指标值
   * @example 1.23 million
   * */
  'metric_value',
  /**
   * @description other indicator value 其他指标值
   * @example
   * */
  'other_metric_value',
  /**
   * @description contribution ratio 贡献度
   * @example 23%
   * */
  'contribute_ratio',
  /**
   * @description delate value 变化值
   * @example -1.2
   * */
  'delta_value',
  /**
   * @description ratio value 变化率
   * @example +23%
   * */
  'ratio_value',
  /**
   * @description trend description 趋势描述
   * @example up/down
   * */
  'trend_desc',
  /**
   * @description dimension value 维值
   * @example sex = man
   * */
  'dim_value',
  /**
   * @description time description 时间描述
   * @example 2021-11-19
   * */
  'time_desc',
  /**
   * @description proportion 占比
   * @example 20%
   * */
  'proportion',
] as const;

type EntityType = typeof EntityType[number];

type EntityMetaData = {
  /**
   * entity type, 实体类型标记
   * */
  entityType: EntityType;
  /**
   * assessment up or down, used for derived value
   * 衍生指标评估参数，指定上涨或者下跌
   * */
  assessment?: ValueAssessment;
  /**
   * original data, 原始数据
   * */
  origin?: number;
  /**
   * detail data, 明细数据，用于弹框展示
   */
  detail?: unknown;
};
```

## 样例数据

```json | pure
{
  "sections": [
    {
      "paragraphs": [
        {
          "type": "normal",
          "phrases": [
            {
              "type": "text",
              "value": "This quarter, "
            },
            {
              "type": "entity",
              "value": "bookings",
              "metadata": {
                "entityType": "metric_name"
              }
            },
            {
              "type": "text",
              "value": " "
            },
            {
              "type": "text",
              "value": "are higher than usual for this point in the quarter. "
            },
            {
              "type": "text",
              "value": "They are "
            },
            {
              "type": "entity",
              "value": "$348k",
              "metadata": {
                "entityType": "metric_value"
              }
            },
            {
              "type": "text",
              "value": ". "
            },
            {
              "type": "text",
              "value": "They were made up of "
            },
            {
              "type": "entity",
              "value": "29 deals",
              "metadata": {
                "entityType": "metric_value"
              }
            },
            {
              "type": "text",
              "value": ", "
            },
            {
              "type": "text",
              "value": "with the "
            },
            {
              "type": "entity",
              "value": "average deal size",
              "metadata": {
                "entityType": "metric_name"
              }
            },
            {
              "type": "text",
              "value": " "
            },
            {
              "type": "text",
              "value": "being "
            },
            {
              "type": "entity",
              "value": "$12k",
              "metadata": {
                "entityType": "metric_value"
              }
            },
            {
              "type": "text",
              "value": "."
            }
          ]
        },
        {
          "type": "normal",
          "phrases": [
            {
              "type": "entity",
              "value": "Bookings ",
              "metadata": {
                "entityType": "metric_name"
              }
            },
            {
              "type": "text",
              "value": " "
            },
            {
              "type": "text",
              "value": "are up "
            },
            {
              "type": "entity",
              "value": "$180.3k",
              "metadata": {
                "entityType": "delta_value",
                "assessment": "positive"
              }
            },
            {
              "type": "text",
              "value": " "
            },
            {
              "type": "text",
              "value": "relative to the same time last quarter. "
            },
            {
              "type": "text",
              "value": "They are up "
            },
            {
              "type": "entity",
              "value": "$106.1k",
              "metadata": {
                "entityType": "delta_value",
                "assessment": "positive"
              }
            },
            {
              "type": "text",
              "value": " "
            },
            {
              "type": "text",
              "value": "relative to the same time last year. "
            },
            {
              "type": "text",
              "value": "They are "
            },
            {
              "type": "entity",
              "value": "$110k",
              "metadata": {
                "entityType": "metric_value"
              }
            },
            {
              "type": "text",
              "value": " ("
            },
            {
              "type": "entity",
              "value": "46.2%",
              "metadata": {
                "entityType": "contribute_ratio"
              }
            },
            {
              "type": "text",
              "value": ") "
            },
            {
              "type": "text",
              "value": "greater than average bookings at the same time each quarter over the previous year. "
            }
          ]
        },
        {
          "type": "normal",
          "phrases": [
            {
              "type": "text",
              "value": "Looking across the most relevant dimensions, "
            },
            {
              "type": "text",
              "value": "the "
            },
            {
              "type": "entity",
              "value": "increase",
              "metadata": {
                "entityType": "trend_desc",
                "detail": [1, 2, 6, 18, 24, 48]
              }
            },
            {
              "type": "text",
              "value": " relative to the same time last quarter was primarily driven by"
            }
          ]
        },
        {
          "type": "bullets",
          "isOrder": false,
          "bullets": [
            {
              "type": "bullet-item",
              "phrases": [
                {
                  "type": "text",
                  "value": "the "
                },
                {
                  "type": "entity",
                  "value": "Prospecting",
                  "metadata": {
                    "entityType": "dim_value"
                  }
                },
                {
                  "type": "text",
                  "value": " "
                },
                {
                  "type": "text",
                  "value": "lead source"
                },
                {
                  "type": "text",
                  "value": " ("
                },
                {
                  "type": "entity",
                  "value": "$50.6k",
                  "metadata": {
                    "entityType": "delta_value",
                    "assessment": "positive"
                  }
                },
                {
                  "type": "text",
                  "value": ") "
                },
                {
                  "type": "custom",
                  "value": "See all lead sources.",
                  "metadata": {
                    "interaction": "click",
                    "show": "modal",
                    "tableId": "0xx1"
                  }
                }
              ],
              "subBullet": {
                "type": "bullets",
                "isOrder": true,
                "bullets": [
                  {
                    "type": "bullet-item",
                    "phrases": [
                      {
                        "type": "text",
                        "value": "sub node 1"
                      }
                    ],
                    "subBullet": {
                      "type": "bullets",
                      "isOrder": false,
                      "bullets": [
                        {
                          "type": "bullet-item",
                          "phrases": [
                            {
                              "type": "text",
                              "value": "sub node 1.1, the proportion percentage is "
                            },
                            {
                              "type": "entity",
                              "value": "45%",
                              "metadata": {
                                "entityType": "proportion"
                              }
                            }
                          ]
                        },
                        {
                          "type": "bullet-item",
                          "phrases": [
                            {
                              "type": "text",
                              "value": "sub node 1.2, the proportion percentage is "
                            },
                            {
                              "type": "entity",
                              "value": "65%",
                              "metadata": {
                                "entityType": "proportion"
                              }
                            }
                          ]
                        }
                      ]
                    }
                  },
                  {
                    "type": "bullet-item",
                    "phrases": [
                      {
                        "type": "text",
                        "value": "sub node 2"
                      }
                    ]
                  }
                ]
              }
            },
            {
              "type": "bullet-item",
              "phrases": [
                {
                  "type": "entity",
                  "value": "Keely Townsend",
                  "metadata": {
                    "entityType": "dim_value"
                  }
                },
                {
                  "type": "text",
                  "value": " ("
                },
                {
                  "type": "entity",
                  "value": "$86.2k",
                  "metadata": {
                    "entityType": "delta_value",
                    "assessment": "positive"
                  }
                },
                {
                  "type": "text",
                  "value": ") "
                },
                {
                  "type": "custom",
                  "value": "See all account executives",
                  "metadata": {
                    "interaction": "click",
                    "show": "modal",
                    "tableId": "0xx2"
                  }
                },
                {
                  "type": "text",
                  "value": "."
                }
              ]
            },
            {
              "type": "bullet-item",
              "phrases": [
                {
                  "type": "text",
                  "value": "the "
                },
                {
                  "type": "entity",
                  "value": "New Client",
                  "metadata": {
                    "entityType": "dim_value"
                  }
                },
                {
                  "type": "text",
                  "value": " "
                },
                {
                  "type": "text",
                  "value": "opportunity type"
                },
                {
                  "type": "text",
                  "value": " ("
                },
                {
                  "type": "entity",
                  "value": "$160.1k",
                  "metadata": {
                    "entityType": "delta_value",
                    "assessment": "positive"
                  }
                },
                {
                  "type": "text",
                  "value": ") "
                },
                {
                  "type": "custom",
                  "value": "See all opportunity types",
                  "metadata": {
                    "interaction": "click",
                    "show": "modal",
                    "tableId": "0xx3"
                  }
                },
                {
                  "type": "text",
                  "value": "."
                }
              ]
            }
          ]
        },
        {
          "type": "normal",
          "phrases": [
            {
              "type": "text",
              "value": "The "
            },
            {
              "type": "entity",
              "value": "number of deals",
              "metadata": {
                "entityType": "metric_name"
              }
            },
            {
              "type": "text",
              "value": " ("
            },
            {
              "type": "entity",
              "value": "29",
              "metadata": {
                "entityType": "metric_value"
              }
            },
            {
              "type": "text",
              "value": ") "
            },
            {
              "type": "text",
              "value": "is up "
            },
            {
              "type": "entity",
              "value": "17",
              "metadata": {
                "entityType": "delta_value",
                "assessment": "positive"
              }
            },
            {
              "type": "text",
              "value": " "
            },
            {
              "type": "text",
              "value": "relative to the same time last quarter"
            },
            {
              "type": "text",
              "value": " ("
            },
            {
              "type": "entity",
              "value": "12",
              "metadata": {
                "entityType": "metric_value"
              }
            },
            {
              "type": "text",
              "value": ") "
            },
            {
              "type": "text",
              "value": ". "
            }
          ]
        },
        {
          "type": "normal",
          "phrases": [
            {
              "type": "text",
              "value": "The "
            },
            {
              "type": "entity",
              "value": "average deal size",
              "metadata": {
                "entityType": "metric_name"
              }
            },
            {
              "type": "text",
              "value": " ("
            },
            {
              "type": "entity",
              "value": "$12k",
              "metadata": {
                "entityType": "metric_value"
              }
            },
            {
              "type": "text",
              "value": ") "
            },
            {
              "type": "text",
              "value": "is down "
            },
            {
              "type": "entity",
              "value": "$2k",
              "metadata": {
                "entityType": "delta_value",
                "assessment": "negative"
              }
            },
            {
              "type": "text",
              "value": " "
            },
            {
              "type": "text",
              "value": "relative to the same time last quarter"
            },
            {
              "type": "text",
              "value": " ("
            },
            {
              "type": "entity",
              "value": "$14k",
              "metadata": {
                "entityType": "metric_value"
              }
            },
            {
              "type": "text",
              "value": ") "
            },
            {
              "type": "text",
              "value": ". "
            }
          ]
        }
      ]
    }
  ],
  "headline": {
    "type": "headline",
    "phrases": [
      {
        "type": "text",
        "value": "Bookings This Quarter Higher than Usual"
      }
    ]
  }
}
```

## 未来规划

当前解读文本是通过文档型 json 结构描述的，之后会扩展陆续支持以下描述能力：
- {模版}+{变量}
- markdown
- ...
