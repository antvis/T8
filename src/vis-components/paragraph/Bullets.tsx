import { v4 } from 'uuid';
import { Ol, Ul, Li } from '../styled';
import { Phrases } from '../phrases';
import { getPrefixCls, classnames as cx } from '../../utils';
import { ExtensionProps, ParagraphEvents } from '../../interface';
import { BulletsParagraphSpec } from '../../schema';
import { presetPluginManager } from '../../plugin';
import { useTheme } from '../context';

type BulletsProps = ExtensionProps &
  ParagraphEvents & {
    /**
     * @description specification of bullets paragraph
     * @description.zh-CN 列表段落描述
     */
    spec: BulletsParagraphSpec;
  };

export function Bullets({ spec, pluginManager = presetPluginManager, ...events }: BulletsProps) {
  const { onClickParagraph, onMouseEnterParagraph, onMouseLeaveParagraph, ...phraseEvents } = events || {};

  const children = spec.bullets?.map((bullet) => {
    const onClickLi = () => {
      onClickParagraph?.(bullet);
    };
    const onMouseEnterLi = () => {
      onMouseEnterParagraph?.(bullet);
    };
    const onMouseLeaveLi = () => {
      onMouseLeaveParagraph?.(bullet);
    };
    return (
      <Li
        className={cx(getPrefixCls('li'), bullet.className)}
        key={spec.key || v4()}
        style={bullet.styles}
        onClick={onClickLi}
        onMouseEnter={onMouseEnterLi}
        onMouseLeave={onMouseLeaveLi}
      >
        <Phrases spec={bullet.phrases} pluginManager={pluginManager} {...phraseEvents} />
        {bullet?.subBullet ? <Bullets spec={bullet?.subBullet} pluginManager={pluginManager} {...events} /> : null}
      </Li>
    );
  });

  const tag = spec.isOrder ? 'ol' : 'ul';
  const Comp = spec.isOrder ? Ol : Ul;

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
    <Comp
      as={tag}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      theme={theme}
      className={cx(getPrefixCls(tag), spec.className)}
      style={spec.styles}
    >
      {children}
    </Comp>
  );
}
