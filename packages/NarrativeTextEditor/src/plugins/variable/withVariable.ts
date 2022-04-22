/* eslint-disable no-param-reassign */
import { comboboxActions } from '@udecode/plate-combobox';
import { getPlugin, insertNodes, WithOverride } from '@udecode/plate-core';
import { Editor, Node, Range, Transforms } from 'slate';
import { removeVariableInput } from './transforms';
import { ELEMENT_VARIABLE_INPUT } from './constants';
import { findVariableInput, isNodeVariableInput, isSelectionInVariableInput } from './queries';
import { VariableInputNode, VariablePlugin } from './types';

export const withVariable: WithOverride<Record<string, any>, VariablePlugin> = (
  editor,
  { options: { id, trigger, inputCreation } },
) => {
  const { type } = getPlugin(editor, ELEMENT_VARIABLE_INPUT);

  const { apply, insertBreak, insertText, deleteBackward } = editor;

  editor.deleteBackward = (unit) => {
    const currentVariableInput = findVariableInput(editor);
    if (currentVariableInput && Node.string(currentVariableInput[0]) === '') {
      return removeVariableInput(editor, currentVariableInput[1]);
    }
    return deleteBackward(unit);
  };

  editor.insertBreak = () => {
    if (isSelectionInVariableInput(editor)) {
      return;
    }

    insertBreak();
  };

  editor.insertText = (text) => {
    if (!editor.selection || text !== trigger || isSelectionInVariableInput(editor)) {
      return insertText(text);
    }

    // Make sure a variable input is created at the beginning of line or after a whitespace
    const previousChar = Editor.string(
      editor,
      Editor.range(editor, editor.selection, Editor.before(editor, editor.selection)),
    );

    const nextChar = Editor.string(
      editor,
      Editor.range(editor, editor.selection, Editor.after(editor, editor.selection)),
    );

    const beginningOfLine = previousChar === '';
    const endOfLine = nextChar === '';
    const precededByWhitespace = previousChar === ' ';

    // input / not require whitespace before char
    if (endOfLine || beginningOfLine || precededByWhitespace) {
      const data: VariableInputNode = {
        type,
        children: [{ text: '' }],
        trigger,
      };
      if (inputCreation) {
        data[inputCreation.key] = inputCreation.value;
      }
      return insertNodes<VariableInputNode>(editor, data);
    }

    return insertText(text);
  };

  editor.apply = (operation) => {
    apply(operation);

    if (operation.type === 'insert_text' || operation.type === 'remove_text') {
      const currentVariableInput = findVariableInput(editor);
      if (currentVariableInput) {
        comboboxActions.text(Node.string(currentVariableInput[0]));
      }
    } else if (operation.type === 'set_selection') {
      const previousVariableInputPath = Range.isRange(operation.properties)
        ? findVariableInput(editor, { at: operation.properties })?.[1]
        : undefined;

      const currentVariableInputPath = Range.isRange(operation.newProperties)
        ? findVariableInput(editor, { at: operation.newProperties })?.[1]
        : undefined;

      if (previousVariableInputPath && !currentVariableInputPath) {
        // TODO 当前搜索如果输入中文会跳出
        // https://github.com/udecode/plate/issues/1501
        removeVariableInput(editor, previousVariableInputPath);
      }

      if (currentVariableInputPath) {
        comboboxActions.targetRange(editor.selection);
      }
    } else if (operation.type === 'insert_node' && isNodeVariableInput(editor, operation.node)) {
      if (operation.node.trigger !== trigger) {
        return;
      }

      const text = operation.node.children[0]?.text ?? '';

      if (inputCreation === undefined || operation.node[inputCreation.key] === inputCreation.value) {
        // Needed for undo - after an undo a variable insert we only receive
        // an insert_node with the variable input, i.e. nothing indicating that it
        // was an undo.
        Transforms.setSelection(editor, {
          anchor: { path: operation.path.concat([0]), offset: text.length },
          focus: { path: operation.path.concat([0]), offset: text.length },
        });

        comboboxActions.open({
          activeId: id,
          text,
          targetRange: editor.selection,
        });
      }
    } else if (operation.type === 'remove_node' && isNodeVariableInput(editor, operation.node)) {
      if (operation.node.trigger !== trigger) {
        return;
      }

      comboboxActions.reset();
    }
  };

  return editor;
};
