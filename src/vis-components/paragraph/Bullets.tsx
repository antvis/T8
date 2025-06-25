import { v4 } from 'uuid';
import { Ol, Ul, Li } from '../styled';
import { Phrases } from '../phrases';
import { getPrefixCls, classnames as cx } from '../../utils';
import { BulletsParagraphSpec } from '../../schema';
import { useTheme, useEvent } from '../context';
import { EventType } from '../types';

type BulletsProps = {
  /**
   * @description specification of bullets paragraph
   * @description.zh-CN 列表段落描述
   */
  spec: BulletsParagraphSpec;
};

export function Bullets({ spec }: BulletsProps) {
  const {
    onClick: onClickParagraph,
    onMouseEnter: onMouseEnterParagraph,
    onMouseLeave: onMouseLeaveParagraph,
  } = useEvent();

  const children = spec.bullets?.map((bullet) => {
    const onClickLi = () => {
      onClickParagraph?.(EventType.ON_CLICK_PARAGRAPH, bullet);
    };
    const onMouseEnterLi = () => {
      onMouseEnterParagraph?.(EventType.ON_MOUSE_ENTER_PARAGRAPH, bullet);
    };
    const onMouseLeaveLi = () => {
      onMouseLeaveParagraph?.(EventType.ON_MOUSE_LEAVE_PARAGRAPH, bullet);
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
        <Phrases spec={bullet.phrases} />
        {bullet?.subBullet ? <Bullets spec={bullet?.subBullet} /> : null}
      </Li>
    );
  });

  const tag = spec.isOrder ? 'ol' : 'ul';
  const Comp = spec.isOrder ? Ol : Ul;

  const themeSeedToken = useTheme();

  return (
    <Comp as={tag} theme={themeSeedToken} className={cx(getPrefixCls(tag), spec.className)} style={spec.styles}>
      {children}
    </Comp>
  );
}
