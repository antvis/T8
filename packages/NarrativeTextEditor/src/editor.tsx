import React, { CSSProperties } from 'react';
import { Plate, TDescendant, PlateStoreState, PlatePlugin } from '@udecode/plate-core';
import { isObject } from 'lodash';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { GlobalStyle } from './globalStyles';
import { safeSlateValue } from './constants';
import getPlugins from './preset-plugins';
import HeadingToolbar, { HeadingToolbarProps } from './toolbar/HeadingToolbar';
import HoveringToolbar from './toolbar/HoveringToolbar';
import { MyValue } from './types';

import 'tippy.js/dist/tippy.css';

export interface NarrativeTextEditorProps {
  /** editor key, must unique */
  id: string;

  /** uncontrolled initial value */
  initialValue?: PlateStoreState<MyValue>['value'];

  // TODO 由于 slate 升级后 value 不再作为受控组件生效，暂时不提供受控组件的使用方式
  //  https://github.com/ianstormtaylor/slate/issues/4612
  /** controlled value */
  // value?: TDescendant[];

  /** editor value change */
  onChange?: (val: TDescendant[]) => void;

  plugins?: PlatePlugin[];

  /** editor inline style */
  style?: CSSProperties;

  /** whether show heading toolbar */
  showHeadingToolbar?: boolean | HeadingToolbarProps;

  /** whether show hovering toolbar */
  showHoveringToolbar?: boolean;

  /** read only */
  readOnly?: boolean;
}

export const NarrativeTextEditor: React.FC<NarrativeTextEditorProps> = ({
  id,
  initialValue = safeSlateValue,
  plugins: extraPlugins = [],
  onChange,
  style,
  showHeadingToolbar = true,
  showHoveringToolbar = true,
  readOnly = false,
}) => {
  return (
    <>
      <GlobalStyle />
      <DndProvider backend={HTML5Backend}>
        <Plate
          id={id}
          initialValue={initialValue}
          onChange={onChange}
          editableProps={{
            autoFocus: false,
            spellCheck: false,
            readOnly,
            style: {
              fontFamily: 'PingFangSC, sans-serif',
              overflow: 'auto',
              ...style,
            },
          }}
          plugins={getPlugins(extraPlugins)}
        >
          {!readOnly && showHeadingToolbar && (
            <HeadingToolbar {...(isObject(showHeadingToolbar) ? showHeadingToolbar : {})} />
          )}
          {!readOnly && showHoveringToolbar && <HoveringToolbar />}
        </Plate>
      </DndProvider>
    </>
  );
};
