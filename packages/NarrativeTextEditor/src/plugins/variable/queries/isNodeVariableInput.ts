import { getPluginType, PlateEditor, TDescendant } from '@udecode/plate-core';
import { ELEMENT_VARIABLE_INPUT } from '../constants';
import { VariableInputNode } from '../types';

export const isNodeVariableInput = (editor: PlateEditor, node: TDescendant): node is VariableInputNode =>
  node.type === getPluginType(editor, ELEMENT_VARIABLE_INPUT);
