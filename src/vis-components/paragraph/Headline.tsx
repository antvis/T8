import { HeadlineSpec, ParagraphType } from '../../schema';
import { Headline as StyledHeadline } from '../styled';
import { Phrases } from '../phrases';
import { getPrefixCls, classnames as cx } from '../../utils';
import { useTheme, useEvent, CurrentParagraphInfoProvider } from '../context';

type HeadlineProps = {
  spec: HeadlineSpec;
};

export function Headline({ spec }: HeadlineProps) {
  const { onEvent } = useEvent();
  const themeSeedToken = useTheme();

  const onClick = () => {
    onEvent?.('paragraph:click', spec);
  };
  const onMouseEnter = () => {
    onEvent?.('paragraph:mouseenter', spec);
  };
  const onMouseLeave = () => {
    onEvent?.('paragraph:mouseleave', spec);
  };

  return (
    <CurrentParagraphInfoProvider paragraphType={ParagraphType.HEADLINE}>
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
    </CurrentParagraphInfoProvider>
  );
}
