/**
 * Support <img/>
 */
import { createImagePlugin, ELEMENT_IMAGE } from '@udecode/plate-image';
import { createSelectOnBackspacePlugin } from '@udecode/plate-select';

export const imagePlugins = [
  createImagePlugin(),
  createSelectOnBackspacePlugin({
    options: {
      query: {
        allow: [ELEMENT_IMAGE],
      },
    },
  }),
];
