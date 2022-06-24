import { findNode, FindNodeOptions, getPluginType, PlateEditor, Value } from '@udecode/plate-core';
import { ELEMENT_VARIABLE_INPUT } from '../constants';

export const findVariableInput = <V extends Value>(
  editor: PlateEditor<V>,
  options?: Omit<FindNodeOptions<V>, 'match'>,
) =>
  findNode(editor, {
    ...options,
    match: { type: getPluginType(editor, ELEMENT_VARIABLE_INPUT) },
  });
