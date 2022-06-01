import { PlateEditor } from '@udecode/plate-core';
import { Range, Transforms } from 'slate';
import { KeyboardEventHandler } from './KeyboardEventHandler';

export interface MoveSelectionByOffsetOptions {
  query?: (editor: PlateEditor) => boolean;
}

export const moveSelectionByOffset: (
  editor: PlateEditor,
  options?: MoveSelectionByOffsetOptions,
) => KeyboardEventHandler =
  (editor, { query = () => true } = {}) =>
  // eslint-disable-next-line consistent-return
  (event) => {
    const { selection } = editor;
    if (!selection || Range.isExpanded(selection) || !query(editor)) {
      return false;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      Transforms.move(editor as any, { unit: 'offset', reverse: true });
      return true;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      Transforms.move(editor as any, { unit: 'offset' });
      return true;
    }
  };
