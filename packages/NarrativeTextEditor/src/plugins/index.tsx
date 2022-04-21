import { createPlugins } from '@udecode/plate-core';

import { headingPlugin } from './heading';
import { paragraphPlugin } from './paragraph';
import { alignPlugin } from './alignment';
import { listPlugin } from './list';
import { basicMarkPlugins } from './marks';
import { fontPlugins } from './font';
import { withStyledPlaceholders } from './placeholders';
import { markdownPlugin } from './markdown';
import { variablePlugin } from './variable';

import { softBreakPlugin, exitBreakPlugin } from './utils';

import { createCustomUI } from './ui';

const getPlugins = () => {
  const plugins = [
    headingPlugin,
    paragraphPlugin,
    alignPlugin, // alignment must be used with basic element to take effect
    listPlugin,
    ...basicMarkPlugins,
    ...fontPlugins,

    // others
    markdownPlugin,
    softBreakPlugin,
    exitBreakPlugin,
    variablePlugin,
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
export { BasicMarkToolbarButtons } from './marks';
export { FontToolbarButtons } from './font';

// other handler
export { VariableCombobox } from './variable';
