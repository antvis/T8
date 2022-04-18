import { createPlugins } from '@udecode/plate-core';
import { createPlateUI } from '@udecode/plate-ui';

import { alignPlugin, basicElementsPlugins, listPlugin, imagePlugins, hrPlugins } from './blocks';
import { linkPlugin } from './inline-elements';
import { basicMarksPlugin, fontPlugins } from './marks';
import { resetNodePlugin, softBreakPlugin, exitBreakPlugin, mdPlugin } from './utils';
import { withStyledPlaceholders } from './interactive';

// To plug all the components at once
const getPlugins = () => {
  const plugins = [
    // blocks
    ...basicElementsPlugins,
    alignPlugin, // alignment must be used with basic element to take effect
    listPlugin,
    ...imagePlugins,
    ...hrPlugins,

    // inline elements
    linkPlugin,

    // marks
    basicMarksPlugin,
    ...fontPlugins,

    // others
    resetNodePlugin,
    softBreakPlugin,
    exitBreakPlugin,
    mdPlugin,
  ];

  // TODO 如果是下方写法就无法生效
  // let components = createPlateUI();
  // withStyledPlaceholders(components);
  const components = withStyledPlaceholders(createPlateUI());

  return createPlugins(plugins, {
    components,
  });
};

export default getPlugins;

// use with ui configuration
export { AlignToolbarButtons } from './blocks/align';
export { BasicElementToolbarButtons } from './blocks/basic-element';
export { ListToolbarButtons } from './blocks/list';
export { LinkToolBarButton } from './inline-elements/link';
export { BasicMarkToolbarButtons } from './marks/basic-marks';
export { FontToolbarButtons } from './marks/font';
