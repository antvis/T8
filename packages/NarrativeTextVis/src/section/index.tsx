import React from 'react';
import { ISection, DefaultCustomPhraseGeneric, DefaultCustomBlockStructureGeneric } from '@antv/text-schema';
import { v4 } from 'uuid';
import { classnames as cx } from '../utils/classnames';
import { getPrefixCls } from '../utils/getPrefixCls';
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
    <section className={cx(getPrefixCls('section'), spec.className)} style={spec.styles}>
      {'paragraphs' in spec
        ? spec?.paragraphs?.map((p) => (
            <Paragraph<S, P> key={v4()} spec={p} customBlockElementRender={customBlockElementRender} {...phraseProps} />
          ))
        : customBlockElementRender
        ? customBlockElementRender(spec as S)
        : null}
    </section>
  );
}
