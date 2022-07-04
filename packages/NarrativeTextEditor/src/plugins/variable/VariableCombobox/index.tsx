import React from 'react';
import { getPluginOptions, usePlateEditorRef } from '@udecode/plate-core';
import { Combobox, ComboboxProps } from '@udecode/plate-ui-combobox';
import { Phrase } from '@antv/narrative-text-vis';
import { includes } from 'lodash';

import { ELEMENT_VARIABLE } from '../constants';
import { VariablePlugin, VariableComboboxItemData } from '../types';
import { getVariableOnSelectItem } from './getVariableOnSelectItem';

export interface VariableComboboxProps extends Partial<ComboboxProps<VariableComboboxItemData>> {
  pluginKey?: string;
}

export const VariableCombobox = ({ pluginKey = ELEMENT_VARIABLE, id = pluginKey, ...props }: VariableComboboxProps) => {
  const editor = usePlateEditorRef();
  const { trigger } = getPluginOptions<VariablePlugin>(editor, pluginKey);

  const onFilter: ComboboxProps<VariableComboboxItemData>['filter'] = (search) => (item) => {
    const { key, text } = item;
    if (includes(key, search) || includes(text, search)) return true;
    return false;
  };

  return (
    <Combobox
      id={id}
      trigger={trigger}
      controlled
      onSelectItem={getVariableOnSelectItem({
        key: pluginKey,
      })}
      filter={onFilter}
      onRenderItem={({ item }) => (
        <>
          {item.key}: &ensp;
          <Phrase
            spec={{
              type: item?.data ? 'text' : 'entity',
              value: item.text,
              metadata: item?.data,
            }}
          />
        </>
      )}
      {...props}
    />
  );
};
