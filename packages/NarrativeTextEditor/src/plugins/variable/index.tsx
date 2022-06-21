/**
 * reference plate-mention to input variable
 */
import { createComboboxPlugin } from '@udecode/plate-combobox';

import { createVariablePlugin } from './createVariablePlugin';
import { ELEMENT_VARIABLE, ELEMENT_VARIABLE_INPUT } from './constants';
import { VariableElement } from './VariableElement';
import { VariableInputElement } from './VariableInputElement';

export const variablePlugins = [createComboboxPlugin(), createVariablePlugin()];

export const variableComponents = {
  [ELEMENT_VARIABLE]: VariableElement,
  [ELEMENT_VARIABLE_INPUT]: VariableInputElement,
};

export { VariableCombobox } from './VariableCombobox';
export { ELEMENT_VARIABLE, ELEMENT_VARIABLE_INPUT } from './constants';
export { VariableNodeData, VariableComboboxItem, VariableNode } from './types';
