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
    initialValue={[
      { 
        type: 'p', 
        children: [
          { text: 'init ' },
          { type: 'a', url: 'https://antv.vision/', children: [{ text: 'AntV' }] },
          { text: '' },
        ],
        id: 0
      }
    ]}
  />
);
```

### 通过 editorRef 更新 value

```jsx
import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
import { NarrativeTextEditor } from '@antv/narrative-text-editor';

const initialValue = [{ type: 'p', children: [{ text: 'input something...' }] }]

export default () => {
  const editorRef = useRef();
  const changeValue = () => {
    editorRef?.current?.setValue([{ type: 'p', children: [{text: `${Date.now()}`}]}])
  }
  return (
    <>
      <Button onClick={changeValue}>写入当前时间戳</Button>
      <NarrativeTextEditor
        id="controlled"
        ref={editorRef}
        initialValue={initialValue}
      />
    </>
  );
}
```

### 自定义扩展

通过扩展自定义块级元素和自定义行内元素，会生成不可编辑的元素，可获取 element data 及 onChange 改变事件，元素内状态自理，数据将通过 onChange 记录到 editor data 中。

```jsx
import React, { useState } from 'react';
import { Drawer, Button, Input, Popover } from 'antd';
import { PieChartOutlined, EditOutlined, CheckOutlined, NumberOutlined } from '@ant-design/icons';
import { NarrativeTextEditor, CustomBlockToolbarButton, CustomInlineToolbarButton  } from '@antv/narrative-text-editor';

// 自定义行内元素
const ELEMENT_VARIABLE = 'var';
const CustomVariable = ({ selected, focused, element, onChange }) => {
  const [value, setValue] = useState(element?.data);
  const onConfirm = () => {
    onChange({ data: value });
  };
  return (
    <Popover 
      placement="bottomLeft" 
      content={
        <>
          <Input value={value} onChange={e => setValue(e.target.value)} />
          <CheckOutlined onClick={onConfirm} />
        </>
      }
    >
      <span style={{ 
        padding: 4,
        margin: 4,
        backgroundColor:  selected & focused? "rgb(211 194 234)" : "#efefef",
      }}>
        {element?.data || '...'}
      </span>
    </Popover>
  )
}

// 自定义块级元素
const ELEMENT_CHART = 'chart';
const CustomChart = ({ selected, focused, element, onChange }) => {
  const [value, setValue] = useState(element?.data);
  const [visible, setVisible] = useState(false);
  const onConfirm = () => {
    setVisible(false);
    onChange({ data: value });
  };
  return (
    <div 
      style={{ 
        border: `1px solid ${selected & focused? "#873bf4" : "#efefef"}`, 
        borderRadius: 4, margin: '2px 0', padding: 12  
      }}
    >
      {element?.data}
      <EditOutlined onClick={() => setVisible(true)} />
      <Drawer 
        title="设置图表信息"
        visible={visible}
        placement="bottom"
        extra={
          <Button type="primary" onClick={onConfirm}>
            确定
          </Button>
        }
        onClose={() => setVisible(false)}
      >
        <Input value={value} onChange={e => setValue(e.target.value)} />
      </Drawer>
    </div>
  );
};

export default () => {
  return (
    <NarrativeTextEditor 
      id="custom"
      initialValue={[
        { type: 'h2', children: [{ text: '本季度业绩突出' }], id: 1 },
        { type: 'p', 
          children: [
            { text: '近一周 xxx 业绩' },
            { text: '' },
            { type: ELEMENT_VARIABLE, children: [{ text: '' }], data: "1.23",  },
            { text: '' },
          ],
          id: 2
        },
        { type: ELEMENT_CHART, children: [{ text: '' }], data: 'line', id: 3 },
        { type: 'p', children: [{ text: '' }], id: 4 },
      ]}
      plugins={[
        {
          key: ELEMENT_VARIABLE,
          component: CustomVariable,
          isInline: true,
        },
        {
          key: ELEMENT_CHART,
          component: CustomChart,
          isInline: false,
        }
      ]}
      showHeadingToolbar={{
        toolbarExtraContent: (
          <>
            <CustomInlineToolbarButton 
              type={ELEMENT_VARIABLE} 
              icon={<Button size='small' style={{ marginRight: 8 }} icon={<NumberOutlined />}>变量</Button>} 
            />
            <CustomBlockToolbarButton 
              type={ELEMENT_CHART} 
              icon={<Button size='small' icon={<PieChartOutlined />}>图表</Button>} 
            />
          </>
        )
      }} 
    />)
}
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

### 取消可拖拽

配置 `draggable` `false` 取消默认快级元素拖拽行为。

```jsx
import React from 'react';
import { NarrativeTextEditor } from '@antv/narrative-text-editor';

export default () => {
  return (
    <>
      <NarrativeTextEditor 
        id="draggable" 
        draggable={false} 
      />
    </>
  )
};
```

### Placeholder

配置 `placeholders` 做空状态下行级元素占位配置。

```jsx
import React from 'react';
import { NarrativeTextEditor } from '@antv/narrative-text-editor';

export default () => {
  return (
    <>
      <NarrativeTextEditor 
        id="placeholder" 
        placeholders={[
          {
            key: 'p', // 'h1' ~ 'h6', 'p', 'ul', 'ol'
            placeholder: 'Type a paragraph',
            hideOnBlur: true,
          }
        ]} 
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
        }}
      />
    </>
  )
};
```


### 国际化

默认英文， 切换成自定义语言

```jsx
import React from 'react';
import { NarrativeTextEditor, ConfigProvider, enUS } from '@antv/narrative-text-editor';
export default () => (
  <ConfigProvider locale={enUS}>
    <NarrativeTextEditor
      id="switchTozhCN"
      initialValue={[
        { 
          type: 'p', 
          children: [
            { text: 'init ' },
            { type: 'a', url: 'https://antv.vision/', children: [{ text: 'AntV' }] },
            { text: '' },
          ],
          id: 'zhcn'
        }
      ]}
    />
  </ConfigProvider>
);
```


<API src="../src/editor.tsx" />
