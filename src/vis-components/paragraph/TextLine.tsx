import { TextParagraphSpec } from '../../schema';
import { P as StyledP } from '../styled';
import { Phrases } from '../phrases';
import { getPrefixCls, classnames as cx } from '../../utils';
import { PhraseEvents } from '../types';
import { useTheme } from '../context';

type TextLineProps = PhraseEvents & {
  /**
   * @description specification of text line
   * @description.zh-CN 文本行描述
   */
  spec: TextParagraphSpec;
};

export function TextLine({ spec, ...events }: TextLineProps) {
  const themeSeedToken = useTheme();

  return (
    <StyledP theme={themeSeedToken} className={cx(getPrefixCls('p'), spec.className)} style={spec.styles}>
      <Phrases spec={spec.phrases} {...events} />
    </StyledP>
  );
}
