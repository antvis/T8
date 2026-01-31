---
title: Quick Start
---

# Quick Start

## What is T8

> T8 is a text visualization solution under the AntV technology stack, where T stands for Text, and 8 represents a byte of 8 bits, implying that this tool can deeply analyze insights beneath the text.

Currently, it mainly focuses on a specific area: **Insight-based narrative text display and editing capabilities**.

<div class="info-box">

**_"The cost of building `text-schema` is high, why should I use T8 instead of directly concatenating DOM?"_**

To answer this question, we need to first clarify where the `JSON` comes from.

Narrative-related technology is based on the assumption that `JSON` data comes from LLM (Large Language Models), and the frontend consumes the schema for rendering. As the requirements for data expression diversity and real-time response increase, and NLP technology is increasingly applied, maintaining text templates on the frontend will become unsustainable. At this point, using NarrativeTextVis for unified rendering will be the best choice.

However, it's undeniable that for quite some time, similar text expressions can be satisfied with one or several default templates. Considering the learning cost of `text-schema`, using familiar `dom/jsx` for development might seem like a better choice. <u>_If your business has low requirements for text expression extensibility and relatively fixed templates, please use the syntax you're familiar with._</u> However, using text-schema will bring the following benefits:

- As a standard description for interpretive text, it can staticize text data structure, maintain in one place and reuse everywhere;
- The `JSON` format makes it conducive to data storage and further consumption;
- Standardized styling, looks good by default;
- Word-scale charts are supported by default, and more inline data displays can be obtained with version upgrades;
- Extensibility of related interactions;

</div>

## Usage Scenarios

In the full process of data analysis display, besides visualization charts, describing data phenomena and providing insight conclusions through **text** to assist analysis is also very important.

Especially with the development of augmented analytics, the data text descriptions directly output with the help of NLP (Natural Language Processing) need a rendering engine to present them in the user interface. Narrative-text related technical solutions are aimed at solving this scenario.

## Features

- T8 syntax description for data interpretation text ([T8 syntax reference](../syntax/index.md));
- Pure JS rendering engine `Text` for text-schema;
  - Parse text structure description JSON schema into HTML;
  - Standard visual representation of data phrases (such as metric values, ratios, differences, proportions, contribution rates, etc.);
  - Data-driven display of inline charts (mini pie, mini line) to improve text reading efficiency;

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

// Render with T8 syntax string
text.theme('dark').render(narrativeText);

// Unmount
const unmount = text.render(narrativeText);
unmount();
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

// Render with T8 syntax string
text.theme('light').render(narrativeText);
```

:::

## Using in React

T8 is framework-agnostic and works seamlessly with React. Here's how to integrate it:

```tsx
import { Text } from '@antv/t8';
import { useEffect, useRef } from 'react';

function T8Component() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize T8 instance
    const text = new Text(containerRef.current);

    // Render narrative text
    const narrativeText = `
# Sales Report

This quarter, [bookings](metric_name) are higher than usual. They are [¥348k](metric_value, origin=348.12).

[Bookings](metric_name) are up [¥180.3k](delta_value, assessment="positive") relative to the same time last quarter.
    `;

    text.theme('light').render(narrativeText);

    // Cleanup on unmount
    return () => {
      text.unmount();
    };
  }, []);

  return <div ref={containerRef} />;
}

export default T8Component;
```

## Using in Vue

T8 also works great with Vue. Here's a Vue 3 example:

```vue
<template>
  <div ref="containerRef"></div>
</template>

<script setup lang="ts">
import { Text } from '@antv/t8';
import { ref, onMounted, onBeforeUnmount } from 'vue';

const containerRef = ref<HTMLDivElement>();
let textInstance: Text | null = null;

onMounted(() => {
  if (!containerRef.value) return;

  // Initialize T8 instance
  textInstance = new Text(containerRef.value);

  // Render narrative text
  const narrativeText = `
# Sales Report

This quarter, [bookings](metric_name) are higher than usual. They are [¥348k](metric_value, origin=348.12).

[Bookings](metric_name) are up [¥180.3k](delta_value, assessment="positive") relative to the same time last quarter.
  `;

  textInstance.theme('light').render(narrativeText);
});

onBeforeUnmount(() => {
  if (textInstance) {
    textInstance.unmount();
  }
});
</script>
```

For Vue 2, you can use the Options API:

```vue
<template>
  <div ref="container"></div>
</template>

<script>
import { Text } from '@antv/t8';

export default {
  name: 'T8Component',
  data() {
    return {
      textInstance: null,
    };
  },
  mounted() {
    // Initialize T8 instance
    this.textInstance = new Text(this.$refs.container);

    // Render narrative text
    const narrativeText = `
# Sales Report

This quarter, [bookings](metric_name) are higher than usual. They are [¥348k](metric_value, origin=348.12).

[Bookings](metric_name) are up [¥180.3k](delta_value, assessment="positive") relative to the same time last quarter.
    `;

    this.textInstance.theme('light').render(narrativeText);
  },
  beforeDestroy() {
    if (this.textInstance) {
      this.textInstance.unmount();
    }
  },
};
</script>
```

<style>
.info-box {
  padding: 12px;
  background-color: #646cff24;
  border-radius: 8px;
}
</style>
