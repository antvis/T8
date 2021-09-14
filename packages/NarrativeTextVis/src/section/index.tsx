import React from 'react';
import { ISection, DefaultCustomPhraseGeneric } from '@antv/text-schema';
import { WithPhraseProps } from '../interface';
import { Paragraph } from '../paragraph';

type SectionProps<P extends DefaultCustomPhraseGeneric> = WithPhraseProps<P> & {
  spec: ISection<P>;
};

export function Section<P extends DefaultCustomPhraseGeneric>({ spec, ...phraseProps }: SectionProps<P>) {
  return (
    <div style={spec.styles}>
      {spec?.paragraphs?.map((p, pid) => (
        // eslint-disable-next-line react/no-array-index-key
        <Paragraph<P> spec={p} key={pid} {...phraseProps} />
      ))}
    </div>
  );
}
