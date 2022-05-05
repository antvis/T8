---
title: 主题
order: 2
group:
  path: /show
  title: 使用示例
  order: 0
nav:
  title: 解读文本可视化
  path: /narrative
  order: 1
---

## 通过 Size 定义主题大小

```jsx
import React, { useState } from 'react';
import { Divider, Form, Radio } from 'antd';
import { NarrativeTextVis, Section, Paragraph, Phrase } from '@antv/narrative-text-vis';
import booking from './mock/booking.json';

const sizeOptions = ['small', 'normal'].map(item => ({ label: item, value: item }))

export default () => {
  const [size, setSize] = useState('small');
  return (
    <>
      <Form.Item label="size">
        <Radio.Group
          options={sizeOptions}
          value={size}
          onChange={e => setSize(e.target.value)}
          optionType="button"
          buttonStyle="solid"
        />
      </Form.Item>
      <Divider>Narrative</Divider>
      <NarrativeTextVis size={size} spec={booking} />
      <Divider>Section</Divider>
      <Section size={size} spec={booking.sections[0]} />
      <Divider>Paragraph -- normal</Divider>
      <Paragraph size={size} spec={booking.sections[0].paragraphs[0]} />
      <Divider>Paragraph -- bullets</Divider>
      <Paragraph size={size} spec={booking.sections[0].paragraphs[3]} />
      <Divider>Phrase</Divider>
      <Phrase 
        size={size}
        spec={{
          type: 'entity',
          value: '30%',
          metadata: {
            entityType: 'proportion',
          },
        }} 
      />
    </>
  )
};
```
