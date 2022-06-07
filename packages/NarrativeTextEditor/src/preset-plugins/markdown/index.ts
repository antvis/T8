/**
 * Allows you to apply formatting based on character sequences, such as automatically converting # into an H1. This package also provides predefined rules.
 *
 * >> Create actions with markdown-like syntax.
 */
import { createAutoformatPlugin } from '@udecode/plate-autoformat';

import { autoformatRules } from './autoformatRules';

export const markdownPlugin = createAutoformatPlugin({
  options: {
    rules: autoformatRules,
  },
});
