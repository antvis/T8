/**
 * 默认富文本编辑行为
 */
import { createPlugins, createPluginFactory } from '@udecode/plate-core';
import { withPlaceholders } from '@udecode/plate-ui-placeholder';

import { NarrativeTextEditorProps } from '../types';

import { headingPlugin } from './heading';
import { paragraphPlugin } from './paragraph';
import { alignPlugin } from './alignment';
import { listPlugin } from './list';
import { basicMarkPlugins } from './marks';
import { fontPlugins } from './font';
import { linkPlugin } from './link';
import { markdownPlugin } from './markdown';
import { dndPlugins, withStyledDraggables } from './dnd';
import { singleLinePlugin } from './singleLine';

import { softBreakPlugin, exitBreakPlugin } from './utils';

import { createCustomUI } from './createCustomUI';
import intl from '../locale';

const DEFAULT_PLACEHOLDERS: NarrativeTextEditorProps['placeholders'] = [
  {
    key: 'p',
    placeholder: intl.get('placeholder'),
    hideOnBlur: true,
  },
];

const getPlugins = (
  props: Pick<NarrativeTextEditorProps, 'draggable' | 'plugins' | 'platePlugins' | 'placeholders' | 'singleLine'>,
) => {
  const { plugins: extraPlugins, draggable, singleLine, platePlugins } = props;
  let { placeholders = DEFAULT_PLACEHOLDERS } = props;
  const extraDraggableKeys = extraPlugins.filter(({ isInline }) => !isInline).map(({ key }) => key);

  let plugins = [
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
  ];

  if (extraPlugins.length) {
    const extraPlatePlugin = extraPlugins.map(({ key, isInline }) =>
      createPluginFactory({
        key,
        isElement: true,
        isInline,
        isVoid: true,
        // TODO 增加扩展判断，如果是文本行首删除则不用删除整个 custom block
        // withCustom: withCustom
      })(),
    );
    plugins = plugins.concat(extraPlatePlugin);
  }

  // raw plate plugin
  if (platePlugins.length) plugins = plugins.concat(platePlugins);

  // single line
  if (singleLine) {
    plugins.push(singleLinePlugin);
  } else {
    // single line can't draggable
    plugins = plugins.concat(dndPlugins);
  }

  let components = createCustomUI(extraPlugins);
  if (placeholders === true) placeholders = DEFAULT_PLACEHOLDERS;
  if (Array.isArray(placeholders) && placeholders.length > 0) {
    components = withPlaceholders(components, placeholders);
  }
  if (draggable) {
    components = withStyledDraggables(components, extraDraggableKeys);
  }

  return createPlugins(plugins, {
    components,
  });
};

export default getPlugins;
