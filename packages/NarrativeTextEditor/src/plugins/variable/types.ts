import { Data, NoData, TComboboxItem } from '@udecode/plate-combobox';
import { TElement } from '@udecode/plate-core';

export interface CreateVariableNode<TData extends Data> {
  (item: TComboboxItem<TData>): VariableNodeData;
}

export interface VariableNodeData {
  value: string;
}

export interface VariableInputNodeData {
  trigger: string;
}

export type VariableNode = TElement<VariableNodeData>;
export type VariableInputNode = TElement<VariableInputNodeData>;

export interface VariablePlugin<TData extends Data = NoData> {
  createVariableNode?: CreateVariableNode<TData>;
  id?: string;
  insertSpaceAfterVariable?: boolean;
  trigger?: string;
  inputCreation?: { key: string; value: string };
}
