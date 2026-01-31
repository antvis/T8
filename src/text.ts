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
 * text.schema(spec).theme(theme).render();
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
   * Set the schema for the narrative text visualization.
   * @param spec - The specification object containing narrative text details.
   * @returns The Text instance for method chaining.
   */
  schema(spec: NarrativeTextSpec) {
    this.spec = spec;
    return this;
  }

  /**
   * Parse and set a T8 Syntax string as the schema for the narrative text visualization.
   * @param syntaxString - The T8 Syntax string to parse and use as the schema.
   * @returns The Text instance for method chaining.
   */
  syntax(syntaxString: string) {
    this.spec = parseSyntax(syntaxString);
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
   * Stream render a T8 syntax string fragment.
   * This method parses a complete T8 syntax string and updates the visualization.
   * @param t8SyntaxFragment - The T8 syntax string to parse and render.
   * @param options - The options for the stream render.
   * @returns The Text instance for method chaining.
   */
  streamRender(
    t8SyntaxFragment: string,
    options?: {
      onError?: (error: string) => void;
      onComplete?: (result: NarrativeTextSpec) => void;
    },
  ) {
    try {
      // Use parseSyntax to parse the T8 syntax string
      const document = parseSyntax(t8SyntaxFragment);

      // If parsing succeeds, update schema and trigger rendering
      options?.onComplete?.(document);
      this.schema(document); // Update NarrativeTextSpec
      this.render(); // Trigger rendering logic
    } catch (error: unknown) {
      // Catch parsing exceptions and invoke error callback
      const errorMessage = `Syntax parsing failed: ${error instanceof Error ? error.message : String(error)}`;
      options?.onError?.(errorMessage);
    }
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
