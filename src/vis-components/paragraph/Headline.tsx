import { HeadlineSpec } from '../../schema';
import { Headline as StyledHeadline } from '../styled';
import { Phrases } from '../phrases';
import { getPrefixCls, classnames as cx } from '../../utils';
import { ExtensionProps, ParagraphEvents } from '../../interface';
import { presetPluginManager } from '../../plugin';
import { ThemeProps, defaultTheme } from '../../theme';

type HeadlineProps = ExtensionProps &
  ParagraphEvents & {
    spec: HeadlineSpec;
    /**
     * @description theme props.
     * @description.zh-CN 主题配置.
     */
    theme?: ThemeProps;
  };

export function Headline({
  spec,
  pluginManager = presetPluginManager,
  theme = defaultTheme,
  ...events
}: HeadlineProps) {
  const { onClickParagraph, onMouseEnterParagraph, onMouseLeaveParagraph, ...phraseEvents } = events || {};
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
      <Phrases spec={spec.phrases} pluginManager={pluginManager} {...phraseEvents} />
    </StyledHeadline>
  );
}
