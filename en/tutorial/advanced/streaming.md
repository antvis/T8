---
url: /en/tutorial/advanced/streaming.md
---

# Streaming Output

In some scenarios, you may want to render narrative text in a streaming or incremental fashion, such as when receiving data from a server in chunks or simulating real-time updates. With the simplified T8 API, you can achieve this by repeatedly calling `text.render()` with updated T8 syntax strings.

## When to Use Streaming Output?

* **Real-time data**: Display content as it arrives, e.g., from a WebSocket or server-sent events.
* **Progressive user experience**: Let users see partial results immediately.
* **AI chat and content generation**: In AI scenarios (such as LLM chatbots, smart Q\&A, or AI writing), the backend model often returns text in chunks. Streaming rendering allows users to see the AI's response as it is being generated, greatly improving the interactive experience.

## How Streaming Works in T8

The `Text` class's `render` method can be called multiple times with progressively complete T8 syntax strings. Each call will re-render the visualization with the updated content, creating a streaming effect.

## Example for Streaming Render

```typescript
import { Text } from '@antv/t8';

const app = document.getElementById('app');
const text = new Text(app!);
text.theme('dark');

// Utility: delay for a given ms
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// T8 syntax string that will be built incrementally
const fullSyntax = `
# Sales Report

This quarter, [bookings](metric_name) are higher than usual. They are [¥348k](metric_value, origin=348.12).

[Bookings](metric_name) are up [¥180.3k](delta_value, assessment="positive") relative to the same time last quarter.
`;

// Mock streaming data by revealing content gradually
async function streamingRender() {
  const step = 10; // Characters to reveal per step
  for (let i = 0; i <= fullSyntax.length; i += step) {
    await delay(50); // Simulate network latency
    const chunk = fullSyntax.slice(0, i);
    text.render(chunk);
  }
}

streamingRender().then(() => {
  console.log('All data rendered.');
});
```

::: my-sandbox {template=vanilla-ts}

```ts index.ts
import { Text } from '@antv/t8';

const app = document.getElementById('app');
const text = new Text(app!);
text.theme('light');

// Utility: delay for a given ms
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// T8 syntax string that will be built incrementally
const fullSyntax = `
# Bookings This Quarter Higher than Usual

This quarter, [bookings](metric_name) are higher than usual for this point in the quarter. They are [¥348k](metric_value, origin=348.12). They were made up of [29 deals](metric_value), with the [average deal size](metric_name) being [¥12k](metric_value).

[Bookings](metric_name) are up [¥180.3k](delta_value, assessment="positive") relative to the same time last quarter. They are up [¥106.1k](delta_value, assessment="positive") relative to the same time last year.
`;

// Mock streaming data by revealing content gradually
async function streamingRender() {
  const step = 10; // Characters to reveal per step
  for (let i = 0; i <= fullSyntax.length; i += step) {
    await delay(50); // Simulate network latency
    const chunk = fullSyntax.slice(0, i);
    text.render(chunk);
  }
}

streamingRender().then(() => {
  console.log('All data rendered.');
});
```

:::

## API Reference

* `text.render(content?: string | NarrativeTextSpec)`
  * Renders the visualization with the provided T8 syntax string or NarrativeTextSpec object.
  * Can be called multiple times to update the visualization incrementally.
  * Parsing errors are handled gracefully and logged to console.
* `text.clear()`
  * Clears the visualization by unmounting it.
