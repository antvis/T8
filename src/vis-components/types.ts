import {
  NarrativeTextSpec,
  SectionSpec,
  ParagraphSpec,
  PhraseSpec,
  HeadlineSpec,
  BulletItemSpec,
  ElementType,
} from '../schema';
import { SeedTokenOptions } from '../theme';
import { PluginManager } from '../plugin';

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

/**
 * Everything the render functions need, passed down explicitly.
 */
export type RenderContext = {
  theme: SeedTokenOptions;
  pluginManager: PluginManager;
  onEvent?: NarrativeEvents['onEvent'];
  /**
   * Returns the element of an identical paragraph from the previous render, or renders a new one.
   */
  reuse?: (spec: ParagraphSpec, render: () => HTMLElement | null) => HTMLElement | null;
};

/**
 * Paragraph elements of the previous render, keyed by the serialized paragraph spec.
 */
export type ParagraphCache = Map<string, HTMLElement[]>;

/**
 * Create `click` / `mouseenter` / `mouseleave` handlers which emit `<type>:<event>` with the spec.
 */
export const getEventHandlers = (
  onEvent: NarrativeEvents['onEvent'],
  type: ElementType,
  spec: NarrativeTextSpec | PhraseSpec | NormalParagraphSpec | SectionSpec,
) => ({
  onClick: () => onEvent?.(`${type}:click`, spec),
  onMouseEnter: () => onEvent?.(`${type}:mouseenter`, spec),
  onMouseLeave: () => onEvent?.(`${type}:mouseleave`, spec),
});
