import { h, render as preactRender } from 'preact';
import { NarrativeTextSpec } from './schema';
import { NarrativeTextVis } from './vis-components';
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
    return this;
  }

  /**
   * Register a plugin for the text visualization.
   * @param plugin - The plugin to register.
   * @returns The Text instance for method chaining.
   */
  registerPlugin(plugin: PluginType) {
    this.pluginManager.register(plugin);
    return this;
  }

  /**
   * Render the narrative text visualization.
   * Accepts either a T8 syntax string or a NarrativeTextSpec object.
   * @param content - T8 syntax string or NarrativeTextSpec object to render.
   * @returns A function to unmount the component.
   */
  render(content?: string | NarrativeTextSpec) {
    const container = this.container;
    let spec: NarrativeTextSpec | undefined;

    // Parse content if provided
    if (content) {
      if (typeof content === 'string') {
        try {
          // Parse T8 syntax string with error tolerance
          spec = parseSyntax(content);
        } catch (error: unknown) {
          // Log error but continue with empty spec for error tolerance
          console.error(`T8 Syntax parsing failed: ${error instanceof Error ? error.message : String(error)}`);
          spec = { sections: [] };
        }
      } else {
        // Use provided spec directly
        spec = content;
      }
    } else {
      // Use stored spec if no content provided
      spec = this.spec;
    }

    // Render the component.
    // We use `preact` to code the `NarrativeTextVis` components.
    preactRender(
      h(NarrativeTextVis, {
        spec,
        pluginManager: this.pluginManager,
        themeSeedToken: this.themeSeedToken,
        onEvent: this.emit.bind(this),
      }),
      container,
    );

    // Return unmount function.
    return () => {
      preactRender(null, container as HTMLElement);
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
    preactRender(null, this.container as HTMLElement);
  }
}
