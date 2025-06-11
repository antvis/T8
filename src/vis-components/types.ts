import { ComponentChildren } from 'preact';
import { NarrativeTextSpec, SectionSpec, ParagraphSpec, PhraseSpec, HeadlineSpec, BulletItemSpec } from '../schema';

export type PhraseEvents = Partial<{
  onClickPhrase: (spec: PhraseSpec) => void;
  onMouseEnterPhrase: (spec: PhraseSpec) => void;
  onMouseLeavePhrase: (spec: PhraseSpec) => void;
}>;

type NormalParagraphSpec = HeadlineSpec | ParagraphSpec | BulletItemSpec;
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

// Tooltip props.
export interface TooltipProps {
  /** Tooltip content */
  title: HTMLElement | string | number;
  /** Whether tooltip is visible */
  visible?: boolean;
  /** Default visibility */
  defaultVisible?: boolean;
  /** Child elements */
  children: ComponentChildren;
  /** Placement */
  placement?: TooltipPlacement;
  /** Trigger method */
  trigger?: 'hover' | 'click';
  /** Custom style on tooltip div*/
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: Record<string, any>;
  /** className */
  className?: string;
  /** Show arrow */
  showArrow?: boolean;
  /** Callback when visibility changes */
  onVisibleChange?: (visible: boolean) => void;
  /** Offset distance */
  offset?: number;
  /** Mouse enter delay (ms) */
  mouseEnterDelay?: number;
  /** Mouse leave delay (ms) */
  mouseLeaveDelay?: number;
}
