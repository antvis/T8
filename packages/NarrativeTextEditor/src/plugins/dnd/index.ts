import { createNodeIdPlugin } from '@udecode/plate-node-id';
import { createDndPlugin } from '@udecode/plate-ui-dnd';

export const dndPlugins = [createNodeIdPlugin(), createDndPlugin()];

export { withStyledDraggables } from './withStyledDraggables';
