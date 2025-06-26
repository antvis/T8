import {
  NarrativeTextSpec,
  SectionSpec,
  ParagraphSpec,
  PhraseSpec,
  HeadlineSpec,
  BulletItemSpec,
  ElementType,
} from '../schema';

type NormalParagraphSpec = HeadlineSpec | ParagraphSpec | BulletItemSpec;

/**
 * ElementEventMap is a type that maps an element type to an event type.
 * It is used to define the events that can be triggered on an element.
 * @example
 * ```ts
 * type ElementEventMap<ElementType, 'click'> = 'section:click' | 'paragraph:click' | 'phrase:click' | 'narrative:click';
 * ```
 */
type ElementEventMap<
  K extends ElementType = ElementType,
  V extends keyof HTMLElementEventMap = keyof HTMLElementEventMap,
> = `${K}:${V}`;

/**
 * NarrativeEvents is a type that maps an element type to an event type.
 * It is used to define the events that can be triggered on an element.
 * @example
 * ```ts
 * const events: NarrativeEvents = {
 *   onMouseEnter: (eventType: 'section:mouseenter', spec: SectionSpec) => void,
 *   onMouseLeave: (eventType: 'section:mouseleave', spec: SectionSpec) => void,
 * };
 * ```
 */
export type NarrativeEvents = Partial<{
  onEvent: (
    eventType: ElementEventMap,
    spec: NarrativeTextSpec | PhraseSpec | NormalParagraphSpec | SectionSpec,
  ) => void;
}>;
