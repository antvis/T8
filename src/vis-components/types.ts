import { NarrativeTextSpec, SectionSpec, ParagraphSpec, PhraseSpec, HeadlineSpec, BulletItemSpec } from '../schema';

export enum Events {
  onClickPhrase = 'clickphrase',
  onMouseEnterPhrase = 'mouseenterphrase',
  onMouseLeavePhrase = 'mouseleavephrase',
  onClickParagraph = 'clickparagraph',
  onMouseEnterParagraph = 'mouseenterparagraph',
  onMouseLeaveParagraph = 'mouseleaveparagraph',
  onClickSection = 'clicksection',
  onMouseEnterSection = 'mouseentersection',
  onMouseLeaveSection = 'mouseleavesection',
  onClickNarrative = 'clicknarrative',
  onMouseEnterNarrative = 'mouseenternarrative',
  onMouseLeaveNarrative = 'mouseleavenarrative',
  // onCopySuccess = 'copysuccess',
  // onCopyFailure = 'copyfailure',
}

type NormalParagraphSpec = HeadlineSpec | ParagraphSpec | BulletItemSpec;

export type PhraseEvents = Partial<{
  onClickPhrase: (spec: PhraseSpec) => void;
  onMouseEnterPhrase: (spec: PhraseSpec) => void;
  onMouseLeavePhrase: (spec: PhraseSpec) => void;
}>;

export type ParagraphEvents = PhraseEvents &
  Partial<{
    onClickParagraph: (spec: NormalParagraphSpec) => void;
    onMouseEnterParagraph: (spec: NormalParagraphSpec) => void;
    onMouseLeaveParagraph: (spec: NormalParagraphSpec) => void;
  }>;

export type SectionEvents = ParagraphEvents &
  Partial<{
    onClickSection: (spec: SectionSpec) => void;
    onMouseEnterSection: (spec: SectionSpec) => void;
    onMouseLeaveSection: (spec: SectionSpec) => void;
  }>;

export type NarrativeEvents = SectionEvents &
  Partial<{
    onClickNarrative: (spec: NarrativeTextSpec) => void;
    onMouseEnterNarrative: (spec: NarrativeTextSpec) => void;
    onMouseLeaveNarrative: (spec: NarrativeTextSpec) => void;
    onCopySuccess: (e?: ClipboardEvent) => void;
    onCopyFailure: (e?: ClipboardEvent) => void;
  }>;

// Define tooltip placement.
export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';
