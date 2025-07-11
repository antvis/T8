import { CommonProps, CustomBlockElement } from './common';
import { PhraseSpec } from './phrase';
import { ParagraphSpec } from './paragraph';

export type NarrativeTextSpec = CommonProps & {
  headline?: HeadlineSpec;
  sections?: SectionSpec[];
};

export type HeadlineSpec = CommonProps & {
  type: 'headline';
  phrases: PhraseSpec[];
};

export type StandardSectionSpec = {
  paragraphs?: ParagraphSpec[];
};

export type SectionSpec = (StandardSectionSpec | CustomBlockElement) & CommonProps;
