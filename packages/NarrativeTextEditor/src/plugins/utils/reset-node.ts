/**
 * Allows you to reset the block type based on certain rules.
 *
 * 1. press Enter in an empty block quote
 * 2. Backspace at the start of a block so it resets to a paragraph.
 */
import { isBlockAboveEmpty, isSelectionAtBlockStart } from '@udecode/plate-core';
import { createResetNodePlugin } from '@udecode/plate-reset-node';
import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';

const resetBlockTypesCommonRule = {
  types: [ELEMENT_BLOCKQUOTE],
  defaultType: ELEMENT_PARAGRAPH,
};

export const resetNodePlugin = createResetNodePlugin({
  options: {
    rules: [
      {
        ...resetBlockTypesCommonRule,
        hotkey: 'Enter',
        predicate: isBlockAboveEmpty,
      },
      {
        ...resetBlockTypesCommonRule,
        hotkey: 'Backspace',
        predicate: isSelectionAtBlockStart,
      },
    ],
  },
});
