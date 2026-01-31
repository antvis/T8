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

## 📚 文档

- **[快速开始](https://t8.antv.vision/tutorial/quick-start.html)** - 几分钟内开始使用 T8，包含安装和基本使用示例
- **[教程](https://t8.antv.vision/tutorial/quick-start)** - 学习主题、事件、插件、流式渲染和 LLM 集成
- **[语法](https://t8.antv.vision/syntax/)** - 完整的 T8 语法参考和结构指南
- **[API 文档](https://t8.antv.vision/api/)** - 详细的 API 文档和使用指南

## ✨ Features

- 🛫 **前端技术栈无关** - 可以在 `React`, `Vue` 或者其他的前端框架中使用，并非常易于封装成组件。
- 🤖 **大语言模型友好** - T8 的 Markdown `Syntax` 描述，近通过简单的提示词，就可以非常容易被大语言模型理解和生成。
- 🛠️ **可扩展** - 可以通过 `EntityPhrase` 来快速的自定义 T8 文本展示的样式。
- 🪩 **轻量级** - 很少的、轻量的依赖，并在代码设计中关注包大小，压缩后小于 `20` Kb。

## 🔨 安装

使用 npm 或 yarn 安装 T8：

```bash
npm install @antv/t8
```

```bash
yarn add @antv/t8
```

## 🚀 快速示例

```js
import { Text } from '@antv/t8';

const text = new Text({ container: 'container' });
text.theme('light').render(`
  # 销售报告
  总销售额达到 [¥1,234,567](metric_value, origin=1234567)。
`);
```

完整的使用示例和高级功能，请参见 **[快速开始指南](https://t8.antv.vision/tutorial/quick-start.html)**。

## 🤖 在大模型中使用

T8 被设计为对大语言模型友好。T8 语法可以轻松地由 AI 模型生成，使其成为自动化数据叙述生成的理想选择。为了帮助您将 T8 与 AI Agent 集成：

- **[提示词模板](./prompt.zh-CN.md)** - 可直接使用的 LLM 提示词，用于生成 T8 语法
- **[LLM 集成指南](https://t8.antv.vision/tutorial/advanced/llm.html)** - 使用 T8 与大语言模型的完整指南
- **[示例](./example/example.md)** - T8 语法输出示例

## 📮 Contributing

很期待我们的用户参入到 T8 的开发和反馈，也感谢所有贡献这个项目的开源社区开发者。🙏

- [Issues](https://github.com/antvis/t8/issues) - 报告 Bug 或者提交 Pull Request
- [Discussions](https://github.com/antvis/t8/discussions) - 在 GitHub 讨论区讨论想法

## 📄 License

MIT@[AntV](https://github.com/antvis).
