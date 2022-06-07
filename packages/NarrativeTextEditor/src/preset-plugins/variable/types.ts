import { TComboboxItem } from '@udecode/plate-combobox';
import { TElement } from '@udecode/plate-core';
import { EntityMetaData } from '@antv/narrative-text-vis';

interface CreateVariableNode {
  (item: VariableComboboxItem): VariableNodeData;
}

export type VariableComboboxItemData = EntityMetaData;
export type VariableComboboxItem = TComboboxItem<VariableComboboxItemData>;

export interface VariableNodeData {
  key: string;
  value: string;
  metadata: EntityMetaData;
}

export interface VariableInputNodeData {
  trigger: string;
}

export type VariableNode = TElement<VariableNodeData>;
export type VariableInputNode = TElement<VariableInputNodeData>;

export interface VariablePlugin {
  createVariableNode?: CreateVariableNode;
  id?: string;
  insertSpaceAfterVariable?: boolean;
  trigger?: string;
  inputCreation?: { key: string; value: string };
}
