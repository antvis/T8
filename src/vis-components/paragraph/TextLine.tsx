import { TextParagraphSpec } from '../../schema';
import { P as StyledP } from '../styled';
import { Phrases } from '../phrases';
import { getPrefixCls, classnames as cx } from '../../utils';
import { useTheme } from '../context';

type TextLineProps = {
  /**
   * @description specification of text line
   * @description.zh-CN 文本行描述
   */
  spec: TextParagraphSpec;
};

export function TextLine({ spec }: TextLineProps) {
  const themeSeedToken = useTheme();

  return (
    <StyledP theme={themeSeedToken} className={cx(getPrefixCls('p'), spec.className)} style={spec.styles}>
      <Phrases spec={spec.phrases} />
    </StyledP>
  );
}
