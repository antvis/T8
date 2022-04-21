import { PlateEditor } from '@udecode/plate-core';
import { findVariableInput } from '../queries';
import { removeVariableInput } from '../transforms';
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
