import React from 'react';
import { map } from 'lodash';
import { IPhrase } from '@antv/text-schema';
import { DetailChartDisplayType } from '../interface';
import { Phrase } from './Phrase';

interface Props {
  spec: IPhrase[];
  detailChartDisplayType: DetailChartDisplayType;
}

export const Phrases: React.FC<Props> = ({ spec, detailChartDisplayType }) => (
  <>
    {map(spec, (phrase, index) => {
      const defaultComp = <Phrase phrase={phrase} key={`${index}-${phrase.value}`} />;
      if (phrase.type === 'text') return defaultComp;
      if (phrase?.metadata?.entityType) {
        switch (phrase?.metadata?.entityType) {
          case 'trend_desc':
            return (
              <Phrase.TrendDesc
                phrase={phrase}
                detailChartDisplayType={detailChartDisplayType}
                key={`${index}-${phrase.value}`}
              />
            );
          case 'delta_value':
            return <Phrase.DeltaValue phrase={phrase} key={`${index}-${phrase.value}`} />;
          case 'ratio_value':
            return <Phrase.RatioValue phrase={phrase} key={`${index}-${phrase.value}`} />;
          case 'dim_value':
            return <Phrase.DimValue phrase={phrase} key={`${index}-${phrase.value}`} />;
          default:
            return defaultComp;
        }
      }
      return defaultComp;
    })}
  </>
);

export { Phrase } from './Phrase';
