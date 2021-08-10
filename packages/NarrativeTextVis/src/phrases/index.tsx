import React from 'react';
import { map } from 'lodash';
import { IPhrase } from '@antv/text-schema';
import { DetailChartDisplayType } from '../interface';

import { Default } from './Default';
import { DeltaValue } from './DeltaValue';
import { RatioValue } from './RatioValue';
import { DimValue } from './DimValue';
import { TrendDesc } from './TrendDesc';

interface Props {
  spec: IPhrase[];
  detailChartDisplayType: DetailChartDisplayType;
}

export const Phrases: React.FC<Props> = ({ spec, detailChartDisplayType }) => (
  <>
    {map(spec, (phrase, index) => {
      const defaultComp = <Default phrase={phrase} key={`${index}-${phrase.value}`} />;
      if (phrase.type === 'text') return defaultComp;
      if (phrase?.metadata?.entityType) {
        switch (phrase?.metadata?.entityType) {
          case 'trend_desc':
            return (
              <TrendDesc
                phrase={phrase}
                detailChartDisplayType={detailChartDisplayType}
                key={`${index}-${phrase.value}`}
              />
            );
          case 'delta_value':
            return <DeltaValue phrase={phrase} key={`${index}-${phrase.value}`} />;
          case 'ratio_value':
            return <RatioValue phrase={phrase} key={`${index}-${phrase.value}`} />;
          case 'dim_value':
            return <DimValue phrase={phrase} key={`${index}-${phrase.value}`} />;
          default:
            return defaultComp;
        }
      }
      return defaultComp;
    })}
  </>
);
