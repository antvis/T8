import { HeadlineSpec } from '../../schema';
import { Headline as StyledHeadline } from '../styled';
import { Phrases } from '../phrases';
import { getPrefixCls, classnames as cx } from '../../utils';
import { ParagraphEvents } from '../events.type';
import { useTheme } from '../context';

type HeadlineProps = ParagraphEvents & {
  spec: HeadlineSpec;
};

export function Headline({ spec, ...events }: HeadlineProps) {
  const { onClickParagraph, onMouseEnterParagraph, onMouseLeaveParagraph, ...phraseEvents } = events || {};
  const theme = useTheme();

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
      theme={theme}
    >
      <Phrases spec={spec.phrases} {...phraseEvents} />
    </StyledHeadline>
  );
}
