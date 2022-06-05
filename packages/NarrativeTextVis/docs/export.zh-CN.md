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

```jsx
import React from 'react';
import { Space, Button, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';
import { NarrativeTextVis, TextExporter, createRatioValue, createDeltaValue } from '@antv/narrative-text-vis';
import booking from './mock/booking.json';

const exporter = new TextExporter();

function getSignAssessmentText(value, metadata) {
  return `${metadata?.assessment === 'negative' ? '-' : metadata?.assessment === 'positive'? '+': ''}${value}`;
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
      <NarrativeTextVis spec={booking} />
    </>
  )
}
```

## 导出 md
施工中...

## 导出富文本
施工中...
