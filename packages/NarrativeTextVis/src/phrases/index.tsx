import React from 'react';
import { IPhrase, DefaultCustomPhraseGeneric } from '@antv/text-schema';
import { Phrase } from './Phrase';
import { WithPhraseProps } from '../interface';

type PhraseProps<P extends DefaultCustomPhraseGeneric> = WithPhraseProps<P> & {
  spec: IPhrase<P>[];
};

export function Phrases<P extends DefaultCustomPhraseGeneric>({
  spec,
  customPhraseRender,
  detailChartDisplayType,
}: PhraseProps<P>) {
  return (
    <>
      {spec?.map((phrase, index) => {
        const key = `${index}-${phrase.value}`;
        const defaultComp = <Phrase phrase={phrase} key={key} />;
        if (phrase.type === 'text') return defaultComp;
        if (phrase.type === 'custom') {
          return <Phrase.Custom<P> phrase={phrase} customPhraseRender={customPhraseRender} key={key} />;
        }
        if (phrase.type === 'entity') {
          if (phrase?.metadata?.entityType) {
            switch (phrase?.metadata?.entityType) {
              case 'trend_desc':
                return <Phrase.TrendDesc phrase={phrase} detailChartDisplayType={detailChartDisplayType} key={key} />;
              case 'delta_value':
                return <Phrase.DeltaValue phrase={phrase} key={key} />;
              case 'ratio_value':
                return <Phrase.RatioValue phrase={phrase} key={key} />;
              case 'dim_value':
                return <Phrase.DimValue phrase={phrase} key={key} />;
              default:
                return defaultComp;
            }
          }
        }
        return defaultComp;
      })}
    </>
  );
}

export { Phrase } from './Phrase';
