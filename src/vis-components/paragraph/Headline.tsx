import { HeadlineSpec } from '../../schema';
import { Headline as StyledHeadline } from '../styled';
import { Phrases } from '../phrases';
import { getPrefixCls, classnames as cx } from '../../utils';
import { ParagraphEvents } from '../types';
import { useTheme } from '../context';

type HeadlineProps = ParagraphEvents & {
  spec: HeadlineSpec;
};

export function Headline({ spec, ...events }: HeadlineProps) {
  const { onClickParagraph, onMouseEnterParagraph, onMouseLeaveParagraph, ...phraseEvents } = events || {};
  const themeSeedToken = useTheme();

  const onClick = () => {
    onClickParagraph?.(spec);
  };
  const onMouseEnter = () => {
    onMouseEnterParagraph?.(spec);
  };
  const onMouseLeave = () => {
    onMouseLeaveParagraph?.(spec);
  };

  return (
    <StyledHeadline
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cx(getPrefixCls('headline'), spec.className)}
      style={spec.styles}
      theme={themeSeedToken}
    >
      <Phrases spec={spec.phrases} {...phraseEvents} />
    </StyledHeadline>
  );
}
