import { createPlugins } from '@udecode/plate-core';
import { createPlateUI } from '@udecode/plate-ui';

import { alignPlugin, basicElementsPlugins, listPlugin, imagePlugins, hrPlugins } from './blocks';
import { linkPlugin } from './inline-elements';
import { basicMarksPlugin, fontPlugins } from './marks';
import { resetNodePlugin, softBreakPlugin, exitBreakPlugin, mdPlugin } from './utils';
import { withStyledPlaceholders, dndPlugin, withStyledDraggables } from './interactive';

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
    dndPlugin,
  ];

  // TODO 如果是下方写法就无法生效
  // let components = createPlateUI();
  // withStyledPlaceholders(components);
  // withStyledDraggables(components);
  // TODO 同时有两个 editor 的时候只有一个能拖拽
  const components = withStyledDraggables(withStyledPlaceholders(createPlateUI()));

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
