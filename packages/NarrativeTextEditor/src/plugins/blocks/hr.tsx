/**
 * Use this plugin to render a <hr> HTML tag.
 */
import { createHorizontalRulePlugin, createSelectOnBackspacePlugin, ELEMENT_HR } from '@udecode/plate';

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
