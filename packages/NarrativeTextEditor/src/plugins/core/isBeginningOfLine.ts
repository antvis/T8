import { PlateEditor, getEditorString, getRange, getPointBefore } from '@udecode/plate-core';

export const isBeginningOfLine = (editor: PlateEditor) => {
  const previousChar = getEditorString(
    editor,
    getRange(editor, editor.selection, getPointBefore(editor, editor.selection)),
  );
  return previousChar === '';
};
