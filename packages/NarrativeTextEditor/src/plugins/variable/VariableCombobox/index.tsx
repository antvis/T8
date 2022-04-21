import React from 'react';
import { getPluginOptions, usePlateEditorRef } from '@udecode/plate-core';
import { Data, NoData } from '@udecode/plate-combobox';
import { Combobox, ComboboxProps } from '@udecode/plate-ui-combobox';
import { ELEMENT_VARIABLE } from '../constants';
import { VariablePlugin } from '../types';
import { getVariableOnSelectItem } from './getVariableOnSelectItem';

export interface VariableComboboxProps<TData extends Data = NoData> extends Partial<ComboboxProps<TData>> {
  pluginKey?: string;
}

export const VariableCombobox = <TData extends Data = NoData>({
  pluginKey = ELEMENT_VARIABLE,
  id = pluginKey,
  ...props
}: VariableComboboxProps<TData>) => {
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
      {...props}
    />
  );
};
