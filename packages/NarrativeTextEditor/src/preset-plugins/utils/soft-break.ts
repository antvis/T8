/**
 * Allows you to create hotkeys which insert a line break, without exiting the current block.
 *
 * 1. press ⇧⏎ anywhere to insert a soft break;
 */
import { createSoftBreakPlugin } from '@udecode/plate-break';

export const softBreakPlugin = createSoftBreakPlugin({
  options: {
    rules: [
      { hotkey: 'shift+enter' }, // same hotkey as yuque
    ],
  },
});
