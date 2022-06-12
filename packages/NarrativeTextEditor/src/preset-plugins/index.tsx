/**
 * 默认富文本编辑行为
 */

import { createPlugins, PlatePlugin } from '@udecode/plate-core';
// import { createComboboxPlugin } from '@udecode/plate-combobox';

import { headingPlugin } from './heading';
import { paragraphPlugin } from './paragraph';
import { alignPlugin } from './alignment';
import { listPlugin } from './list';
import { basicMarkPlugins } from './marks';
import { fontPlugins } from './font';
import { linkPlugin } from './link';
import { withStyledPlaceholders } from './placeholders';
import { markdownPlugin } from './markdown';
// TODO 处理原变量列表与自定义交互，暂时隐藏变量列表插件
// import { variablePlugin } from './variable';

import { softBreakPlugin, exitBreakPlugin } from './utils';
import { createCommandPanelPlugin } from './commandPanel';

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

    // createComboboxPlugin(),
    // variablePlugin,

    // others
    markdownPlugin,
    softBreakPlugin,
    exitBreakPlugin,
    createCommandPanelPlugin(),

    ...extraPlugins,
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
export { LinkToolbarButton } from './link';

// other handler
export { VariableCombobox } from './variable';
export { CommandPanel } from './commandPanel';
