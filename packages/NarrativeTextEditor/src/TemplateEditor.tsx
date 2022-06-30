import React, { useEffect, forwardRef, ForwardRefRenderFunction } from 'react';
import { usePlateEditorRef } from '@udecode/plate-core';

import NarrativeTextEditor from './editor';
import { TemplateEditorProps, NarrativeTextEditorRef } from './types';
import { variablePlugins, VariableCombobox } from './plugins/variable';
import { transferComboboxItemData, updateVariables } from './helpers';

// Listen variable map changes and update variable
const VariableListener: React.FC<Pick<TemplateEditorProps, 'variableMap'>> = ({ variableMap }) => {
  const editor = usePlateEditorRef();
  useEffect(() => {
    updateVariables(editor, variableMap);
  }, [variableMap]);
  return null;
};

/**
 * @beta
 * template editor with variable map
 */
const TemplateEditor: ForwardRefRenderFunction<NarrativeTextEditorRef, TemplateEditorProps> = (
  { readOnly, variableMap, ...extraProps },
  ref,
) => {
  return (
    <NarrativeTextEditor ref={ref} platePlugins={variablePlugins} readOnly={readOnly} {...extraProps}>
      <VariableListener variableMap={variableMap} />
      {!readOnly && variableMap && <VariableCombobox items={transferComboboxItemData(variableMap)} />}
    </NarrativeTextEditor>
  );
};

export default React.memo(forwardRef(TemplateEditor));
