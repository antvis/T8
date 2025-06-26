import { HeadingParagraphSpec, getHeadingWeight } from '../../schema';
import * as Elements from '../styled';
import { Phrases } from '../phrases';
import { getPrefixCls, classnames as cx } from '../../utils';
import { useTheme } from '../context';

type HeadingProps = {
  spec: HeadingParagraphSpec;
};

export function Heading({ spec }: HeadingProps) {
  const weight = getHeadingWeight(spec.type);
  if (isNaN(weight)) return null;
  const Tag = Elements[`H${weight}`];

  const themeSeedToken = useTheme();

  return (
    <Tag className={cx(getPrefixCls(`h${weight}`), spec.className)} style={spec.styles} theme={themeSeedToken}>
      <Phrases spec={spec.phrases} />
    </Tag>
  );
}
