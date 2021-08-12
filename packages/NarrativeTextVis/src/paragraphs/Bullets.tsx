import React from 'react';
import { IParagraph, DefaultCustomPhraseGeneric } from '@antv/text-schema';
import { map } from 'lodash';
import { Phrases } from '../phrases';
import { getPrefixCls } from '../utils/getPrefixCls';
import { CustomPhraseRender } from '../interface';

interface Props<P> {
  spec: IParagraph<P>;
  customPhraseRender?: CustomPhraseRender<P>;
}

export function Bullets<P extends DefaultCustomPhraseGeneric>({ spec, customPhraseRender }: Props<P>) {
  if (spec.type === 'bullets') {
    const children = map(spec.bullets, (bullet, index) => (
      <li className={getPrefixCls('li')} key={index}>
        <Phrases<P> spec={bullet.phrases} customPhraseRender={customPhraseRender} />
        {bullet?.bullets ? (
          <Bullets<P>
            spec={{
              type: 'bullets',
              isOrder: spec.isOrder,
              bullets: bullet?.bullets,
            }}
            customPhraseRender={customPhraseRender}
          />
        ) : null}
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
