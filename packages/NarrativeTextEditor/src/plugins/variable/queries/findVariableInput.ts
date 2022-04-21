import { findNode, FindNodeOptions, getPluginType, PlateEditor } from '@udecode/plate-core';
import { ELEMENT_VARIABLE_INPUT } from '../constants';

export const findVariableInput = (editor: PlateEditor, options?: Omit<FindNodeOptions, 'match'>) =>
  findNode(editor, {
    ...options,
    match: { type: getPluginType(editor, ELEMENT_VARIABLE_INPUT) },
  });
