import { CommonProps, DefaultCustomBlockStructureGeneric, DefaultCustomPhraseGeneric } from './common';
import { IPhrase } from './phrase';
import { IParagraph } from './paragraph';

export type INarrativeTextSpec<
  S extends DefaultCustomBlockStructureGeneric = null,
  P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric,
> = CommonProps & {
  headline?: IHeadline<P>;
  sections?: ISection<S, P>[];
  // TODO 可扩展内容交互
};

export type IHeadline<P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric> = CommonProps & {
  type: 'headline';
  phrases: IPhrase<P>[];
};

type StandardSection<
  S extends DefaultCustomBlockStructureGeneric = null,
  P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric,
> = {
  paragraphs?: IParagraph<S, P>[];
};

export type ISection<
  S extends DefaultCustomBlockStructureGeneric = null,
  P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric,
> = (StandardSection<S, P> | S) & CommonProps;

/**
 * @deprecated
 * only used for export json-schema generator
 * https://github.com/vega/ts-json-schema-generator/issues/35
 */
export type ITextSpecGenerator = INarrativeTextSpec;
