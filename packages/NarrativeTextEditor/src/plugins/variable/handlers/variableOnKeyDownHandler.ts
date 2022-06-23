import { PlateEditor } from '@udecode/plate-core';
import { removeMentionInput as removeVariableInput } from '@udecode/plate-mention';
import { findVariableInput } from '../queries';
import { KeyboardEventHandler, moveSelectionByOffset, MoveSelectionByOffsetOptions } from '../../core';

export const variableOnKeyDownHandler: (
  options?: MoveSelectionByOffsetOptions,
) => (editor: PlateEditor) => KeyboardEventHandler = (options) => (editor) => (event) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    const currentVariableInput = findVariableInput(editor);
    if (currentVariableInput) {
      removeVariableInput(editor, currentVariableInput[1]);
    }
    return true;
  }

  return moveSelectionByOffset(editor, options)(event);
};
