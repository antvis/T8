/* eslint-disable react/no-array-index-key */
import React from 'react';
import { IParagraph, DefaultCustomPhraseGeneric } from '@antv/text-schema';
import { Phrases } from '../phrases';
import { getPrefixCls } from '../utils/getPrefixCls';
import { CustomPhraseRender } from '../interface';

interface Props<P> {
  spec: IParagraph<P>;
  customPhraseRender?: CustomPhraseRender<P>;
}

export function Bullets<P extends DefaultCustomPhraseGeneric>({ spec, customPhraseRender }: Props<P>) {
  if (spec.type === 'bullets') {
    const children = spec.bullets?.map((bullet, index) => (
      <li className={getPrefixCls('li')} key={index}>
        <Phrases<P> spec={bullet.phrases} customPhraseRender={customPhraseRender} />
        {bullet?.subBullet ? <Bullets<P> spec={bullet?.subBullet} customPhraseRender={customPhraseRender} /> : null}
      </li>
    ));
    return spec.isOrder ? (
      <ol className={getPrefixCls('ol')}>{children}</ol>
    ) : (
      <ul className={getPrefixCls('ul')}>{children}</ul>
    );
  }
  return null;
}

Bullets.defaultProps = {
  customPhraseRender: null,
};
