import React from 'react';
import { IPhrase, DefaultCustomPhraseGeneric } from '@antv/narrative-text-schema';
import { Phrase } from './Phrase';
import { WithPhraseProps } from '../interface';

type PhrasesProps<P extends DefaultCustomPhraseGeneric> = WithPhraseProps<P> & {
  spec: IPhrase<P>[];
};

export function Phrases<P extends DefaultCustomPhraseGeneric>({ spec, ...extraProps }: PhrasesProps<P>) {
  return (
    <>
      {spec?.map((phrase, index) => {
        const key = `${index}-${phrase.value}`;
        return <Phrase key={key} spec={phrase} {...extraProps} />;
      })}
    </>
  );
}

export { Phrase } from './Phrase';
