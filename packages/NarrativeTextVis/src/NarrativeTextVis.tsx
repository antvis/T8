import React from 'react';
import {
  NarrativeTextSpec,
  HeadlineSpec,
  DefaultCustomPhraseGeneric,
  DefaultCustomBlockStructureGeneric,
} from '@antv/narrative-text-schema';
import { v4 } from 'uuid';
import { Container } from './styled';
import { Headline } from './paragraph';
import { Section } from './section';
import { WithPhraseProps, WithCustomBlockElement, ThemeProps } from './interface';
import { classnames as cx } from './utils/classnames';
import { getPrefixCls } from './utils/getPrefixCls';

export type NarrativeTextVisProps<
  S extends DefaultCustomBlockStructureGeneric = null,
  P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric,
> = ThemeProps &
  WithPhraseProps<P> &
  WithCustomBlockElement<S> & {
    spec: NarrativeTextSpec<S, P>;
  };

export function NarrativeTextVis<
  S extends DefaultCustomBlockStructureGeneric = null,
  P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric,
>({ spec, customBlockElementRender, size = 'normal', ...phraseProps }: NarrativeTextVisProps<S, P>) {
  const { headline, sections, styles, className } = spec;
  return (
    <Container size={size} className={cx(className, getPrefixCls('container'))} style={styles}>
      {headline ? <Headline<P> spec={headline as HeadlineSpec<P>} {...phraseProps} /> : null}
      {sections
        ? sections?.map((section) => (
            <Section<S, P>
              key={v4()}
              size={size}
              spec={section}
              customBlockElementRender={customBlockElementRender}
              {...phraseProps}
            />
          ))
        : null}
    </Container>
  );
}
