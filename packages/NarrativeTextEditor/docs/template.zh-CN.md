---
title: Template Editor
order: 1
group:
  path: /example
  title: 使用示例
  order: 1
nav:
  title: 解读编辑器
  path: /editor
  order: 2
---

# Template Editor

## 使用场景

模版编辑器屏蔽了自定义元素扩展，默认提供了 / 唤起插入 narrative-text-vis 短语的操作，可用于编辑模版与变量的关系。

## 示例

### 通过"/"插入变量

配置 `variableMap` 之后，可以通过“/”变量唤起变量列表，选择输入。

```jsx
import React, { useState } from 'react';
import { message, Form, Input, Space } from 'antd';
import { CopyOutlined, MinusCircleOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';
import { remove } from 'lodash';
import { NarrativeTextEditor, ELEMENT_VARIABLE } from '@antv/narrative-text-editor';

const initialValue = [
  { "type":"h1","children":[{"text":"业务月报"}, {"text":""}] },
  {
    "type":"p", 
    "children":[
      {"text":"数据表现："},
      {"type":ELEMENT_VARIABLE,"children":[{"text":""}],"value":"DAU","metadata":{"entityType":"metric_name"},"key":"主指标"},
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
      <NarrativeTextEditor.Template
        id="variable"
        onChange={onChange}
        initialValue={initialValue}
        variableMap={variableMap}
      />
    </>
  )
};
```

### 单行简单模式

用于配置模版段落。

```jsx
import React, { useRef } from 'react';
import { Button } from 'antd';
import { NarrativeTextEditor, ELEMENT_VARIABLE } from '@antv/narrative-text-editor';

const initialVariableMap = {
  "startDate": { value: '2022.03', metadata: { entityType: 'time_desc' } },
  "endDate": { value: '2022.04', metadata: { entityType: 'time_desc' } },
  "主指标": { value: 'DAU', metadata: { entityType: 'metric_name' } },
  "指标值": { value: '1.23亿', metadata: { entityType: 'metric_value' } },
}

const initialValue = [
  {
    "type":"p", 
    "children":[
      {"text":"数据表现："},
      {"type":ELEMENT_VARIABLE,"children":[{"text":""}],"value":"DAU","metadata":{"entityType":"metric_name"},"key":"主指标"},
      {"text":""},
    ]
  }
];

export default () => {
  const editorRef = useRef();
  const handleReset = () => {
    editorRef?.current?.setValue(initialValue);
  }
  return (
    <>
      <Button onClick={handleReset}>重置</Button>
      <NarrativeTextEditor.Template
        id="singleLine"
        ref={editorRef}
        initialValue={initialValue}
        variableMap={initialVariableMap}
        singleLine
        showHeadingToolbar={false}
        showHoveringToolbar={false}
        draggable={false}
      />
    </>
  )
};
```
