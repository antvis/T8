/**
 * Allows you to create hotkeys which insert a line break, without exiting the current block.
 *
 * 1. press ⇧⏎ anywhere to insert a soft break;
 * 2. press ⏎ to continue with code block and blockquote;
 */
import { createSoftBreakPlugin } from '@udecode/plate-break';
import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote';

export const softBreakPlugin = createSoftBreakPlugin({
  options: {
    rules: [
      { hotkey: 'shift+enter' }, // same hotkey as yuque
      {
        hotkey: 'enter',
        query: {
          allow: [ELEMENT_BLOCKQUOTE],
        },
      },
    ],
  },
});
