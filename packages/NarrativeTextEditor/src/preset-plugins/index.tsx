/**
 * 默认富文本编辑行为
 */

import { createPlugins, PlatePlugin } from '@udecode/plate-core';
import { dndPlugins, withStyledDraggables } from './dnd';

import { headingPlugin } from './heading';
import { paragraphPlugin } from './paragraph';
import { alignPlugin } from './alignment';
import { listPlugin } from './list';
import { basicMarkPlugins } from './marks';
import { fontPlugins } from './font';
import { linkPlugin } from './link';
import { withStyledPlaceholders } from './placeholders';
import { markdownPlugin } from './markdown';

import { softBreakPlugin, exitBreakPlugin } from './utils';

import { createCustomUI } from './ui';

const getPlugins = (extraPlugins: PlatePlugin[]) => {
  const plugins = [
    headingPlugin,
    paragraphPlugin,
    alignPlugin, // alignment must be used with basic element to take effect
    listPlugin,
    linkPlugin,
    ...basicMarkPlugins,
    ...fontPlugins,

    // others
    markdownPlugin,
    softBreakPlugin,
    exitBreakPlugin,
    ...dndPlugins,

    // custom
    ...extraPlugins,
  ];

  let components = createCustomUI();
  components = withStyledPlaceholders(components);
  components = withStyledDraggables(components);

  return createPlugins(plugins, {
    components,
  });
};

export default getPlugins;

// use with ui configuration
export { HeadingToolbarButtons } from './heading';
export { ParagraphToolbarButton } from './paragraph';
export { AlignToolbarButtons } from './alignment';
export { ListToolbarButtons } from './list';
export { BasicMarkToolbarButtons } from './marks';
export { FontToolbarButtons } from './font';
export { LinkToolbarButton } from './link';

// other handler
export { VariableCombobox } from './variable';
