import { comboboxActions, ComboboxOnSelectItem, comboboxSelectors } from '@udecode/plate-combobox';
import { getBlockAbove, getPlugin, insertNodes, PlatePluginKey } from '@udecode/plate-core';
import { Editor, Transforms } from 'slate';
import { HistoryEditor } from 'slate-history';
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
    } = getPlugin<VariablePlugin>(editor, key);

    const pathAbove = getBlockAbove(editor)?.[1];
    const isBlockEnd = editor.selection && pathAbove && Editor.isEnd(editor, editor.selection.anchor, pathAbove);

    Editor.withoutNormalizing(editor, () => {
      // insert a space to fix the bug
      if (isBlockEnd) {
        Transforms.insertText(editor, ' ');
      }

      Transforms.select(editor, targetRange);

      HistoryEditor.withoutMerging(editor, () =>
        Transforms.removeNodes(editor, {
          match: (node: any) => node.type === ELEMENT_VARIABLE_INPUT,
        }),
      );

      insertNodes<VariableNode>(editor, {
        type,
        children: [{ text: '' }],
        ...createVariableNode(item),
      });

      // move the selection after the element
      Transforms.move(editor);

      // delete the inserted space
      if (isBlockEnd && !insertSpaceAfterVariable) {
        Transforms.delete(editor);
      }
    });

    comboboxActions.reset();
  };
