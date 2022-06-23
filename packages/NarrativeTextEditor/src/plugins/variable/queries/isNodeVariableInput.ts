import { getPluginType, PlateEditor, Value, TNode } from '@udecode/plate-core';
import { ELEMENT_VARIABLE_INPUT } from '../constants';
import { VariableInputNode } from '../types';

export const isNodeVariableInput = <V extends Value>(editor: PlateEditor<V>, node: TNode): node is VariableInputNode =>
  node.type === getPluginType(editor, ELEMENT_VARIABLE_INPUT);
