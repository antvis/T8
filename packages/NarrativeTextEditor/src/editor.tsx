import React, { CSSProperties } from 'react';
import { Plate, TDescendant } from '@udecode/plate-core';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';

import getPlugins from './plugins';
import HeadingToolbar from './components/HeadingToolbar';
import HoveringToolbar from './components/HoveringToolbar';

export interface NarrativeTextEditorProps {
  /** plate editor key, must unique */
  id: string;
  /** editor value change */
  onChange: (val: TDescendant[]) => void;
  /** slate value */
  initialValue?: TDescendant[];
  /** editor inline style */
  style?: CSSProperties;
}

const safeSlateValue = [{ type: ELEMENT_PARAGRAPH, children: [{ text: '' }] }];

export const NarrativeTextEditor: React.FC<NarrativeTextEditorProps> = ({ id, initialValue, onChange, style }) => (
  <Plate
    id={id}
    initialValue={initialValue ?? safeSlateValue}
    onChange={onChange}
    editableProps={{
      autoFocus: false,
      spellCheck: false,
      style,
    }}
    plugins={getPlugins()}
  >
    <HeadingToolbar />
    <HoveringToolbar />
  </Plate>
);
