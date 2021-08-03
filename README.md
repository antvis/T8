# T8

Text Visualization

> WIP: 这个仓库是为了文本可视化方向预设的。目前我们在文本可视化的细分领域：基于洞察解读的 Narrative Text Vis 方面已经有了一定程度的积累，所以先预设这个仓库，在这里研发。
>
> T8 的命名故事是：T 代表 Text，8 代表一个字节 8 bits，寓意这个工具可以深度透视文本底下的洞察。（当然了，这个名字目前还是暂定的，后面有更好的想法还可以随时修改仓库名，让子弹飞一会儿。）

## 如何开发

```shell
# 全局安装 yarn 和 lerna 工具
$ npm install yarn -g
$ npm install lerna -g

# 安装项目依赖和初始化构建
$ yarn
$ yarn boot

# 启动 demo 页面进行调试
$ yarn start:demo
```

执行完以上命令，将打开 `examples/ntv-demo` 页面，如果热更新失效，可以试试手动删除 .umi folder（我也不知道为啥 umi 会卡死 🤷‍♀️）

## Todo List

- Chore

  - [x] lerna init
  - [x] lint (eslint, prettier, commitlint, stylelint)
  - [x] tsconfig
  - [x] husky & lint-staged
  - [x] build
  - [x] live demo
  - [ ] jest test
  - [ ] publish
  - [ ] site & mdlint

- Render

  - [x] text-schema
  - [x] `<NarrativeTextVis />` skeleton
  - [x] feat: basic render
  - [ ] feat: nested-bullets
  - [ ] feat: theme switch
  - [ ] default theme with editor
  - [ ] text-schema generator scripts
  - [ ] feat: sparkline
  - [ ] ...

- Interaction

  - [ ] text-schema with interactive
  - [ ] feat: tooltip
  - [ ] feat: popover
  - [ ] ...

- RichEditor

  - [x] `<TextTemplateEditor />` skeleton
  - [ ] adaptor textSpec to slate
    - [x] basic structure
    - [x] paragraph
    - [ ] bullets, includes nested-bullets
  - [ ] adaptor slate to textSpec
    - [x] paragraph
    - [ ] bullets, includes nested-bullets
  - [ ] block edit
    - [ ] ...
  - [ ] inline edit
    - [x] add or delete text 
    - [x] style
    - [ ] ...
  - [ ] editor config extensible (used for analysis report)
  - [ ] support md language
  - [ ] ...

## Show Cases

### 🌟 Analysis Report

How to use `<NarrativeTextVis />` and `<TextTemplateEditor />` in an analysis report generator system.

  - [ ] basic UI
  - [ ] config 
  - [ ] ...
