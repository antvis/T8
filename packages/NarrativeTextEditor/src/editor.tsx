import React from 'react';
import { Plate } from '@udecode/plate-core';
import { isObject } from 'lodash';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { GlobalStyle } from './globalStyles';
import { safeSlateValue } from './constants';
import getPlugins from './plugins/getPlugins';
import HeadingToolbar from './toolbar/HeadingToolbar';
import HoveringToolbar from './toolbar/HoveringToolbar';
import type { NarrativeTextEditorProps } from './types';

import 'tippy.js/dist/tippy.css';

export const NarrativeTextEditor: React.FC<NarrativeTextEditorProps> = ({
  id,
  initialValue = safeSlateValue,
  plugins = [],
  onChange,
  style,
  showHeadingToolbar = true,
  showHoveringToolbar = true,
  readOnly = false,
  draggable = true,
  placeholders,
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
              // make drag handler visible
              padding: !readOnly && draggable ? '0 18px' : undefined,
              ...style,
            },
          }}
          plugins={getPlugins({ plugins, draggable, placeholders })}
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
