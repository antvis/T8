import { TElement, TNodeProps } from '@udecode/plate-core';
import { TComboboxItem } from '@udecode/plate-combobox';
import { EntityMetaData } from '@antv/narrative-text-vis';

interface CreateVariableNode {
  (item: VariableComboboxItem): TNodeProps<VariableNode>;
}

export type VariableComboboxItemData = EntityMetaData;
export type VariableComboboxItem = TComboboxItem<VariableComboboxItemData>;

export interface VariableNodeData extends TElement {
  key: string;
  value: string;
  metadata?: EntityMetaData;
}

export interface VariableInputNodeData extends TElement {
  trigger: string;
}

// TODO 原来两种类型定义是有区别的，更新之后没有了，先维持类型命名，避免修改过多
export type VariableNode = VariableNodeData;
export type VariableInputNode = VariableInputNodeData;

export interface VariablePlugin {
  createVariableNode?: CreateVariableNode;
  id?: string;
  insertSpaceAfterVariable?: boolean;
  trigger?: string;
  inputCreation?: { key: string; value: string };
}
