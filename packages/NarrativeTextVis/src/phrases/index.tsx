import React from 'react';
import { PhraseSpec, DefaultCustomPhraseGeneric } from '@antv/narrative-text-schema';
import { Phrase } from './Phrase';
import { WithPhraseProps, ThemeProps } from '../interface';

type PhrasesProps<P extends DefaultCustomPhraseGeneric> = ThemeProps &
  WithPhraseProps<P> & {
    spec: PhraseSpec<P>[];
  };

export function Phrases<P extends DefaultCustomPhraseGeneric>({
  spec,
  size = 'normal',
  ...extraProps
}: PhrasesProps<P>) {
  return (
    <>
      {spec?.map((phrase, index) => {
        const key = `${index}-${phrase.value}`;
        return <Phrase key={key} spec={phrase} size={size} {...extraProps} />;
      })}
    </>
  );
}

export { Phrase } from './Phrase';
