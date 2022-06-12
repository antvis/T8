/**
 * Allows you to create hotkeys which exit the current block.
 *
 * 1. press ⌘⏎ to exit to the next block;
 * 2. press ⇧⌘⏎ to exit before the selected block;
 * 3. heading ⏎ to exit to the next block
 */
import { createExitBreakPlugin } from '@udecode/plate-break';
import { KEYS_HEADING } from '@udecode/plate-heading';

export const exitBreakPlugin = createExitBreakPlugin({
  options: {
    rules: [
      {
        hotkey: 'mod+enter',
      },
      {
        hotkey: 'mod+shift+enter',
        before: true,
      },
      {
        hotkey: 'enter',
        query: {
          start: true,
          end: true,
          allow: KEYS_HEADING,
        },
      },
    ],
  },
});
