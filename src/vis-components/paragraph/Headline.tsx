import { HeadlineSpec } from '../../schema';
import { Headline as StyledHeadline } from '../styled';
import { Phrases } from '../phrases';
import { getPrefixCls, classnames as cx } from '../../utils';
import { useTheme, useEvent } from '../context';
import { EventType } from '../types';

type HeadlineProps = {
  spec: HeadlineSpec;
};

export function Headline({ spec }: HeadlineProps) {
  const {
    onClick: onClickParagraph,
    onMouseEnter: onMouseEnterParagraph,
    onMouseLeave: onMouseLeaveParagraph,
  } = useEvent();
  const themeSeedToken = useTheme();

  const onClick = () => {
    onClickParagraph?.(EventType.ON_CLICK_PARAGRAPH, spec);
  };
  const onMouseEnter = () => {
    onMouseEnterParagraph?.(EventType.ON_MOUSE_ENTER_PARAGRAPH, spec);
  };
  const onMouseLeave = () => {
    onMouseLeaveParagraph?.(EventType.ON_MOUSE_LEAVE_PARAGRAPH, spec);
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
      <Phrases spec={spec.phrases} />
    </StyledHeadline>
  );
}
