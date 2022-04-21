import React, { CSSProperties } from 'react';
import { Plate, TDescendant } from '@udecode/plate-core';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';

import getPlugins, { VariableCombobox } from './plugins';
import HeadingToolbar from './toolbar/HeadingToolbar';
import HoveringToolbar from './toolbar/HoveringToolbar';

import 'tippy.js/dist/tippy.css';

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
      style: {
        fontFamily: 'PingFangSC, sans-serif',
        ...style,
      },
    }}
    plugins={getPlugins()}
  >
    <HeadingToolbar />
    <HoveringToolbar />
    <VariableCombobox
      // TODO 用户传入变量配置
      items={[
        { key: '0', text: 'Aayla Secura', data: { email: 'aayla_secura@force.com' } },
        { key: '1', text: 'Adi Gallia', data: { email: 'adi_gallia@force.com' } },
      ]}
    />
  </Plate>
);
