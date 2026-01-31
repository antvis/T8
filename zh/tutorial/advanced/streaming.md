---
url: /zh/tutorial/advanced/streaming.md
---

# 流式输出

在某些场景下，你可能希望以流式或增量的方式渲染叙述文本，比如从服务端分片接收数据，或模拟实时更新。使用简化后的 T8 API，你可以通过多次调用 `text.render()` 并传入更新后的 T8 语法字符串来实现。

## 什么时候需要流式输出？

* **实时数据**：如 WebSocket、SSE 等场景，数据到达即展示。
* **渐进式体验**：让用户即时看到部分结果。
* **AI 对话与内容生成**：在 AI 对话、智能问答、AI 写作等场景下，后端大模型通常会分批返回文本片段。通过流式渲染，用户可以实时看到 AI 的生成过程，极大提升交互体验。

## T8 的流式原理

`Text` 类的 `render` 方法可以被多次调用，每次传入逐步完整的 T8 语法字符串。每次调用都会用更新的内容重新渲染可视化，创造流式效果。

## 流式渲染示例

```typescript
import { Text } from '@antv/t8';

const app = document.getElementById('app');
const text = new Text(app!);
text.theme('dark');

// 工具函数：延迟指定毫秒
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 将被逐步构建的 T8 语法字符串
const fullSyntax = `
# 销售报告

本季度 [销售额](metric_name) 高于往常。销售额为 [¥348k](metric_value, origin=348.12)。

[销售额](metric_name) 相比上季度同期上涨了 [¥180.3k](delta_value, assessment="positive")。
`;

// 通过逐步展示内容来模拟流式数据
async function streamingRender() {
  const step = 10; // 每步展示的字符数
  for (let i = 0; i <= fullSyntax.length; i += step) {
    await delay(50); // 模拟网络延迟
    const chunk = fullSyntax.slice(0, i);
    text.render(chunk);
  }
}

streamingRender().then(() => {
  console.log('所有数据已渲染。');
});
```

::: my-sandbox {template=vanilla-ts}

```ts index.ts
import { Text } from '@antv/t8';

const app = document.getElementById('app');
const text = new Text(app!);
text.theme('light');

// 工具函数：延迟指定毫秒
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 将被逐步构建的 T8 语法字符串
const fullSyntax = `
# 本季度销售额高于往常

本季度 [销售额](metric_name) 高于往常。销售额为 [¥348k](metric_value, origin=348.12)。共完成了 [29 笔交易](metric_value)，[平均交易额](metric_name) 为 [¥12k](metric_value)。

[销售额](metric_name) 相比上季度同期上涨了 [¥180.3k](delta_value, assessment="positive")。相比去年同期上涨了 [¥106.1k](delta_value, assessment="positive")。
`;

// 通过逐步展示内容来模拟流式数据
async function streamingRender() {
  const step = 10; // 每步展示的字符数
  for (let i = 0; i <= fullSyntax.length; i += step) {
    await delay(50); // 模拟网络延迟
    const chunk = fullSyntax.slice(0, i);
    text.render(chunk);
  }
}

streamingRender().then(() => {
  console.log('所有数据已渲染。');
});
```

:::

## API 参考

* `text.render(content?: string | NarrativeTextSpec)`
  * 使用提供的 T8 语法字符串或 NarrativeTextSpec 对象渲染可视化。
  * 可以多次调用以增量更新可视化。
  * 解析错误将被优雅处理并记录到控制台。
* `text.clear()`
  * 通过卸载来清除可视化。
