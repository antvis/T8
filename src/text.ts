import { NarrativeTextSpec } from './schema';
import { renderNarrativeText, ParagraphCache } from './vis-components';
import { getThemeSeedToken, SeedTokenOptions } from './theme';
import { PluginManager, PluginType, presetPlugins } from './plugin';
import EE from '@antv/event-emitter';
import { parseSyntax } from './parser';

/**
 * Text component for rendering narrative text visualizations.
 *
 * Usage:
 * ```javascript
 * const text = new Text('#container');
 * text.theme('light').render(`
 *   # Sales Report
 *   Total sales are [¥1,234,567](metric_value).
 * `);
 * ```
 */
export class Text extends EE {
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
   * Plugin manager for the text visualization.
   */
  private pluginManager: PluginManager;
  /**
   * Paragraphs rendered last time, reused while the theme and plugins stay the same.
   */
  private cache: ParagraphCache = new Map();

  constructor(container: string | HTMLElement) {
    super();
    this.container = typeof container === 'string' ? (document.querySelector(container) as HTMLElement) : container;

    this.pluginManager = new PluginManager(presetPlugins);
  }

  /**
   * Set the theme for the narrative text visualization.
   * @param theme - The theme configuration for the text visualization.
   * @returns The Text instance for method chaining.
   */
  theme(theme: 'dark' | 'light', seedToken?: Partial<SeedTokenOptions>) {
    this.themeSeedToken = getThemeSeedToken(theme, seedToken);
    this.cache.clear();
    return this;
  }

  /**
   * Register a plugin for the text visualization.
   * @param plugin - The plugin to register.
   * @returns The Text instance for method chaining.
   */
  registerPlugin(plugin: PluginType) {
    this.pluginManager.register(plugin);
    this.cache.clear();
    return this;
  }

  /**
   * Render the narrative text visualization.
   * Accepts a T8 syntax string for rendering.
   * @param t8Syntax - T8 syntax string to render.
   * @returns A function to unmount the component.
   */
  render(t8Syntax?: string) {
    const container = this.container;
    let spec: NarrativeTextSpec | undefined;

    // Parse T8 syntax if provided
    if (t8Syntax) {
      try {
        // Parse T8 syntax string with error tolerance
        spec = parseSyntax(t8Syntax);
      } catch (error: unknown) {
        // Log error but continue with empty spec for error tolerance
        console.error(`T8 Syntax parsing failed: ${error instanceof Error ? error.message : String(error)}`);
        spec = { sections: [] };
      }
    } else {
      // Use stored spec if no content provided
      spec = this.spec;
    }

    // Replace the content of the container with the rendered narrative text.
    container.innerHTML = '';
    container.appendChild(
      renderNarrativeText(spec, {
        pluginManager: this.pluginManager,
        themeSeedToken: this.themeSeedToken,
        onEvent: this.emit.bind(this),
        cache: this.cache,
      }),
    );

    // Return unmount function.
    return () => {
      container.innerHTML = '';
    };
  }

  /**
   * Clear the visualization.
   */
  clear() {
    this.unmount();
  }

  /**
   * Unmount the component.
   */
  unmount() {
    this.container.innerHTML = '';
  }
}
