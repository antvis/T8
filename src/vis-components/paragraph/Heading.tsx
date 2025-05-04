import { HeadingParagraphSpec, getHeadingWeight } from '../../schema';
import * as Elements from '../styled';
import { Phrases } from '../phrases';
import { getPrefixCls, classnames as cx } from '../../utils';
import { ExtensionProps, PhraseEvents } from '../../interface';
import { presetPluginManager } from '../../plugin';
import { ThemeProps, defaultTheme } from '../../theme';

type HeadingProps = ExtensionProps &
  PhraseEvents & {
    spec: HeadingParagraphSpec;
    /**
     * @description theme props.
     * @description.zh-CN 主题配置.
     */
    theme?: ThemeProps;
  };

export function Heading({ spec, pluginManager = presetPluginManager, theme = defaultTheme, ...events }: HeadingProps) {
  const weight = getHeadingWeight(spec.type);
  if (isNaN(weight)) return null;
  const Tag = Elements[`H${weight}`];

  return (
    <Tag className={cx(getPrefixCls(`h${weight}`), spec.className)} style={spec.styles} theme={theme}>
      <Phrases spec={spec.phrases} pluginManager={pluginManager} {...events} />
    </Tag>
  );
}
