import { PlateEditor, getEditorString, getRange, getPointBefore, Value } from '@udecode/plate-core';

// TODO 这里的判断不准确，遇到行内元素也会返回 true 之后修复
export const isBeginningOfLine = <V extends Value>(editor: PlateEditor<V>) => {
  const previousChar = getEditorString(
    editor,
    getRange(editor, editor.selection, getPointBefore(editor, editor.selection, { unit: 'block' })),
  );
  return previousChar === '';
};
