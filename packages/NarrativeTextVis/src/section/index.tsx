import React from 'react';
import {
  SectionSpec,
  DefaultCustomPhraseGeneric,
  DefaultCustomBlockStructureGeneric,
} from '@antv/narrative-text-schema';
import { v4 } from 'uuid';
import { classnames as cx } from '../utils/classnames';
import { getPrefixCls } from '../utils/getPrefixCls';
import { WithPhraseProps, WithCustomBlockElement, ThemeProps } from '../interface';
import { Container } from '../styled';
import { Paragraph } from '../paragraph';

type SectionProps<
  S extends DefaultCustomBlockStructureGeneric = null,
  P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric,
> = ThemeProps &
  WithPhraseProps<P> &
  WithCustomBlockElement<S> & {
    spec: SectionSpec<S, P>;
  };

export function Section<
  S extends DefaultCustomBlockStructureGeneric = null,
  P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric,
>({ spec, customBlockElementRender, size = 'normal', ...phraseProps }: SectionProps<S, P>) {
  return (
    <Container size={size} as="section" className={cx(getPrefixCls('section'), spec.className)} style={spec.styles}>
      {'paragraphs' in spec
        ? spec?.paragraphs?.map((p) => (
            <Paragraph<S, P>
              key={v4()}
              spec={p}
              size={size}
              customBlockElementRender={customBlockElementRender}
              {...phraseProps}
            />
          ))
        : customBlockElementRender
        ? customBlockElementRender(spec as S)
        : null}
    </Container>
  );
}
