import React from 'react';
import { IParagraph } from '@antv/text-schema';
import { map } from 'lodash';
import { Phrase } from '../phrases';
import { getPrefixCls } from '../utils/getPrefixCls';

interface Props {
  spec: IParagraph;
}

export const Bullets: React.FC<Props> = ({ spec }) => {
  if (spec.type === 'bullets') {
    const children = map(spec.bullets, (bullet, index) => (
      <li className={getPrefixCls('li')} key={index}>
        <Phrase spec={bullet.phrases} />
      </li>
    ));
    return spec.isOrder ? (
      <ol className={getPrefixCls('ol')}>{children}</ol>
    ) : (
      <ul className={getPrefixCls('ul')}>{children}</ul>
    );
  }
  return null;
};
