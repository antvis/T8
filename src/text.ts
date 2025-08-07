import { h, render as preactRender } from 'preact';
import { NarrativeTextSpec } from './schema';
import { NarrativeTextVis } from './vis-components';
import { getThemeSeedToken, SeedTokenOptions } from './theme';
import { PluginManager, PluginType, presetPlugins } from './plugin';
import EE from '@antv/event-emitter';
import { createT8ClarinetParser, T8ClarinetParser, T8ClarinetParseResult } from './utils/t8ClarinetParser';

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
  /**
   * The parser for the text visualization.
   */
  private parser: T8ClarinetParser;

  constructor(container: string | HTMLElement) {
    super();
    this.container = typeof container === 'string' ? (document.querySelector(container) as HTMLElement) : container;

    this.pluginManager = new PluginManager(presetPlugins);
    this.parser = createT8ClarinetParser();
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
   * Stream render the narrative text visualization.
   * @param newJSONFragment - The new JSON fragment to render.
   * @param options - The options for the stream render.
   * @returns The Text instance for method chaining.
   */
  streamRender(
    newJSONFragment: string,
    options?: {
      onError?: (error: string) => void;
      onComplete?: (result: T8ClarinetParseResult) => void;
    },
  ) {
    this.parser.append(newJSONFragment);
    const result = this.parser.getResult();
    if (result.error) {
      options?.onError?.(result.error);
    } else {
      options?.onComplete?.(result);
      this.schema(result.document as NarrativeTextSpec);
      this.render();
    }
  }

  /**
   * Clear the parser.
   */
  clear() {
    this.parser.reset();
    this.unmount();
  }

  /**
   * Unmount the component.
   */
  unmount() {
    preactRender(null, this.container as HTMLElement);
  }
}
