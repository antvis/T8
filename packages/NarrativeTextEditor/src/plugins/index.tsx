import { createPlugins } from '@udecode/plate-core';

import { headingPlugin } from './heading';
import { paragraphPlugin } from './paragraph';
import { alignPlugin } from './alignment';
import { listPlugin } from './list';

import { linkPlugin } from './inline-elements';
import { basicMarksPlugin, fontPlugins } from './marks';
import { resetNodePlugin, softBreakPlugin, exitBreakPlugin, mdPlugin } from './utils';
import { withStyledPlaceholders } from './placeholders';

import { createCustomUI } from './ui';

// To plug all the components at once
const getPlugins = () => {
  const plugins = [
    headingPlugin,
    paragraphPlugin,
    alignPlugin, // alignment must be used with basic element to take effect
    listPlugin,

    // inline elements
    linkPlugin,

    // marks
    basicMarksPlugin,
    ...fontPlugins,

    // others
    resetNodePlugin,
    // softBreakPlugin,
    // exitBreakPlugin,
    mdPlugin,
  ];

  // TODO 如果是下方写法就无法生效
  // let components = createPlateUI();
  // withStyledPlaceholders(components);
  const components = withStyledPlaceholders(createCustomUI());

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

export { LinkToolBarButton } from './inline-elements/link';
export { BasicMarkToolbarButtons } from './marks/basic-marks';
export { FontToolbarButtons } from './marks/font';
