/**
 * 默认富文本编辑行为
 */

import { createPlugins, createPluginFactory } from '@udecode/plate-core';

import { headingPlugin } from './heading';
import { paragraphPlugin } from './paragraph';
import { alignPlugin } from './alignment';
import { listPlugin } from './list';
import { basicMarkPlugins } from './marks';
import { fontPlugins } from './font';
import { linkPlugin } from './link';
import { markdownPlugin } from './markdown';
import { softBreakPlugin, exitBreakPlugin } from './utils';

import { withStyledPlaceholders } from './placeholders';
import { dndPlugins, withStyledDraggables } from './dnd';

import { createCustomUI } from './ui';

import { CustomPlugin } from './custom';

const getPlugins = ({ extraPlugins, draggable }: { extraPlugins: CustomPlugin[]; draggable: boolean }) => {
  const extraKeys = extraPlugins.filter(({ isInline }) => !isInline).map(({ key }) => key);
  const plugins = [
    headingPlugin,
    paragraphPlugin,
    alignPlugin, // alignment must be used with basic element to take effect
    listPlugin,
    linkPlugin,
    ...basicMarkPlugins,
    ...fontPlugins,
    ...dndPlugins,

    // custom
    ...extraPlugins.map(({ key, isInline }) =>
      createPluginFactory({
        key,
        isElement: true,
        isInline,
        isVoid: true,
      })(),
    ),

    // others
    markdownPlugin,
    softBreakPlugin,
    exitBreakPlugin,
  ];

  let components = createCustomUI(extraPlugins);
  components = withStyledPlaceholders(components);
  if (draggable) {
    components = withStyledDraggables(components, extraKeys);
  }

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

export type { CustomPlugin } from './custom';
