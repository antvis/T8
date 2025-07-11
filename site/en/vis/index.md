---
title: Quick Start
---

`@antv/narrative-text-vis` is a React component library that consumes [text-schema](../../schema/intro) to implement data interpretation text rendering. Import it as follows:

```js | pure
import {
  NarrativeTextVis,
  Paragraph,
  Phrase,
  // ...
} from '@antv/narrative-text-vis';
```

The package includes:

- Main narrative text component `NarrativeTextVis`
- Various narrative structures `Section`, `Paragraph`, and `Phrase`
- Full export of [text-schema](../../schema/intro)

## Show Case

```jsx
import React from 'react';
import { NarrativeTextVis } from '@antv/narrative-text-vis';
import booking from './mock/booking.json';

export default () => <NarrativeTextVis spec={booking} />;
```

For more detailed API and examples, see [Basic Styles and API](./example/style).
