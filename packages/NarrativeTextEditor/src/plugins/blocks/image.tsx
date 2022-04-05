/**
 * Support <img/>
 */
import { createImagePlugin, createSelectOnBackspacePlugin, ELEMENT_IMAGE } from '@udecode/plate';

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
