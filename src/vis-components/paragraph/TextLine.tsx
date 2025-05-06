import { TextParagraphSpec } from '../../schema';
import { P as StyledP } from '../styled';
import { Phrases } from '../phrases';
import { getPrefixCls, classnames as cx } from '../../utils';
import { ExtensionProps, PhraseEvents } from '../../interface';
import { presetPluginManager } from '../../plugin';
import { useTheme } from '../context';

type TextLineProps = ExtensionProps &
  PhraseEvents & {
    /**
     * @description specification of text line
     * @description.zh-CN 文本行描述
     */
    spec: TextParagraphSpec;
  };

export function TextLine({ spec, pluginManager = presetPluginManager, ...events }: TextLineProps) {
  const theme = useTheme();

  return (
    <StyledP theme={theme} className={cx(getPrefixCls('p'), spec.className)} style={spec.styles}>
      <Phrases spec={spec.phrases} pluginManager={pluginManager} {...events} />
    </StyledP>
  );
}
