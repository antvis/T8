import React from 'react';
import { IParagraph } from '@antv/text-schema';
import { map } from 'lodash';
import { Phrases } from '../phrases';
import { getPrefixCls } from '../utils/getPrefixCls';
import { DetailChartDisplayType } from '../interface';

interface Props {
  spec: IParagraph;
  detailChartDisplayType: DetailChartDisplayType;
}

export const Bullets: React.FC<Props> = ({ spec, detailChartDisplayType }) => {
  if (spec.type === 'bullets') {
    const children = map(spec.bullets, (bullet, index) => (
      <li className={getPrefixCls('li')} key={index}>
        <Phrases spec={bullet.phrases} detailChartDisplayType={detailChartDisplayType} />
        {bullet?.bullets ? (
          <Bullets
            spec={{
              type: 'bullets',
              isOrder: spec.isOrder,
              bullets: bullet?.bullets,
            }}
            detailChartDisplayType={detailChartDisplayType}
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
};
