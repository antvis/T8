import React from 'react';
import { PhraseSpec } from '@antv/narrative-text-schema';
import { ThemeProps, ExtensionProps } from '../interface';
import { usePluginCreator } from '../chore/plugin';
import { Phrase } from './Phrase';

type PhrasesProps = ThemeProps &
  ExtensionProps & {
    spec: PhraseSpec[];
  };

export function Phrases({ spec, size = 'normal', pluginManager, plugins }: PhrasesProps) {
  const innerPluginManager = usePluginCreator(pluginManager, plugins);
  return (
    <>
      {spec?.map((phrase, index) => {
        const key = `${index}-${phrase.value}`;
        return <Phrase key={key} size={size} spec={phrase} pluginManager={innerPluginManager} />;
      })}
    </>
  );
}

export { Phrase } from './Phrase';
