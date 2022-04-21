import React from 'react';
import { getPluginOptions, usePlateEditorRef } from '@udecode/plate-core';
import { Combobox, ComboboxProps } from '@udecode/plate-ui-combobox';
import { Phrase } from '@antv/narrative-text-vis';
import { ELEMENT_VARIABLE } from '../constants';
import { VariablePlugin, VariableComboboxItemData } from '../types';
import { getVariableOnSelectItem } from './getVariableOnSelectItem';

export interface VariableComboboxProps extends Partial<ComboboxProps<VariableComboboxItemData>> {
  pluginKey?: string;
}

export const VariableCombobox = ({ pluginKey = ELEMENT_VARIABLE, id = pluginKey, ...props }: VariableComboboxProps) => {
  const editor = usePlateEditorRef();

  const { trigger } = getPluginOptions<VariablePlugin>(editor, pluginKey);

  return (
    <Combobox
      id={id}
      trigger={trigger}
      controlled
      onSelectItem={getVariableOnSelectItem({
        key: pluginKey,
      })}
      onRenderItem={({ item }) => (
        <>
          {item.key}: &ensp;
          <Phrase
            spec={{
              type: 'entity',
              value: item.text,
              metadata: item.data,
            }}
          />
        </>
      )}
      {...props}
    />
  );
};
