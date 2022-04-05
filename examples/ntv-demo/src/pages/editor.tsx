import React, { useState } from 'react';
import { NarrativeTextEditor } from '@antv/narrative-text-editor';

import AnchorLayout from '../components/AnchorLayout';
import ContentBlock from '../components/ContentBlock';
import HighlightCode from '../components/HighlightCode';
import JsonPreview from '../components/JsonPreview';
import getAnchors from '../utils/get-anchors';
import editor from '../data/editor.json';

const anchors = getAnchors('basic', ['playground', 'basic']);

export default function EditorPage() {
  const [value, setValue] = useState([{ type: 'p', children: [{ text: '' }] }]);
  return (
    <AnchorLayout anchorLinks={anchors}>
      <ContentBlock id={anchors[0].id} title={anchors[0].title}>
        <NarrativeTextEditor id="playground" initialValue={editor} />
        <HighlightCode
          langType="tsx"
          code={`<NarrativeTextEditor id="playground" initialValue={editor} />`}
        />
      </ContentBlock>
      <ContentBlock id={anchors[1].id} title={anchors[1].title}>
        <JsonPreview json={value}>
          <NarrativeTextEditor
            id="basic"
            initialValue={value}
            onChange={setValue}
          />
        </JsonPreview>
        <HighlightCode
          langType="tsx"
          code={`<NarrativeTextEditor id="basic" initialValue={value} onChange={setValue} />`}
        />
      </ContentBlock>
    </AnchorLayout>
  );
}
