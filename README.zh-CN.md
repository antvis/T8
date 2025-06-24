<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> [English](./README.md) | 简体中文

<h1 align="center">
<b>🧬 T8：文本数据可视化</b>
</h1>

<div align="center">

`T8` 是 AntV 技术栈下针对非结构化数据得文本可视化解决方案，其中 `T` 代表 Text，`8` 代表一个字节 8 bits，寓意这个工具可以深度透视文本底下的洞察。

![gzip size](https://img.badgesize.io/https://unpkg.com/@antv/t8/dist/t8.min.js?compression=gzip)
[![Build Status](https://github.com/antvis/t8/actions/workflows/build.yml/badge.svg)](https://github.com/antvis/T8/actions/workflows/build.yml)
[![npm Version](https://img.shields.io/npm/v/@antv/t8.svg)](https://www.npmjs.com/package/@antv/t8)
[![npm License](https://img.shields.io/npm/l/@antv/t8.svg)](https://www.npmjs.com/package/@antv/t8)

<img alt="T8 examples dark" width="768" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*eGSkRauCayYAAAAAT4AAAAgAemJ7AQ/fmt.avif" />
</div>

T8 是一套声明式的 JSON Schema 语法，可以用它描述数据解读报告的内容。技术方案上，基于 JSON Schema 数据来自服务端生成的假设，前端消费 Schema 进行渲染即可。随着数据表达的多样性和即时性的要求越来越高，以及 AI、NLP 技术越来越多的被应用，前端维护文本模版将不可持续，此时使用 T8 进行统一渲染将是最佳选择。

- [Introduction]() - 一个关于 T8 的概要介绍和想法。
- [Example]() - 一个可运行的演示案例，并结合 AI 进行展示和可视化。
- [Tutorials]() - 关于 T8 的核心 API 用法和原理介绍。

## ✨ Features

- 🛫 **前端技术栈无关** - 可以在 `React`, `Vue` 或者其他的前端框架中使用，并非常易于封装成组件。
- 🤖 **大语言模型友好** - T8 的 JSON Schema 描述，近通过简单的提示词，就可以非常容易被大语言模型理解和生成。
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

// 待可视化的 schema
const schema = {
  /*  */
};

// 实例化 Text
const text = new Text({
  container: 'container',
});

// 指定可视化元素
text.schema(schema).theme('dark');

// 渲染
const unmont = text.render();

// 销毁
unmont();
```

如果没有遇到其他问题的话，你就可以获得以下的数据清晰的文本可视化效果了。

<img alt="T8 examples light" width="768" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*GDPUToCi8ncAAAAATrAAAAgAemJ7AQ/fmt.webp" />

## 📮 Contributing

很期待我们的用户参入到 T8 的开发和反馈，也感谢所有贡献这个项目的开源社区开发者。🙏

- [Issues](https://github.com/antvis/t8/issues) - 报告 Bug 或者提交 Pull Request
- [Discussions](https://github.com/antvis/t8/discussions) - 在 GitHub 讨论区讨论想法

## 📄 License

MIT@[AntV](https://github.com/antvis).
