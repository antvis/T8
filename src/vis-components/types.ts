import { NarrativeTextSpec, SectionSpec, ParagraphSpec, PhraseSpec, HeadlineSpec, BulletItemSpec } from '../schema';

export enum EventType {
  ON_PHRASE_CLICK = 'phrase:click',
  ON_PHRASE_MOUSE_ENTER = 'phrase:mouseenter',
  ON_PHRASE_MOUSE_LEAVE = 'phrase:mouseleave',
  ON_PARAGRAPH_CLICK = 'paragraph:click',
  ON_PARAGRAPH_MOUSE_ENTER = 'paragraph:mouseenter',
  ON_PARAGRAPH_MOUSE_LEAVE = 'paragraph:mouseleave',
  ON_SECTION_CLICK = 'section:click',
  ON_SECTION_MOUSE_ENTER = 'section:mouseenter',
  ON_SECTION_MOUSE_LEAVE = 'section:mouseleave',
  ON_NARRATIVE_CLICK = 'narrative:click',
  ON_NARRATIVE_MOUSE_ENTER = 'narrative:mouseenter',
  ON_NARRATIVE_MOUSE_LEAVE = 'narrative:mouseleave',
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
