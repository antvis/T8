import { createLinkPlugin } from '@udecode/plate-link';
import { LinkElement } from './LinkElement';

export const linkPlugin = createLinkPlugin({
  component: LinkElement,
});

export { LinkToolbarButton } from './LinkToolbarButton';
