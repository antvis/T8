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
    onClick: onParagraphClick,
    onMouseEnter: onParagraphMouseEnter,
    onMouseLeave: onParagraphMouseLeave,
  } = useEvent();
  const themeSeedToken = useTheme();

  const onClick = () => {
    onParagraphClick?.(EventType.ON_PARAGRAPH_CLICK, spec);
  };
  const onMouseEnter = () => {
    onParagraphMouseEnter?.(EventType.ON_PARAGRAPH_MOUSE_ENTER, spec);
  };
  const onMouseLeave = () => {
    onParagraphMouseLeave?.(EventType.ON_PARAGRAPH_MOUSE_LEAVE, spec);
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
