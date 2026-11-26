import { NarrativeTextSpec } from '../schema';
import { Container } from './styled';
import { renderHeadline } from './paragraph';
import { renderSection } from './section';
import { NarrativeEvents, ParagraphCache, RenderContext, getEventHandlers } from './types';
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
  /**
   * @description paragraphs of the previous render, identical ones are reused and the cache is updated
   * @description.zh-CN 上一次渲染的段落，内容相同的会被复用，缓存会被更新
   */
  cache?: ParagraphCache;
};

/**
 * Render a narrative text spec to a DOM element.
 */
export function renderNarrativeText(
  spec: NarrativeTextSpec,
  {
    pluginManager = presetPluginManager,
    themeSeedToken = defaultSeedToken,
    onEvent,
    cache,
  }: NarrativeTextVisOptions = {},
) {
  const { headline, sections, styles, className } = spec;
  const ctx: RenderContext = { theme: themeSeedToken, pluginManager, onEvent };

  if (cache) {
    const prev = new Map(cache);
    cache.clear();
    ctx.reuse = (p, render) => {
      const key = JSON.stringify(p);
      const el = prev.get(key)?.shift() ?? render();
      if (el) cache.set(key, [...(cache.get(key) ?? []), el]);
      return el;
    };
  }

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
