import { getParentNode, isElement, PlateEditor, Value } from '@udecode/plate-core';
import { AutoformatBlockRule } from '@udecode/plate-autoformat';
import { toggleList, unwrapList } from '@udecode/plate-list';

export const clearBlockFormat: AutoformatBlockRule['preFormat'] = (editor) => unwrapList(editor);

export const format = <V extends Value>(editor: PlateEditor<V>, customFormatting: any) => {
  if (editor.selection) {
    const parentEntry = getParentNode(editor, editor.selection);
    if (!parentEntry) return;
    const [node] = parentEntry;
    if (isElement(node)) {
      customFormatting();
    }
  }
};

export const formatList = <V extends Value>(editor: PlateEditor<V>, elementType: string) => {
  format(editor, () =>
    toggleList(editor, {
      type: elementType,
    }),
  );
};

export const formatText = <V extends Value>(editor: PlateEditor<V>, text: string) => {
  format(editor, () => editor.insertText(text));
};
