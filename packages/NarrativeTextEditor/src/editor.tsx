import React from 'react';
import { Plate } from '@udecode/plate-core';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';

import { NarrativeTextEditorProps } from './types';
import getPlugins, { VariableCombobox } from './plugins';
import HeadingToolbar from './toolbar/HeadingToolbar';
import HoveringToolbar from './toolbar/HoveringToolbar';
import { transferComboboxItemData } from './helpers';

import 'tippy.js/dist/tippy.css';

const safeSlateValue = [{ type: ELEMENT_PARAGRAPH, children: [{ text: '' }] }];

export const NarrativeTextEditor: React.FC<NarrativeTextEditorProps> = ({
  id,
  initialValue,
  onChange,
  style,
  variableMap,
}) => (
  <Plate
    id={id}
    initialValue={initialValue ?? safeSlateValue}
    onChange={onChange}
    editableProps={{
      autoFocus: false,
      spellCheck: false,
      style: {
        fontFamily: 'PingFangSC, sans-serif',
        ...style,
      },
    }}
    plugins={getPlugins()}
  >
    <HeadingToolbar />
    <HoveringToolbar />
    <VariableCombobox items={transferComboboxItemData(variableMap)} />
  </Plate>
);
