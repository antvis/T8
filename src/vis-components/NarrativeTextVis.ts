import { NarrativeTextSpec } from '../schema';
import { Container } from './styled';
import { renderHeadline } from './paragraph';
import { renderSection } from './section';
import { NarrativeEvents, getEventHandlers } from './types';
import { classnames as cx, getPrefixCls } from '../utils';
import { defaultSeedToken, SeedTokenOptions } from '../theme';
import { PluginManager, presetPluginManager } from '../plugin';

export type NarrativeTextVisOptions = NarrativeEvents & {
  /**
   * @description extension plugin
   * @description.zh-CN 扩展插件
   */
  pluginManager?: PluginManager;
  /**
   * @description theme props
   * @description.zh-CN 主题配置
   */
  themeSeedToken?: SeedTokenOptions;
};

/**
 * Render a narrative text spec to a DOM element.
 */
export function renderNarrativeText(
  spec: NarrativeTextSpec,
  { pluginManager = presetPluginManager, themeSeedToken = defaultSeedToken, onEvent }: NarrativeTextVisOptions = {},
) {
  const { headline, sections, styles, className } = spec;
  const ctx = { theme: themeSeedToken, pluginManager, onEvent };

  return Container(
    {
      className: cx(className, getPrefixCls('container')),
      style: styles,
      ...getEventHandlers(onEvent, 'narrative', spec),
    },
    headline && renderHeadline(headline, ctx),
    sections?.map((section) => renderSection(section, ctx)),
  );
}
