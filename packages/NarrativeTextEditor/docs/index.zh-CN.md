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
    initialValue={[{ type: 'p', children: [{ text: 'init' }] }]}
  />
);
```

### 受控组件

TODO

```jsx
/**
 * debug: true
 */
import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { NarrativeTextEditor } from '@antv/narrative-text-editor';

export default () => {
  const [value, onChange] = useState();
  const handleReset = () => {
    onChange([{ type: 'p', children: [{text: 'reset'}]}])
  }
  return (
    <>
      <Button onClick={handleReset}>重置</Button>
      <NarrativeTextEditor
        id="controlled"
        Value={value}
        onChange={onChange}
      />
    </>
  );
}
```

### 通过"/"插入变量

配置 `variableMap` 之后，可以通过“/”变量唤起变量列表，选择输入。

```jsx
import React, { useState } from 'react';
import { message, Form, Input, Space } from 'antd';
import { CopyOutlined, MinusCircleOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';
import { remove } from 'lodash';
import { NarrativeTextEditor } from '@antv/narrative-text-editor';

const initialValue = [
  { "type":"h1","children":[{"text":"业务月报"}, {"text":""}] },
  {
    "type":"p", 
    "children":[
      {"text":"数据表现："},
      {"type":"variable","children":[{"text":""}],"value":"DAU","metadata":{"entityType":"metric_name"},"key":"主指标"},
      {"text":""},
    ]
  }
];

const initialVariableMap = {
  "startDate": { value: '2022.03', metadata: { entityType: 'time_desc' } },
  "endDate": { value: '2022.04', metadata: { entityType: 'time_desc' } },
  "主指标": { value: 'DAU', metadata: { entityType: 'metric_name' } },
  "指标值": { value: '1.23亿', metadata: { entityType: 'metric_value' } },
}

export default () => {
  const [value, onChange] = useState(initialValue);
  const [keys, setKeys] = useState(Object.keys(initialVariableMap));
  const [variableMap, setVariableMap] = useState(initialVariableMap);
  const onCopy = () => {
    const r = copy(JSON.stringify(value));
    if (r) message.success('复制成功');
  }
  const handleChangeVarText = (key, newVal) => {
    setVariableMap({...variableMap, [key]: { ...variableMap[key], value: newVal } })
  }
  const handleRemoveKey = (key) => {
    setKeys(remove(keys, item => item !== key ));
    const newVariableMap = { ...variableMap };
    delete newVariableMap[key];
    console.log('newVariableMap: ', newVariableMap);
    setVariableMap(newVariableMap);
  }
  return (
    <>
      <p>复制到剪切板：<CopyOutlined onClick={onCopy} style={{ cursor: 'pointer' }} /></p>
      <Form layout="inline">
        {keys.map(key => (
          <Form.Item label={key} key={key}>
            <Input style={{ width: '80%' }} value={variableMap[key].value} onChange={e => { handleChangeVarText(key, e.target.value) }} /> &ensp;
            <MinusCircleOutlined style={{ cursor: 'pointer' }} onClick={() => { handleRemoveKey(key) }} />
          </Form.Item>
        ))}
      </Form>
      <NarrativeTextEditor
        id="variable"
        onChange={onChange}
        initialValue={initialValue}
        variableMap={variableMap} 
      />
    </>
  )
};
```

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

### 是否只读

只读不允许编辑，且各种工具栏交互都将移除。

```jsx
import React, { useState } from 'react';
import { Form, Switch } from 'antd';
import { NarrativeTextEditor } from '@antv/narrative-text-editor';

export default () => {
  const [readOnly, setReadOnly] = useState(false);
  return (
    <>
      <Form layout="inline">
        <Form.Item label="是否只读">
          <Switch checked={readOnly} onChange={setReadOnly} />
        </Form.Item>
      </Form>
      <NarrativeTextEditor 
        id="readOnly" 
        readOnly={readOnly}  
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
