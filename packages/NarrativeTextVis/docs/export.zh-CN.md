---
title: 导出
order: 5
group:
  path: /example
  title: 使用示例
  order: 1
nav:
  title: 解读文本可视化
  path: /narrative
  order: 1
---

## 导出纯文本

`TextExporter` 默认参数与 `PluginManager` 一致，可通过制定 plugin descriptor 中的 getText 定义复制行为。

同时，通过 `onCopyByKeyboard` 可以监听文本范围刷选复制的事件。

```jsx
import React from 'react';
import { Space, Button, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';
import { NarrativeTextVis, TextExporter, createRatioValue, createDeltaValue } from '@antv/narrative-text-vis';
import booking from './mock/booking.json';

const exporter = new TextExporter();

function getSignAssessmentText(value, metadata) {
  if (metadata?.assessment === 'negative') return `-${value}`
  return `${metadata?.assessment === 'positive'? '+': ''}${value}`;
}

const exportWithSign = new TextExporter([
  createRatioValue({ getText: getSignAssessmentText }),
  createDeltaValue({ getText: getSignAssessmentText }),
]);

export default () => {
  return (
    <>
      <Space>
        <Button 
          type="primary"
          icon={<CopyOutlined/>} 
          onClick={() => {
            const res = copy(exporter.getNarrativeText(booking));
            if (res) message.success('复制成功');
          }}
        >复制默认文本</Button>
        <Button 
          icon={<CopyOutlined/>} 
          onClick={() => {
            const res = copy(exportWithSign.getNarrativeText(booking));
            if (res) message.success('复制成功');
          }}
        >复制带正号的文本</Button>
      </Space>
      <NarrativeTextVis 
        spec={booking} 
        onCopyByKeyboard={() => {
          message.info('通过 Ctrl+C 复制成功');
        }} 
      />
    </>
  )
}
```

## 导出 Markdown

在`TextExporter`中调用`getNarrativeMarkdown()`即可导出Markdown文本。类似的，可通过定制 plugin descriptor 中的 getMarkdown 定义复制行为。

```jsx
import React from 'react';
import { Space, Button, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';
import { NarrativeTextVis, TextExporter, createRatioValue, createDeltaValue } from '@antv/narrative-text-vis';
import sample from './mock/markdownSample.json';

function getSignAssessmentText(value, metadata) {
  if (metadata?.assessment === 'negative') return `-${value}`
  return `${metadata?.assessment === 'positive'? '+': ''}${value}`;
}

const exportMarkdown = new TextExporter();

const exportMarkdownWithSign = new TextExporter([
  createRatioValue({ getMarkdown: getSignAssessmentText }),
  createDeltaValue({ getMarkdown: getSignAssessmentText }),
]);

export default () => {
  return (
    <>
      <Space>
        <Button 
          type="primary"
          icon={<CopyOutlined/>} 
          onClick={() => {
            const res = copy(exportMarkdown.getNarrativeMarkdown(sample));
            if (res) message.success('复制成功');
          }}
        >复制默认Markdown</Button>
        <Button 
          icon={<CopyOutlined/>} 
          onClick={() => {
            const res = copy(exportMarkdownWithSign.getNarrativeMarkdown(sample));
            if (res) message.success('复制成功');
          }}
        >复制带正号Markdown</Button>
      </Space>
      <NarrativeTextVis spec={sample} />
    </>
  )
}
```

## 导出富文本
施工中...
