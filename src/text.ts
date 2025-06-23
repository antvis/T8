import { h, render as preactRender } from 'preact';
import { NarrativeTextSpec } from './schema';
import { NarrativeTextVis } from './vis-components';
import { getThemeSeedToken, SeedTokenOptions } from './theme';

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

  constructor(container: string | HTMLElement) {
    if (typeof container === 'string') {
      this.container = document.querySelector(container) as HTMLElement;
    } else {
      this.container = container;
    }
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
      }),
      container,
    );

    // Return unmount function.
    return () => {
      preactRender(null, container as HTMLElement);
    };
  }
}
