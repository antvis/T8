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

## API 参考

* `text.streamRender(newJSONFragment: string, options?: { onError?: (error: string) => void; onComplete?: (result: T8ClarinetParseResult) => void; })`
  * 附加 JSON 片段并尝试解析/更新可视化效果。
  * 如果解析失败，则调用 `onError`；如果解析到有效文档，则调用 `onComplete`。
* `text.clear()`
  * 重置内部解析器并清除可视化效果。
