---
title: Streaming Output
---

# Streaming Output

In some scenarios, you may want to render narrative text in a streaming or incremental fashion, such as when receiving data from a server in chunks or simulating real-time updates. The T8 library provides a convenient API for this: `text.streamRender`.

## When to Use Streaming Output?

- **Real-time data**: Display content as it arrives, e.g., from a WebSocket or server-sent events.
- **Progressive user experience**: Let users see partial results immediately.
- **AI chat and content generation**: In AI scenarios (such as LLM chatbots, smart Q&A, or AI writing), the backend model often returns text in chunks. Streaming rendering allows users to see the AI's response as it is being generated, greatly improving the interactive experience.

## How Streaming Works in T8

The `Text` class exposes a `streamRender` method, which allows you to append JSON fragments and incrementally update the visualization. Internally, it uses a streaming JSON parser to handle incomplete or chunked data.

## Example for Streaming Render

```typescript
import { Text } from 't8';
import spec from './example.json';

const app = document.getElementById('app');
const text = new Text(app!);
text.theme('dark');

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

## API Reference

- `text.streamRender(newJSONFragment: string, options?: { onError?: (error: string) => void; onComplete?: (result: T8ClarinetParseResult) => void; })`
  - Appends a JSON fragment and tries to parse/update the visualization.
  - Calls `onError` if parsing fails, or `onComplete` if a valid document is parsed.
- `text.clear()`
  - Resets the internal parser and clears the visualization.
