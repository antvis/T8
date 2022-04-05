import React from 'react';
import { Plate, ELEMENT_PARAGRAPH } from '@udecode/plate';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import getPlugins from './plugins';
import HeadingToolbar from './components/HeadingToolbar';
import BallonToolbar from './components/HoveringToolbar';

import type { NarrativeTextEditorProps } from './types';

const safeSlateValue = [{ type: ELEMENT_PARAGRAPH, children: [{ text: '' }] }];

export const NarrativeTextEditor: React.FC<NarrativeTextEditorProps> = ({ id, initialValue, onChange }) => (
  <DndProvider backend={HTML5Backend}>
    <Plate
      id={id}
      initialValue={initialValue ?? safeSlateValue}
      onChange={onChange}
      editableProps={{
        autoFocus: false,
        spellCheck: false,
      }}
      plugins={getPlugins()}
    >
      <HeadingToolbar />
      <BallonToolbar />
    </Plate>
  </DndProvider>
);
