---
title: Quick Start
---

# Quick Start

## What is T8

> T8 is a text visualization solution under the AntV technology stack, where T stands for Text and 8 stands for 8 bits, implying that this tool can deeply see the insights under the text.

Currently, it is mainly committed to the sub-area: **Insight-based interpretation text (narrative-text) display and editing capabilities**.

<div class="info-box">

**_`text-schema` is expensive to build and is not as fast as directly splicing DOM. Why should I use T8? _**

To answer this question, we need to first clarify where `JSON` comes from?

Narrative-related technologies are based on the assumption that `JSON` data is generated from the LLM large model, and the front-end consumes schema for rendering. With the increasing requirements for diversity and immediacy of data expression, and the increasing application of NLP technology, it will be unsustainable for the front-end to maintain text templates. At this time, using NarrativeTextVis for unified rendering will be the best choice.

However, it is undeniable that there will still be a long period of time when similar text expressions can be met by one or several default templates. Combined with the learning cost of `text-schema`, it seems to be a better choice to use `dom/jsx` that is familiar to the front end for development. <u>_If your business does not require high scalability of text expressions and the templates are relatively fixed, please use the syntax you are familiar with. _</u> However, if text-schema is used, it will bring the following benefits:

- As a standard description for interpreting text, it can statically define the text data structure and maintain it in one place for reuse;

- The `JSON` format determines that it is conducive to data storage and further consumption;

- Standard style, good-looking by default;

- Inline small pictures (word-scale chart) are supported by default, and more inline data displays can be obtained with version upgrades;

- Scalability of related interactions;

</div>

## Usage scenarios

In the display of the entire process of data analysis, in addition to visual charts, it is also very important to describe data phenomena through **text** and give insights and conclusions to assist analysis.

Especially with the development of enhanced analysis technology, the data text description directly output by NLP (natural language processing) requires a rendering engine to present it in the user interface. The narrative-text related technical solution is a solution for this scenario.

## Features

- Standard description json schema of data interpretation text ([narrative-text-schema](../schema/index.html));
- Pure JS rendering engine [Text](../narrative/index.html) of text-schema;
- Parse text structure description json schema into html;
- Standard visual representation of data phrases (such as indicator values, ratios, differences, proportions, contributions, etc.);
- Data-driven display of inline mini-pictures (mini pie, mini line) to improve text reading efficiency;

## Basic use

T8 can be installed using conventional package management tools, such as npm or Yarn.

```bash
$ npm install @antv/t8
```

```bash
$ yarn add @antv/t8
```

After installation, in the T8 library, you can export the `Text` object and API.

```html
<div id="container"></div>
```

```js
import { Text } from '@antv/t8';

// Schema to be visualized
const schema = {
  /* */
};

// Instantiate Text
const text = new Text({
  container: 'container',
});

// Specify visualization element
text.schema(schema).theme('dark');

// Rendering
const unmont = text.render();

// Destruction
unmont();
```

If there are no other problems, you can get the following data clear text visualization effect.

<img alt="T8 examples light" width="768" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*GDPUToCi8ncAAAAATrAAAAgAemJ7AQ/fmt.webp" />

<style>
.info-box { 
padding: 12px; 
background-color: #646cff24; 
border-radius: 8px;
}
</style>
