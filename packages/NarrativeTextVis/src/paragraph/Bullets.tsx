/* eslint-disable react/no-array-index-key */
import React from 'react';
import { IParagraph, DefaultCustomPhraseGeneric } from '@antv/text-schema';
import { Phrases } from '../phrases';
import { getPrefixCls } from '../utils/getPrefixCls';
import { WithPhraseProps } from '../interface';

type BulletsProps<P extends DefaultCustomPhraseGeneric> = WithPhraseProps<P> & {
  spec: IParagraph<null, P>;
};

export function Bullets<P extends DefaultCustomPhraseGeneric>({ spec, customPhraseRender }: BulletsProps<P>) {
  if (spec.type === 'bullets') {
    const children = spec.bullets?.map((bullet, index) => (
      <li className={getPrefixCls('li')} key={index} style={spec.styles}>
        <Phrases<P> spec={bullet.phrases} customPhraseRender={customPhraseRender} />
        {bullet?.subBullet ? <Bullets<P> spec={bullet?.subBullet} customPhraseRender={customPhraseRender} /> : null}
      </li>
    ));
    return spec.isOrder ? (
      <ol className={getPrefixCls('ol')} style={spec.styles}>
        {children}
      </ol>
    ) : (
      <ul className={getPrefixCls('ul')} style={spec.styles}>
        {children}
      </ul>
    );
  }
  return null;
}
