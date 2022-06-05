---
title: 升级指南
order: 1
group:
  path: /intro
  title: 介绍
  order: 0
nav:
  title: 解读文本可视化
  path: /narrative
  order: 1
---

感谢您的使用，目前 `@antv/narrative-text-vis` 仍在 0.x 阶段，minor 版本稳定。ChangeLog 主要描述 minor 版本升级方式，暂不记录 patch 版本变更内容。

## 0.2.x => 0.3.x

- \[移除\] `NarrativeTextSpec` `ParagraphSpec` `SectionSpec` 类型以及 `NarrativeTextVis` `Section` `Paragraph` 组件不再需要指定泛型，由 plugin 创建的时候指定；
- \[变更\] `CustomBlock` 与 `CustomPhrase['metadata']` 规范类型一致，`customType` 必传，用于指定自定义 plugin key；
- \[变更\] 废弃 `customEntityEncoding` `customPhraseRender` 和 `customBlockElementRender`，改为 `pluginManager` 实现自定义扩展；
- \[变更\] 废弃 `getNarrativeText` `getSectionText` 和 `getParagraphText`，改为 `TextExporter` 获得导出文本内容；
- \[新增\] 各类元素判断函数，eg `isTextParagraph` `isBulletParagraph` `isStandardSection`...


## 0.1.x => 0.2.x

- \[变更\] 所有 Spec 相关类型，从 IXxx 变为 XxxSpec，如 `ISection` => `SectionSpec`;
- \[新增\] 增加 size props 用于指定文本字体大小，默认 `'normal'` 为 14px，`'small'` 为 12px;
- \[移除\] 0.2.x 已全部升级为 css-in-js 方案，移除了样式文件的打包，不再额外单独引用样式；
