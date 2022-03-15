import React from 'react';
import { IParagraph, DefaultCustomPhraseGeneric } from '@antv/narrative-text-schema';
import { v4 } from 'uuid';
import { Phrases } from '../phrases';
import { classnames as cx } from '../utils/classnames';
import { getPrefixCls } from '../utils/getPrefixCls';
import { WithPhraseProps } from '../interface';

type BulletsProps<P extends DefaultCustomPhraseGeneric> = WithPhraseProps<P> & {
  spec: IParagraph<null, P>;
};

export function Bullets<P extends DefaultCustomPhraseGeneric>({
  spec,
  customPhraseRender,
  customEntityEncoding,
}: BulletsProps<P>) {
  if (spec.type === 'bullets') {
    const children = spec.bullets?.map((bullet) => (
      <li className={getPrefixCls('li')} key={v4()} style={bullet.styles}>
        <Phrases<P>
          spec={bullet.phrases}
          customPhraseRender={customPhraseRender}
          customEntityEncoding={customEntityEncoding}
        />
        {bullet?.subBullet ? <Bullets<P> spec={bullet?.subBullet} customPhraseRender={customPhraseRender} /> : null}
      </li>
    ));
    return spec.isOrder ? (
      <ol className={cx(getPrefixCls('ol'), spec.className)} style={spec.styles}>
        {children}
      </ol>
    ) : (
      <ul className={cx(getPrefixCls('ul'), spec.className)} style={spec.styles}>
        {children}
      </ul>
    );
  }
  return null;
}
