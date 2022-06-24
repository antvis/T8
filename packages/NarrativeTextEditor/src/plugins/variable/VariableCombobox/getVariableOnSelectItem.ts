import {
  getBlockAbove,
  getPlugin,
  insertNodes,
  PlatePluginKey,
  isEndPoint,
  withoutNormalizing,
  insertText,
  select,
  withoutMergingHistory,
  moveSelection,
  deleteText,
  removeNodes,
} from '@udecode/plate-core';
import { comboboxActions, ComboboxOnSelectItem, comboboxSelectors } from '@udecode/plate-combobox';
import { ELEMENT_VARIABLE, ELEMENT_VARIABLE_INPUT } from '../constants';
import { VariableNode, VariablePlugin, VariableComboboxItemData } from '../types';

export const getVariableOnSelectItem =
  ({ key = ELEMENT_VARIABLE }: PlatePluginKey = {}): ComboboxOnSelectItem<VariableComboboxItemData> =>
  (editor, item) => {
    const targetRange = comboboxSelectors.targetRange();
    if (!targetRange) return;

    const {
      type,
      options: { insertSpaceAfterVariable, createVariableNode },
    } = getPlugin<VariablePlugin>(editor as any, key);

    const pathAbove = getBlockAbove(editor)?.[1];
    const isBlockEnd = editor.selection && pathAbove && isEndPoint(editor, editor.selection.anchor, pathAbove);

    withoutNormalizing(editor, () => {
      // insert a space to fix the bug
      if (isBlockEnd) {
        insertText(editor, ' ');
      }

      select(editor, targetRange);

      withoutMergingHistory(editor, () =>
        removeNodes(editor, {
          match: (node: any) => node.type === ELEMENT_VARIABLE_INPUT,
        }),
      );

      insertNodes<VariableNode>(editor, {
        type,
        children: [{ text: '' }],
        ...createVariableNode(item),
      } as VariableNode);

      // move the selection after the element
      moveSelection(editor, { unit: 'offset' });

      // delete the inserted space
      if (isBlockEnd && !insertSpaceAfterVariable) {
        deleteText(editor);
      }
    });

    comboboxActions.reset();
  };
