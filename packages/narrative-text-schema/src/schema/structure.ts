import { CommonProps, DefaultCustomBlockStructureGeneric, DefaultCustomPhraseGeneric } from './common';
import { PhraseSpec } from './phrase';
import { ParagraphSpec } from './paragraph';

export type NarrativeTextSpec<
  S extends DefaultCustomBlockStructureGeneric = null,
  P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric,
> = CommonProps & {
  headline?: HeadlineSpec<P>;
  sections?: SectionSpec<S, P>[];
  // TODO 可扩展内容交互
};

export type HeadlineSpec<P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric> = CommonProps & {
  type: 'headline';
  phrases: PhraseSpec<P>[];
};

type StandardSectionSpec<
  S extends DefaultCustomBlockStructureGeneric = null,
  P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric,
> = {
  paragraphs?: ParagraphSpec<S, P>[];
};

export type SectionSpec<
  S extends DefaultCustomBlockStructureGeneric = null,
  P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric,
> = (StandardSectionSpec<S, P> | S) & CommonProps;

/**
 * @deprecated
 * only used for export json-schema generator
 * https://github.com/vega/ts-json-schema-generator/issues/35
 */
export type TextSpecGenerator = NarrativeTextSpec;
