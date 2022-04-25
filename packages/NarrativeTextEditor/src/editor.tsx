import React, { useEffect } from 'react';
import { Plate, usePlateEditorRef } from '@udecode/plate-core';

import { safeSlateValue } from './constants';
import { NarrativeTextEditorProps } from './types';
import getPlugins, { VariableCombobox } from './plugins';
import HeadingToolbar from './toolbar/HeadingToolbar';
import HoveringToolbar from './toolbar/HoveringToolbar';
import { transferComboboxItemData, updateVariables } from './helpers';

import 'tippy.js/dist/tippy.css';

// Listen variable map changes and update variable
const VariableListener: React.FC<Pick<NarrativeTextEditorProps, 'variableMap'>> = ({ variableMap }) => {
  const editor = usePlateEditorRef();
  useEffect(() => {
    updateVariables(editor, variableMap);
  }, [variableMap]);
  return null;
};

export const NarrativeTextEditor: React.FC<NarrativeTextEditorProps> = ({
  id,
  initialValue = safeSlateValue,
  onChange,
  style,
  variableMap,
  showHeadingToolbar = true,
  showHoveringToolbar = true,
  readOnly = false,
}) => {
  return (
    <>
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
            ...style,
          },
        }}
        plugins={getPlugins()}
      >
        {variableMap && <VariableListener variableMap={variableMap} />}
        {!readOnly && showHeadingToolbar && <HeadingToolbar />}
        {!readOnly && showHoveringToolbar && <HoveringToolbar />}
        {!readOnly && variableMap && <VariableCombobox items={transferComboboxItemData(variableMap)} />}
      </Plate>
    </>
  );
};
