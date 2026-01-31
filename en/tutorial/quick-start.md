---
url: /en/tutorial/quick-start.md
---

# Quick Start

## What is T8

> T8 is a text visualization solution under the AntV technology stack, where T stands for Text, and 8 represents a byte of 8 bits, implying that this tool can deeply analyze insights beneath the text.

Currently, it mainly focuses on a specific area: **Insight-based narrative text display and editing capabilities**.

***"The cost of building `text-schema` is high, why should I use T8 instead of directly concatenating DOM?"***

To answer this question, we need to first clarify where the `JSON` comes from.

Narrative-related technology is based on the assumption that `JSON` data comes from LLM (Large Language Models), and the frontend consumes the schema for rendering. As the requirements for data expression diversity and real-time response increase, and NLP technology is increasingly applied, maintaining text templates on the frontend will become unsustainable. At this point, using NarrativeTextVis for unified rendering will be the best choice.

However, it's undeniable that for quite some time, similar text expressions can be satisfied with one or several default templates. Considering the learning cost of `text-schema`, using familiar `dom/jsx` for development might seem like a better choice. *If your business has low requirements for text expression extensibility and relatively fixed templates, please use the syntax you're familiar with.* However, using text-schema will bring the following benefits:

* As a standard description for interpretive text, it can staticize text data structure, maintain in one place and reuse everywhere;
* The `JSON` format makes it conducive to data storage and further consumption;
* Standardized styling, looks good by default;
* Word-scale charts are supported by default, and more inline data displays can be obtained with version upgrades;
* Extensibility of related interactions;

## Usage Scenarios

In the full process of data analysis display, besides visualization charts, describing data phenomena and providing insight conclusions through **text** to assist analysis is also very important.

Especially with the development of augmented analytics, the data text descriptions directly output with the help of NLP (Natural Language Processing) need a rendering engine to present them in the user interface. Narrative-text related technical solutions are aimed at solving this scenario.

## Features

* Standardized JSON schema description for data interpretation text ([narrative-text-schema](../schema/index.md));
* Pure JS rendering engine `Text` for text-schema;
  * Parse text structure description JSON schema into HTML;
  * Standard visual representation of data phrases (such as metric values, ratios, differences, proportions, contribution rates, etc.);
  * Data-driven display of inline charts (mini pie, mini line) to improve text reading efficiency;

## Basic Usage

T8 can be installed using regular package management tools such as npm or Yarn.

```bash
$ npm install @antv/t8
```

```bash
$ yarn add @antv/t8
```

After installation, you can export the `Text` object and API from the T8 library.

```html
<div id="container"></div>
```

```js
import { Text } from '@antv/t8';

// Narrative text using T8-DSL syntax
const narrativeText = `
# Sales Report

This quarter, [bookings](metric_name) are higher than usual. They are [¥348k](metric_value, origin=348.12).

[Bookings](metric_name) are up [¥180.3k](delta_value, assessment="positive") relative to the same time last quarter.
`;

// Instantiate Text
const text = new Text(document.getElementById('app'));

// Specify narrative text using syntax method
text.syntax(narrativeText).theme('dark');

// Render
const unmont = text.render();

// Destroy
unmont();
```

If you haven't encountered any other issues, you should get the following clear data text visualization effect.

You can also use the T8-DSL syntax for a more intuitive way to create narrative text:

::: my-sandbox {template=vanilla-ts}

```ts index.ts
import { Text } from '@antv/t8';

// Narrative text using T8-DSL syntax
const narrativeText = `
# Bookings This Quarter Higher than Usual

This quarter, [bookings](metric_name) are higher than usual for this point in the quarter. They are [¥348k](metric_value, origin=348.12). They were made up of [29 deals](metric_value), with the [average deal size](metric_name) being [¥12k](metric_value).

[Bookings](metric_name) are up [¥180.3k](delta_value, assessment="positive") relative to the same time last quarter. They are up [¥106.1k](delta_value, assessment="positive") relative to the same time last year.
`;

// Instantiate Text
const text = new Text(document.getElementById('app'));

// Use syntax method to specify narrative text
text.syntax(narrativeText).theme('light');

// Render
text.render();
```

:::

::: my-sandbox {template=vanilla-ts}

```ts index.ts
import { Text } from '@antv/t8';
import spec from './example.json';

// Instantiate Text
const text = new Text(document.getElementById('app'));

// Specify visualization elements
text.schema(spec).theme('light');

// Render
text.render();
```

```json example.json
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
                "entityType": "metric_value",
                "origin": 348.12
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
                                "entityType": "proportion",
                                "origin": 0.45
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

:::
