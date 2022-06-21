import React, { useEffect } from 'react';
import { usePlateEditorRef } from '@udecode/plate-core';

import { NarrativeTextEditor } from './editor';
import { TemplateEditorProps } from './types';
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
 * template editor with variable map
 */
export const TemplateEditor: React.FC<TemplateEditorProps> = ({
  platePlugins = [],
  readOnly,
  variableMap,
  ...extraProps
}) => {
  return (
    <NarrativeTextEditor platePlugins={[...variablePlugins, ...platePlugins]} readOnly={readOnly} {...extraProps}>
      <VariableListener variableMap={variableMap} />
      {!readOnly && variableMap && <VariableCombobox items={transferComboboxItemData(variableMap)} />}
    </NarrativeTextEditor>
  );
};
