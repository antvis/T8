---
title: 解读编辑器
order: 0
group:
  path: /example
  title: 使用示例
  order: 0
nav:
  title: 解读编辑器
  path: /editor
  order: 2
---

# 解读编辑器


## 示例

### 非受控组件

通过 `initialValue` 指定初始值，并通过 onChange 收集当前变化值

```jsx
import React from 'react';
import { NarrativeTextEditor } from '@antv/narrative-text-editor';

export default () => (
  <NarrativeTextEditor
    id="uncontrolled"
    variableMap={{
      "startDate": { value: '2022.03', metadata: { entityType: 'time_desc' } },
      "endDate": { value: '2022.04', metadata: { entityType: 'time_desc' } },
      "主指标": { value: 'DAU', metadata: { entityType: 'metric_name' } },
      "指标值": { value: '1.23亿', metadata: { entityType: 'metric_value' } },
    }} 
  />
);
```

### 受控组件

TODO

### 是否显示工具栏

当前工具栏有两种，一种是顶部的工具栏，另一种是通过刷选文本出现在刷选范围上的快捷操作工具栏，都可以通过属性配置是否显示。

```jsx
import React, { useState } from 'react';
import { Form, Switch } from 'antd';
import { NarrativeTextEditor } from '@antv/narrative-text-editor';

export default () => {
  const [showHeadingToolbar, setShowHeadingToolbar] = useState(true);
  const [showHoveringToolbar, setShowHoveringToolbar] = useState(true);
  return (
    <>
      <Form layout="inline">
        <Form.Item label="是否显示顶部导航栏">
          <Switch checked={showHeadingToolbar} onChange={setShowHeadingToolbar} />
        </Form.Item>
        <Form.Item label="是否显示刷选导航栏">
          <Switch checked={showHoveringToolbar} onChange={setShowHoveringToolbar} />
        </Form.Item>
      </Form>
      <NarrativeTextEditor 
        id="toolbar" 
        showHeadingToolbar={showHeadingToolbar} 
        showHoveringToolbar={showHoveringToolbar} 
        style={{
          border: '1px solid #ccc',
          padding: '4px'
        }}
      />
    </>
  )
};
```

<API src="../src/editor.tsx" />
