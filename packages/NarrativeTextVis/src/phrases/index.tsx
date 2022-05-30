import React from 'react';
import { PhraseSpec } from '@antv/narrative-text-schema';
import { ThemeProps, ExtensionProps } from '../interface';
import { Phrase } from './Phrase';
import { presetPluginManager } from '../chore/plugin';

type PhrasesProps = ThemeProps &
  ExtensionProps & {
    spec: PhraseSpec[];
  };

export function Phrases({ spec, size = 'normal', pluginManager = presetPluginManager }: PhrasesProps) {
  return (
    <>
      {spec?.map((phrase, index) => {
        const key = `${index}-${phrase.value}`;
        return <Phrase key={key} size={size} spec={phrase} pluginManager={pluginManager} />;
      })}
    </>
  );
}

export { Phrase } from './Phrase';
