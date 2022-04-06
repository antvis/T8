/**
 * Use this plugin to render a <hr> HTML tag.
 */
import { createHorizontalRulePlugin, ELEMENT_HR } from '@udecode/plate-horizontal-rule';
import { createSelectOnBackspacePlugin } from '@udecode/plate-select';

export const hrPlugins = [
  createHorizontalRulePlugin(),
  createSelectOnBackspacePlugin({
    options: {
      query: {
        allow: [ELEMENT_HR],
      },
    },
  }),
];
