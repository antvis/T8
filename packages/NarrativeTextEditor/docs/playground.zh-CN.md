---
title: Playground
order: 2
group:
  path: /example
  title: 使用示例
  order: 1
nav:
  title: 解读编辑器
  path: /editor
  order: 3
---

# Playground

```jsx
import React from 'react';
import { NarrativeTextEditor } from '@antv/narrative-text-editor';
import editor from './mock/editor.json';

export default () => (
  <NarrativeTextEditor id="playground" initialValue={editor} style={{ height: 480 }} />
);
```
