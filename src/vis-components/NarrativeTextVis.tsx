import { v4 } from 'uuid';
import { useRef } from 'preact/hooks';
import { NarrativeTextSpec } from '../schema';
import { Container } from './styled';
import { Headline } from './paragraph';
import { Section } from './section';
import { NarrativeEvents } from './types';
import { classnames as cx, getPrefixCls } from '../utils';
// import { copyToClipboard, getSelectionContentForCopy } from '../chore/exporter/helpers/copy';
import { defaultSeedToken, SeedTokenOptions } from '../theme';
import { PluginManager, presetPluginManager } from '../plugin';
import { ContextProvider } from './context';

export type ExtensionProps = {
  /**
   * @description extension plugin
   * @description.zh-CN 扩展插件
   */
  pluginManager?: PluginManager;
};

export type NarrativeTextVisProps = ExtensionProps &
  NarrativeEvents & {
    /**
     * @description specification of narrative text spec
     * @description.zh-CN Narrative 描述 json 信息
     */
    spec: NarrativeTextSpec;
    // TODO:
    /**
     * @description the function to be called when copy event is listened. If it is undefined, the default behavior is to put the transformed html and plain text into user's clipboard
     * @description.监听到 copy 事件时执行的函数，可用于控制复制的内容和复制行为，如果不传，默认将会把转换后的富文本和纯文本内容放入剪切板
     */
    // copyNarrative?: (content: { spec: NarrativeTextSpec; plainText: string; html: string }) => void;
    /**
     * @description theme props
     * @description.zh-CN 主题配置
     */
    themeSeedToken?: SeedTokenOptions;
  };

/**
 * The NTV React component for rendering narrative text visualizations.
 * It contains all the vis-components needed to render a narrative text spec.
 * All the vis-components are writed with PReact.
 */
export function NarrativeTextVis({
  spec,
  pluginManager = presetPluginManager,
  themeSeedToken = defaultSeedToken,
  // copyNarrative,
  ...events
}: NarrativeTextVisProps) {
  const narrativeDomRef = useRef<HTMLDivElement>(null);
  const { headline, sections, styles, className } = spec;
  const { onEvent } = events || {};

  const onClick = () => {
    onEvent?.('narrative:click', spec);
  };
  const onMouseEnter = () => {
    onEvent?.('narrative:mouseenter', spec);
  };
  const onMouseLeave = () => {
    onEvent?.('narrative:mouseleave', spec);
  };

  // TODO:
  // useEffect(() => {
  //   const onCopy = async (event: ClipboardEvent) => {
  //     const { plainText, html } = await getSelectionContentForCopy();
  //     if (!copyNarrative) {
  //       // 如果没有传递复制方法，默认行为是拦截用户复制操作(使用快捷键或右键选择复制均会触发)，将转换后的内容放进剪切板
  //       // if no `copyNarrative` passed in, the default behavior when user conduct `copy` is to put the transformed html and plainText into user's clipboard
  //       event.preventDefault();
  //       copyToClipboard(html, plainText, onCopySuccess, onCopyFailure);
  //     } else {
  //       copyNarrative({ spec, plainText, html });
  //     }
  //   };

  //   narrativeDomRef.current?.addEventListener('copy', onCopy);
  //   return () => {
  //     narrativeDomRef.current?.addEventListener('copy', onCopy);
  //   };
  // }, [copyNarrative]);

  return (
    <ContextProvider themeSeedToken={themeSeedToken} plugin={pluginManager} events={events}>
      <Container
        className={cx(className, getPrefixCls('container'))}
        style={styles}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={narrativeDomRef}
      >
        {headline ? <Headline spec={headline} /> : null}
        {sections ? sections?.map((section) => <Section key={section.key || v4()} spec={section} />) : null}
      </Container>
    </ContextProvider>
  );
}
