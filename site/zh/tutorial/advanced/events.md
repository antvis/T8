---
title: 事件监听
order: 3
group:
  title: 高级用法
  order: 2
nav:
  title: 教程
  path: /tutorial
  order: 1
---

# 事件监听

T8 提供了完整的事件系统，允许你监听和响应文本可视化中的各种交互事件。

## 事件类型

T8 支持以下几种级别的事件：

1. 叙事文本事件 (`narrative:*`)
2. 段落区块事件 (`section:*`)
3. 段落事件 (`paragraph:*`)
4. 短语事件 (`phrase:*`)

## 基础用法

使用 `on` 方法来注册事件监听器：

```ts
const text = new Text('#container');

// 监听短语点击事件
text.on('phrase:click', (spec) => {
  console.log('短语被点击：', spec);
});

// 监听段落点击事件
text.on('paragraph:click', (spec) => {
  console.log('段落被点击：', spec);
});

// 监听区块点击事件
text.on('section:click', (spec) => {
  console.log('区块被点击：', spec);
});

// 监听整个叙事文本的点击事件
text.on('narrative:click', (spec) => {
  console.log('叙事文本被点击：', spec);
});
```

## 事件参数

每个事件处理函数都会收到一个事件参数对象，包含了与事件相关的详细信息：

```ts
text.on('phrase:click', (spec) => {
  const {
    type, // 事件类型
    value, // 短语的值
    metadata, // 相关元数据
    // ... 其他属性
  } = spec;

  // 处理事件
});
```

## 事件解绑

你可以使用 `off` 方法来移除事件监听器：

```ts
// 定义事件处理函数
const handleClick = (spec) => {
  console.log('点击事件：', spec);
};

// 注册事件
text.on('phrase:click', handleClick);

// 移除特定的事件监听器
text.off('phrase:click', handleClick);

// 移除某个事件类型的所有监听器
text.off('phrase:click');

// 移除所有事件监听器
text.off();
```

## 事件冒泡

T8 的事件系统支持事件冒泡机制，事件会从最具体的元素开始，向上传播到更一般的元素：

```ts
text.on('phrase:click', (spec) => {
  console.log('1. 短语被点击');
});

text.on('paragraph:click', (spec) => {
  console.log('2. 段落被点击');
});

text.on('section:click', (spec) => {
  console.log('3. 区块被点击');
});

text.on('narrative:click', (spec) => {
  console.log('4. 叙事文本被点击');
});

// 当点击一个短语时，上述所有事件处理函数都会按顺序执行
```
