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
import { softBreakPlugin, exitBreakPlugin } from './utils';

import { dndPlugins, withStyledDraggables } from './dnd';

import { createCustomUI } from './createCustomUI';

const DEFAULT_PLACEHOLDERS: NarrativeTextEditorProps['placeholders'] = [
  {
    key: 'p',
    placeholder: '请输入...',
    hideOnBlur: true,
  },
];

const getPlugins = (props: Pick<NarrativeTextEditorProps, 'draggable' | 'plugins' | 'placeholders'>) => {
  const { plugins: extraPlugins, draggable } = props;
  let { placeholders = DEFAULT_PLACEHOLDERS } = props;
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
  if (placeholders === true) placeholders = DEFAULT_PLACEHOLDERS;
  if (Array.isArray(placeholders) && placeholders.length > 0) {
    components = withPlaceholders(components, placeholders);
  }
  if (draggable) {
    components = withStyledDraggables(components, extraKeys);
  }

  return createPlugins(plugins, {
    components,
  });
};

export default getPlugins;
