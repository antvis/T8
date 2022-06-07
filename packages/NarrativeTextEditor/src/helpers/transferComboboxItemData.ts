import { keys, map } from 'lodash';

import { VariableMap } from '../types';
import { VariableComboboxItem } from '../preset-plugins/variable';

export const transferComboboxItemData = (varMap: VariableMap): VariableComboboxItem[] =>
  map(keys(varMap), (key) => ({
    key,
    text: varMap[key].value,
    data: varMap[key].metadata,
  }));
