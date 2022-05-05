import React from 'react';
import { BulletsParagraphSpec, DefaultCustomPhraseGeneric } from '@antv/narrative-text-schema';
import { v4 } from 'uuid';
import { Bullet, Li } from '../styled';
import { Phrases } from '../phrases';
import { classnames as cx } from '../utils/classnames';
import { getPrefixCls } from '../utils/getPrefixCls';
import { WithPhraseProps, ThemeProps } from '../interface';

type BulletsProps<P extends DefaultCustomPhraseGeneric> = WithPhraseProps<P> & {
  spec: BulletsParagraphSpec<P>;
};

export function Bullets<P extends DefaultCustomPhraseGeneric>({
  spec,
  customPhraseRender,
  customEntityEncoding,
  size = 'normal',
}: ThemeProps & BulletsProps<P>) {
  const children = spec.bullets?.map((bullet) => (
    <Li className={getPrefixCls('li')} key={v4()} style={bullet.styles}>
      <Phrases<P>
        spec={bullet.phrases}
        size={size}
        customPhraseRender={customPhraseRender}
        customEntityEncoding={customEntityEncoding}
      />
      {bullet?.subBullet ? (
        <Bullets<P> spec={bullet?.subBullet} size={size} customPhraseRender={customPhraseRender} />
      ) : null}
    </Li>
  ));

  const tag = spec.isOrder ? 'ol' : 'ul';

  return (
    <Bullet as={tag} size={size} className={cx(getPrefixCls(tag), spec.className)} style={spec.styles}>
      {children}
    </Bullet>
  );
}
