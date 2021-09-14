import React from 'react';
import { ITextSpec, DefaultCustomPhraseGeneric } from '@antv/text-schema';
import { Headline } from './paragraph';
import { Section } from './section';
import { WithPhraseProps } from './interface';

export type NarrativeTextVisProps<P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric> =
  WithPhraseProps<P> & {
    spec: ITextSpec<P>;
  };

export function NarrativeTextVis<P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric>({
  spec,
  ...phraseProps
}: NarrativeTextVisProps<P>) {
  const { headline, sections } = spec;
  return (
    <div>
      {headline ? <Headline spec={headline} {...phraseProps} /> : null}
      {/* eslint-disable-next-line react/no-array-index-key */}
      {sections ? sections?.map((section, index) => <Section key={index} spec={section} {...phraseProps} />) : null}
    </div>
  );
}
