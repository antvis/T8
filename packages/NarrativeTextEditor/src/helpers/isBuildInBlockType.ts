import { someNode, Value, TEditor } from '@udecode/plate-core';
import { BLOCK_KEYS } from '../constants';

/**
 * whether inner block types
 */
export function isBuildInBlockType<V extends Value = Value>(editor: TEditor<V>) {
  if (!editor || !editor.selection) return false;
  for (let i = 0; i < BLOCK_KEYS.length; i += 1) {
    if (
      someNode(editor, {
        match: {
          type: BLOCK_KEYS[i],
        },
      })
    ) {
      return true;
    }
  }
  return false;
}
