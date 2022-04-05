import { createPlugins, createPlateUI } from '@udecode/plate';

import { alignPlugin, basicElementsPlugin, listPlugin, imagePlugins, hrPlugins } from './blocks';
import { linkPlugin } from './inline-elements';
import { basicMarksPlugin, fontPlugins } from './marks';
import { resetNodePlugin, softBreakPlugin, exitBreakPlugin, mdPlugin } from './utils';
import { withStyledPlaceholders, dndPlugin, withStyledDraggables } from './interactive';

// To plug all the components at once
const getPlugins = () => {
  const plugins = [
    // blocks
    basicElementsPlugin,
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
    dndPlugin,
  ];

  // ⚠️ note: hoc must directly wrap plateUI, otherwise it will not work. eg,
  // `let components = createPlateUI();`
  // `withStyledPlaceholders(components);`
  // `withStyledDraggables(components);`
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
