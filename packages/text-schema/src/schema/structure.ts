import { IPhrase, DefaultCustomPhraseGeneric } from './phrase';
import { IParagraph } from './paragraph';

export interface ITextSpec<P = DefaultCustomPhraseGeneric> {
  headline?: IHeadline<P>;
  sections?: ISection<P>[];
  // TODO 可扩展内容交互
}

export interface IHeadline<P = DefaultCustomPhraseGeneric> {
  type: 'headline';
  phrases: IPhrase<P>[];
}

export interface ISection<P = DefaultCustomPhraseGeneric> {
  paragraphs?: IParagraph<P>[];
}

/**
 * @deprecated
 * only used for export json-schema generator
 * https://github.com/vega/ts-json-schema-generator/issues/35
 */
export type ITextSpecGenerator = ITextSpec;
