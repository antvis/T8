import React from 'react';
import { IHeadline } from '@antv/text-schema';
import { Phrases } from '../phrases';
import { getPrefixCls } from '../utils/getPrefixCls';

interface Props {
  spec: IHeadline;
}

export const Headline: React.FC<Props> = ({ spec }) => {
  if (spec && spec.type === 'headline') {
    return (
      <h1 className={getPrefixCls('headline')}>
        <Phrases spec={spec.phrases} detailChartDisplayType={null} />
      </h1>
    );
  }
  return null;
};
