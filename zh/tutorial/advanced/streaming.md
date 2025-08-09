---
url: /zh/tutorial/advanced/streaming.md
---

# 流式输出

在某些场景下，你可能希望以流式或增量的方式渲染叙述文本，比如从服务端分片接收数据，或模拟实时更新。T8 提供了便捷的 API：`text.streamRender`。

## 什么时候需要流式输出？

* **实时数据**：如 WebSocket、SSE 等场景，数据到达即展示。
* **渐进式体验**：让用户即时看到部分结果。
* **AI 对话与内容生成**：在 AI 对话、智能问答、AI 写作等场景下，后端大模型通常会分批返回文本片段。通过流式渲染，用户可以实时看到 AI 的生成过程，极大提升交互体验。

## T8 的流式原理

`Text` 类暴露了 `streamRender` 方法，可以不断追加 JSON 片段并增量更新可视化。内部采用流式 JSON 解析器，支持不完整或分块数据。

## 流式渲染事例

```typescript
import { Text } from 't8';
import spec from './example.json';

const app = document.getElementById('app');
const text = new Text(app!);
text.theme('dark');

// 工具函数：延迟指定毫秒
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 模拟流式数据
async function streamingRender() {
  const value = JSON.stringify(spec, null, 2).split('\n');
  for (let i = 0; i < value.length; i++) {
    await delay(Math.random() * 30 + 20); // 模拟网络延迟
    text.streamRender(value[i]);
  }
}

streamingRender().then(() => {
  console.log('All data processed.');
});
```

::: my-sandbox {template=vanilla-ts}

```ts index.ts
import { Text } from '@antv/t8';
import spec from './example.json';

const app = document.getElementById('app');
const text = new Text(app!);

// Utility: delay for a given ms
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Mock streaming data
async function streamingRender() {
  const value = JSON.stringify(spec, null, 2).split('\n');
  for (let i = 0; i < value.length; i++) {
    await delay(Math.random() * 30 + 20); // Simulate network latency
    text.streamRender(value[i]);
  }
}

streamingRender().then(() => {
  console.log('All data processed.');
});
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

## API 参考

* `text.streamRender(newJSONFragment: string, options?: { onError?: (error: string) => void; onComplete?: (result: T8ClarinetParseResult) => void; })`
  * 附加 JSON 片段并尝试解析/更新可视化效果。
  * 如果解析失败，则调用 `onError`；如果解析到有效文档，则调用 `onComplete`。
* `text.clear()`
  * 重置内部解析器并清除可视化效果。
