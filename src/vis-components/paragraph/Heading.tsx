import { HeadingParagraphSpec, getHeadingWeight } from '../../schema';
import * as Elements from '../styled';
import { Phrases } from '../phrases';
import { getPrefixCls, classnames as cx } from '../../utils';
import { PhraseEvents } from '../../interface';
import { useTheme } from '../context';

type HeadingProps = PhraseEvents & {
  spec: HeadingParagraphSpec;
};

export function Heading({ spec, ...events }: HeadingProps) {
  const weight = getHeadingWeight(spec.type);
  if (isNaN(weight)) return null;
  const Tag = Elements[`H${weight}`];

  const theme = useTheme();

  return (
    <Tag className={cx(getPrefixCls(`h${weight}`), spec.className)} style={spec.styles} theme={theme}>
      <Phrases spec={spec.phrases} {...events} />
    </Tag>
  );
}
