import React from 'react';
import { ISection, DefaultCustomPhraseGeneric, DefaultCustomBlockStructureGeneric } from '@antv/text-schema';
import { WithPhraseProps, WithCustomBlockElement } from '../interface';
import { Paragraph } from '../paragraph';

type SectionProps<
  S extends DefaultCustomBlockStructureGeneric = null,
  P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric,
> = WithPhraseProps<P> &
  WithCustomBlockElement<S> & {
    spec: ISection<S, P>;
  };

export function Section<
  S extends DefaultCustomBlockStructureGeneric = null,
  P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric,
>({ spec, customBlockElementRender, ...phraseProps }: SectionProps<S, P>) {
  return (
    <div className={spec.className} style={spec.styles}>
      {spec?.paragraphs
        ? spec?.paragraphs.map((p, pid) => (
            // eslint-disable-next-line react/no-array-index-key
            <Paragraph<S, P> key={pid} spec={p} customBlockElementRender={customBlockElementRender} {...phraseProps} />
          ))
        : customBlockElementRender
        ? customBlockElementRender(spec as S)
        : null}
    </div>
  );
}
