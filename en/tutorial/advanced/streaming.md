---
url: /en/tutorial/advanced/streaming.md
---

# Streaming Output

In some scenarios, you may want to render narrative text in a streaming or incremental fashion, such as when receiving data from a server in chunks or simulating real-time updates. The T8 library provides a convenient API for this: `text.streamRender`.

## When to Use Streaming Output?

* **Real-time data**: Display content as it arrives, e.g., from a WebSocket or server-sent events.
* **Progressive user experience**: Let users see partial results immediately.
* **AI chat and content generation**: In AI scenarios (such as LLM chatbots, smart Q\&A, or AI writing), the backend model often returns text in chunks. Streaming rendering allows users to see the AI's response as it is being generated, greatly improving the interactive experience.

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

## API Reference

* `text.streamRender(newJSONFragment: string, options?: { onError?: (error: string) => void; onComplete?: (result: T8ClarinetParseResult) => void; })`
  * Appends a JSON fragment and tries to parse/update the visualization.
  * Calls `onError` if parsing fails, or `onComplete` if a valid document is parsed.
* `text.clear()`
  * Resets the internal parser and clears the visualization.
