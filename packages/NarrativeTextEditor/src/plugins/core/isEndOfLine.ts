import { PlateEditor, getEditorString, getRange, getPointAfter, Value } from '@udecode/plate-core';

export const isEndOfLine = <V extends Value>(editor: PlateEditor<V>) => {
  const nextChar = getEditorString(editor, getRange(editor, editor.selection, getPointAfter(editor, editor.selection)));
  return nextChar === '';
};
