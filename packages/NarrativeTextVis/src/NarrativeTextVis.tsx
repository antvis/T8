import React from 'react';
import {
  ITextSpec,
  IHeadline,
  DefaultCustomPhraseGeneric,
  DefaultCustomBlockStructureGeneric,
} from '@antv/text-schema';
import { Headline } from './paragraph';
import { Section } from './section';
import { WithPhraseProps, WithCustomBlockElement } from './interface';

export type NarrativeTextVisProps<
  S extends DefaultCustomBlockStructureGeneric = null,
  P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric,
> = WithPhraseProps<P> &
  WithCustomBlockElement<S> & {
    spec: ITextSpec<S, P>;
  };

export function NarrativeTextVis<
  S extends DefaultCustomBlockStructureGeneric = null,
  P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric,
>({ spec, customBlockElementRender, ...phraseProps }: NarrativeTextVisProps<S, P>) {
  const { headline, sections, styles, className } = spec;
  return (
    <div className={className} style={styles}>
      {headline ? <Headline<P> spec={headline as IHeadline<P>} {...phraseProps} /> : null}
      {sections
        ? sections?.map((section, index) => (
            <Section<S, P>
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              spec={section}
              customBlockElementRender={customBlockElementRender}
              {...phraseProps}
            />
          ))
        : null}
    </div>
  );
}
