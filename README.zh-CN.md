<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> [English](./README.md) | 简体中文

<h1 align="center">
<b>🧬 T8：文本数据可视化</b>
</h1>

<div align="center">

`T8` 是 AntV 技术栈下针对非结构化数据得文本可视化解决方案，其中 `T` 代表 Text，`8` 代表一个字节 8 bits，寓意这个工具可以深度透视文本底下的洞察。

![gzip size](https://img.badgesize.io/https://unpkg.com/@antv/t8/dist/t8.min?compression=gzip)
[![Build Status](https://github.com/antvis/t8/actions/workflows/build.yml/badge.svg)](https://github.com/antvis/T8/actions/workflows/build.yml)
[![codecov](https://codecov.io/gh/antvis/T8/graph/badge.svg?token=A8fR9pUkbc)](https://codecov.io/gh/antvis/T8)
[![npm Version](https://img.shields.io/npm/v/@antv/t8.svg)](https://www.npmjs.com/package/@antv/t8)
[![npm License](https://img.shields.io/npm/l/@antv/t8.svg)](https://www.npmjs.com/package/@antv/t8)

<video src="https://github.com/user-attachments/assets/ecf953a9-efd1-4c72-9d12-d84316004b88" />
</div>

`T8` 是一套声明式的 Markdown `Syntax` 语法，可以用它描述数据解读报告的内容。技术方案上，基于 Markdown `Syntax` 数据来自服务端生成的假设，前端消费 Syntax 进行渲染即可。随着数据表达的多样性和即时性的要求越来越高，以及 AI、NLP 技术越来越多的被应用，前端维护文本模版将不可持续，此时使用 T8 进行统一渲染将是最佳选择。

- [Introduction](https://t8.antv.vision/tutorial/quick-start.html) - 一个关于 T8 的概要介绍和想法，以及如何使用。
- [T8's Schema](https://t8.antv.vision/schema/) - T8 的 schema 介绍和描述.
- [API](https://t8.antv.vision/api/) - 介绍 T8 的 API 接口，以及如何使用他们。
- [Example]() - 一个使用 T8 的可运行的 Agent 应用，并结合 AI 进行展示和可视化。

## ✨ Features

- 🛫 **前端技术栈无关** - 可以在 `React`, `Vue` 或者其他的前端框架中使用，并非常易于封装成组件。
- 🤖 **大语言模型友好** - T8 的 Markdown `Syntax` 描述，近通过简单的提示词，就可以非常容易被大语言模型理解和生成。
- 🛠️ **可扩展** - 可以通过 `EntityPhrase` 来快速的自定义 T8 文本展示的样式。
- 🪩 **轻量级** - 很少的、轻量的依赖，并在代码设计中关注包大小，压缩后小于 `20` Kb。

## 🔨 Getting Started

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

总销售额达到 [¥1,234,567](metric_value, origin=1234567)。

## 各地区表现

华东地区贡献最大，销售额为 [¥800,000](metric_value)，占比 [64.8%](contribute_ratio, assessment="positive")。
`;

// 实例化 Text
const text = new Text({
  container: 'container',
});

// 使用 render 方法传入 T8 语法字符串
text.theme('dark').render(narrativeText);

// 卸载
const unmount = text.render(narrativeText);
unmount();
```

如果没有遇到其他问题的话，你就可以获得以下的数据清晰的文本可视化效果了。

<img alt="T8 examples preview" width="768" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*u8U8To8YM4UAAAAAT_AAAAgAemJ7AQ/fmt.webp" />

## 🤖 在大模型中使用

T8 可以用来对于特定的文本输出成符合要求的 `schema`，然后渲染出更加易于阅读的文本，而对于文本的处理是大模型 LLM 的核心优势之一。为了帮助大家更好的使用 T8，我们提供了一系列的内容，方便大家在自己的 Agent 中快速生成和渲染文本信息简报。

1. 面向 LLM 的提示词模版，见 [prompt.md](./prompt.md) 和 [prompt.zh-CN.md](./prompt.zh-CN.md)。
2. 一些案例：[案例](./example/example.md)。
3. 一个基于百宝箱的 Agent 案例：数据文本简报。

欢迎大家在自己的 AI Agent 中使用后，给出反馈和优化建议。

## 📮 Contributing

很期待我们的用户参入到 T8 的开发和反馈，也感谢所有贡献这个项目的开源社区开发者。🙏

- [Issues](https://github.com/antvis/t8/issues) - 报告 Bug 或者提交 Pull Request
- [Discussions](https://github.com/antvis/t8/discussions) - 在 GitHub 讨论区讨论想法

## 📄 License

MIT@[AntV](https://github.com/antvis).
