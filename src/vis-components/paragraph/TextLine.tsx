import { TextParagraphSpec } from '../../schema';
import { P as StyledP } from '../styled';
import { Phrases } from '../phrases';
import { getPrefixCls, classnames as cx } from '../../utils';
import { ExtensionProps, PhraseEvents } from '../../interface';
import { ThemeProps, defaultTheme } from '../../theme';
import { presetPluginManager } from '../../plugin';

type TextLineProps = ExtensionProps &
  PhraseEvents & {
    /**
     * @description specification of text line
     * @description.zh-CN 文本行描述
     */
    spec: TextParagraphSpec;
    /**
     * @description theme props
     * @description.zh-CN 主题配置
     */
    theme?: ThemeProps;
  };

export function TextLine({
  spec,
  theme = defaultTheme,
  pluginManager = presetPluginManager,
  ...events
}: TextLineProps) {
  return (
    <StyledP theme={theme} className={cx(getPrefixCls('p'), spec.className)} style={spec.styles}>
      <Phrases spec={spec.phrases} theme={theme} pluginManager={pluginManager} {...events} />
    </StyledP>
  );
}
