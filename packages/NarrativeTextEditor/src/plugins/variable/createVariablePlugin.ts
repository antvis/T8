import { createPluginFactory } from '@udecode/plate-core';
import { variableOnKeyDownHandler } from './handlers';
import { isSelectionInVariableInput } from './queries';
import { VariablePlugin } from './types';
import { withVariable } from './withVariable';
import { ELEMENT_VARIABLE, ELEMENT_VARIABLE_INPUT } from './constants';

const trigger = '$';

/**
 * Enables support for autocompleting @variables.
 */
export const createVariablePlugin = createPluginFactory<VariablePlugin>({
  key: ELEMENT_VARIABLE,
  isElement: true,
  isInline: true,
  isVoid: true,
  handlers: {
    onKeyDown: variableOnKeyDownHandler({ query: isSelectionInVariableInput }),
  },
  withOverrides: withVariable,
  options: {
    trigger,
    createVariableNode: (item) => ({ value: item.text, metadata: item.data }),
  },
  plugins: [
    {
      key: ELEMENT_VARIABLE_INPUT,
      isElement: true,
      isInline: true,
    },
  ],
  then: (editor, { key }) => ({
    options: {
      id: key,
    },
  }),
});
