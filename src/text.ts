import { h, render as preactRender } from 'preact';
import { NarrativeTextSpec } from './schema';
import { Events, NarrativeTextVis } from './vis-components';
import { getThemeSeedToken, SeedTokenOptions } from './theme';
import { EventEmitter } from './utils/eventEmitter';

/**
 * Text component for rendering narrative text visualizations.
 *
 * Usage:
 * ```javascript
 * const text = new Text('#container');
 * text.schema(spec).theme(theme).render();
 * ```
 */
export class Text {
  /**
   * Container for the text visualization.
   */
  container: HTMLElement;
  /**
   * Specification for the narrative text visualization.
   */
  private spec: NarrativeTextSpec;
  /**
   * Theme configuration for the text visualization.
   */
  private themeSeedToken: SeedTokenOptions;
  /**
   * Event emitter for the text visualization.
   */
  private eventEmitter: EventEmitter<Events>;

  constructor(container: string | HTMLElement) {
    this.container = typeof container === 'string' ? (document.querySelector(container) as HTMLElement) : container;
    this.eventEmitter = new EventEmitter();
  }

  /**
   * Register a listener for an event.
   * @param event - The event to listen for.
   * @param listener - The listener function.
   * @returns The Text instance for method chaining.
   */
  on(event: Events, listener: (...args: unknown[]) => void) {
    this.eventEmitter.on(event, listener);
    return this;
  }

  /**
   * Remove a listener for an event.
   * @param event - The event to remove the listener for.
   * @param listener - The listener function to remove.
   * @returns The Text instance for method chaining.
   */
  off(event: Events, listener: (...args: unknown[]) => void) {
    this.eventEmitter.off(event, listener);
    return this;
  }

  /**
   * Register a listener for an event that will be called only once.
   * @param event - The event to listen for.
   * @param listener - The listener function.
   * @returns The Text instance for method chaining.
   */
  once(event: Events, listener: (...args: unknown[]) => void) {
    this.eventEmitter.once(event, listener);
    return this;
  }

  /**
   * Remove all listeners for an event.
   * @param event - The event to remove the listeners for.
   * @returns The Text instance for method chaining.
   */
  removeAllListeners(events?: Events[]) {
    this.eventEmitter.removeAllListeners(events);
    return this;
  }

  /**
   * Set the schema for the narrative text visualization.
   * @param spec - The specification object containing narrative text details.
   * @returns The Text instance for method chaining.
   */
  schema(spec: NarrativeTextSpec) {
    this.spec = spec;
    return this;
  }

  /**
   * Set the theme for the narrative text visualization.
   * @param theme - The theme configuration for the text visualization.
   * @returns The Text instance for method chaining.
   */
  theme(theme: 'dark' | 'light', seedToken?: Partial<SeedTokenOptions>) {
    this.themeSeedToken = getThemeSeedToken(theme, seedToken);
    return this;
  }

  /**
   * Render the narrative text visualization.
   * @returns A function to unmount the component.
   */
  render() {
    const container = this.container;
    const spec = this.spec;

    // Render the component.
    // We use `preact` to code the `NarrativeTextVis` components.
    preactRender(
      h(NarrativeTextVis, {
        spec,
        themeSeedToken: this.themeSeedToken,
        onClickNarrative: (spec) => this.eventEmitter.emit(Events.onClickNarrative, spec),
        onMouseEnterNarrative: (spec) => this.eventEmitter.emit(Events.onMouseEnterNarrative, spec),
        onMouseLeaveNarrative: (spec) => this.eventEmitter.emit(Events.onMouseLeaveNarrative, spec),
        onClickParagraph: (spec) => this.eventEmitter.emit(Events.onClickParagraph, spec),
        onMouseEnterParagraph: (spec) => this.eventEmitter.emit(Events.onMouseEnterParagraph, spec),
        onMouseLeaveParagraph: (spec) => this.eventEmitter.emit(Events.onMouseLeaveParagraph, spec),
        onClickSection: (spec) => this.eventEmitter.emit(Events.onClickSection, spec),
        onMouseEnterSection: (spec) => this.eventEmitter.emit(Events.onMouseEnterSection, spec),
        onMouseLeaveSection: (spec) => this.eventEmitter.emit(Events.onMouseLeaveSection, spec),
        onClickPhrase: (spec) => this.eventEmitter.emit(Events.onClickPhrase, spec),
        onMouseEnterPhrase: (spec) => this.eventEmitter.emit(Events.onMouseEnterPhrase, spec),
        onMouseLeavePhrase: (spec) => this.eventEmitter.emit(Events.onMouseLeavePhrase, spec),
      }),
      container,
    );

    // Return unmount function.
    return () => {
      preactRender(null, container as HTMLElement);
    };
  }
}
