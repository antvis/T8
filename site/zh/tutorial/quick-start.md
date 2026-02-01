---
title: 快速开始
---

# 快速开始

## T8 是什么

> T8 是 AntV 技术栈下文本可视化解决方案，其中 T 代表 Text，8 代表一个字节 8 bits，寓意这个工具可以深度透视文本底下的洞察。

当前主要致力于细分领域：**基于洞察的解读文本（narrative-text）展示及编辑能力**。

<div class="info-box">

**_"为什么我应该使用 T8 而不是直接拼接 DOM？"_**

答案在于 T8 的**声明式语法** - 这是其与众不同的核心特性。

T8 语法是一种轻量级的、基于 Markdown 的 DSL（领域特定语言），专为叙述性文本可视化设计。无需手动构建 DOM 元素或维护复杂的模板，你只需编写简单、易读的语法来描述你的数据叙述。这种语法可以轻松地由 LLM（大语言模型）生成，使其非常适合 AI 驱动的分析和自动化报告。

随着数据表达需求变得越来越多样化和即时，在前端维护文本模板变得不可持续。T8 的语法优先方法为动态、AI 生成的内容提供了更好的解决方案。

<u>_如果你的业务有简单、固定的模板，扩展性需求有限，传统的 DOM 操作可能就足够了。_</u> 然而，T8 的语法带来了显著的优势：

- **对 LLM 友好**：语法直观，可以通过简单的提示轻松由 AI 模型生成；
- **声明式和可读性强**：编写你想要的内容，而不是如何构建它 - 语法本身就是文档；
- **标准化样式**：默认提供专业、一致的外观，无需手动样式设置；
- **内置数据可视化**：词级图表（迷你饼图、迷你折线图）是语法原生支持的；
- **框架无关**：与 React、Vue 或纯 JavaScript 无缝协作；
- **可扩展**：轻松添加自定义实体短语以匹配你的设计系统；

</div>

## 使用场景

在数据分析全流程展示上，除了可视化图表外，通过**文本**描述数据现象、给出洞察结论辅助分析，也十分重要。

尤其随着增强分析技术的发展，借助 NLP（自然语言处理）直接输出的数据文本描述需要渲染引擎将其呈现在用户界面。narrative-text 相关技术方案就是针对该场景的解决方案。

## 特性

- **T8 语法**：一种用于数据叙述性文本的声明式、基于 Markdown 的 DSL（[T8 语法参考](../syntax/index.md)）；
- **纯 JS 渲染引擎** `Text`：将 T8 语法转换为美观、交互式的 HTML；
  - 将 T8 语法结构解析为语义化的 HTML 元素；
  - 数据短语（如指标值、比率、差值、占比、贡献度等）的标准视觉表示；
  - 数据驱动的行内小图（迷你饼图、迷你折线图）提高文本阅读效率；

## 基本使用

T8 可以使用常规的包管理工具安装，例如 npm 或者 Yarn 等。

```bash
$ npm install @antv/t8
```

```bash
$ yarn add @antv/t8
```

安装之后，在 T8 这个库中，就可以导出 `Text` 对象和 API。

```html
<div id="container"></div>
```

```js
import { Text } from '@antv/t8';

// 使用 T8-DSL 语法编写的叙述性文本
const narrativeText = `
# 销售报告

本季度 [销售额](metric_name) 高于往常。销售额为 [¥348k](metric_value, origin=348.12)。

[销售额](metric_name) 相比上季度同期上涨了 [¥180.3k](delta_value, assessment="positive")。
`;

// 实例化 Text
const text = new Text(document.getElementById('app'));

// 使用 render 方法传入 T8 语法字符串
text.theme('dark').render(narrativeText);

// 卸载
const unmount = text.render(narrativeText);
unmount();
```

如果没有遇到其他问题的话，你就可以获得以下的数据清晰的文本可视化效果了。

你也可以使用 T8-DSL 语法，这是一种更直观的创建叙述性文本的方式：

::: my-sandbox {template=vanilla-ts}

```ts index.ts
import { Text } from '@antv/t8';

// 使用 T8-DSL 语法编写的叙述性文本
const narrativeText = `
# 本季度销售额高于往常

本季度 [销售额](metric_name) 高于往常。销售额为 [¥348k](metric_value, origin=348.12)。共完成了 [29 笔交易](metric_value)，[平均交易额](metric_name) 为 [¥12k](metric_value)。

[销售额](metric_name) 相比上季度同期上涨了 [¥180.3k](delta_value, assessment="positive")。相比去年同期上涨了 [¥106.1k](delta_value, assessment="positive")。
`;

// 实例化 Text
const text = new Text(document.getElementById('app'));

// 使用 render 方法传入 T8 语法字符串
text.theme('light').render(narrativeText);
```

:::

## 在 HTML 中使用（通过 CDN）

T8 可以通过 unpkg CDN 直接在 HTML 页面中使用。这是最简单的入门方式，无需任何构建工具：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>T8 示例</title>
</head>
<body>
  <div id="container"></div>

  <!-- 从 unpkg CDN 引入 T8 -->
  <script src="https://unpkg.com/@antv/t8@0.3.0/dist/t8.min.js"></script>
  
  <script>
    // T8 作为全局变量可用
    const { Text } = window.T8;

    // 初始化 T8 实例
    const text = new Text(document.getElementById('container'));

    // 渲染叙述性文本
    const narrativeText = `
# 销售报告

本季度 [销售额](metric_name) 高于往常。销售额为 [¥348k](metric_value, origin=348.12)。

[销售额](metric_name) 相比上季度同期上涨了 [¥180.3k](delta_value, assessment="positive")。
    `;

    text.theme('light').render(narrativeText);
  </script>
</body>
</html>
```

您也可以通过省略版本号来使用最新版本：

```html
<script src="https://unpkg.com/@antv/t8/dist/t8.min.js"></script>
```

## 在 React 中使用

T8 是框架无关的，可以无缝集成到 React 中。以下是集成方法：

```tsx
import { Text } from '@antv/t8';
import { useEffect, useRef } from 'react';

function T8Component() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 初始化 T8 实例
    const text = new Text(containerRef.current);

    // 渲染叙述性文本
    const narrativeText = `
# 销售报告

本季度 [销售额](metric_name) 高于往常。销售额为 [¥348k](metric_value, origin=348.12)。

[销售额](metric_name) 相比上季度同期上涨了 [¥180.3k](delta_value, assessment="positive")。
    `;

    text.theme('light').render(narrativeText);

    // 组件卸载时清理
    return () => {
      text.unmount();
    };
  }, []);

  return <div ref={containerRef} />;
}

export default T8Component;
```

## 在 Vue 中使用

T8 同样适用于 Vue。以下是 Vue 3 示例：

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

  // 初始化 T8 实例
  textInstance = new Text(containerRef.value);

  // 渲染叙述性文本
  const narrativeText = `
# 销售报告

本季度 [销售额](metric_name) 高于往常。销售额为 [¥348k](metric_value, origin=348.12)。

[销售额](metric_name) 相比上季度同期上涨了 [¥180.3k](delta_value, assessment="positive")。
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

对于 Vue 2，可以使用选项式 API：

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
    // 初始化 T8 实例
    this.textInstance = new Text(this.$refs.container);

    // 渲染叙述性文本
    const narrativeText = `
# 销售报告

本季度 [销售额](metric_name) 高于往常。销售额为 [¥348k](metric_value, origin=348.12)。

[销售额](metric_name) 相比上季度同期上涨了 [¥180.3k](delta_value, assessment="positive")。
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
