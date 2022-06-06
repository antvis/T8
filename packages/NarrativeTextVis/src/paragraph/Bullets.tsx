import React from 'react';
import { BulletsParagraphSpec } from '@antv/narrative-text-schema';
import { v4 } from 'uuid';
import { Bullet, Li } from '../styled';
import { Phrases } from '../phrases';
import { getPrefixCls, classnames as cx } from '../utils';
import { ThemeProps, ExtensionProps } from '../interface';
import { presetPluginManager } from '../chore/plugin';

type BulletsProps = ThemeProps &
  ExtensionProps & {
    spec: BulletsParagraphSpec;
  };

export function Bullets({ spec, size = 'normal', pluginManager = presetPluginManager }: BulletsProps) {
  const children = spec.bullets?.map((bullet) => (
    <Li className={getPrefixCls('li')} key={v4()} style={bullet.styles}>
      <Phrases spec={bullet.phrases} size={size} pluginManager={pluginManager} />
      {bullet?.subBullet ? <Bullets spec={bullet?.subBullet} size={size} pluginManager={pluginManager} /> : null}
    </Li>
  ));

  const tag = spec.isOrder ? 'ol' : 'ul';

  return (
    <Bullet as={tag} size={size} className={cx(getPrefixCls(tag), spec.className)} style={spec.styles}>
      {children}
    </Bullet>
  );
}
