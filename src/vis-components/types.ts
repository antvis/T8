import { NarrativeTextSpec, SectionSpec, ParagraphSpec, PhraseSpec, HeadlineSpec, BulletItemSpec } from '../schema';

export enum EventType {
  ON_CLICK_PHRASE = 'clickphrase',
  ON_MOUSE_ENTER_PHRASE = 'mouseenterphrase',
  ON_MOUSE_LEAVE_PHRASE = 'mouseleavephrase',
  ON_CLICK_PARAGRAPH = 'clickparagraph',
  ON_MOUSE_ENTER_PARAGRAPH = 'mouseenterparagraph',
  ON_MOUSE_LEAVE_PARAGRAPH = 'mouseleaveparagraph',
  ON_CLICK_SECTION = 'clicksection',
  ON_MOUSE_ENTER_SECTION = 'mouseentersection',
  ON_MOUSE_LEAVE_SECTION = 'mouseleavesection',
  ON_CLICK_NARRATIVE = 'clicknarrative',
  ON_MOUSE_ENTER_NARRATIVE = 'mouseenternarrative',
  ON_MOUSE_LEAVE_NARRATIVE = 'mouseleavenarrative',
  // onCopySuccess = 'copysuccess',
  // onCopyFailure = 'copyfailure',
}

type NormalParagraphSpec = HeadlineSpec | ParagraphSpec | BulletItemSpec;

export type NarrativeEvents = Partial<{
  onClick: (eventType: EventType, spec: NarrativeTextSpec | PhraseSpec | NormalParagraphSpec | SectionSpec) => void;
  onMouseEnter: (
    eventType: EventType,
    spec: NarrativeTextSpec | PhraseSpec | NormalParagraphSpec | SectionSpec,
  ) => void;
  onMouseLeave: (
    eventType: EventType,
    spec: NarrativeTextSpec | PhraseSpec | NormalParagraphSpec | SectionSpec,
  ) => void;
  onCopySuccess: (e?: ClipboardEvent) => void;
  onCopyFailure: (e?: ClipboardEvent) => void;
}>;

// Define tooltip placement.
export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';
