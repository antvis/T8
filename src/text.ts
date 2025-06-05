import { h, render as preactRender } from 'preact';
import { NarrativeTextSpec } from './schema';
import { NarrativeTextVis } from './vis-components';
import { ThemeProps } from './theme';

export class Text {
  container: HTMLElement;
  spec: NarrativeTextSpec;
  themeConfig: ThemeProps;

  constructor(container: string | HTMLElement) {
    if (typeof container === 'string') {
      this.container = document.querySelector(container) as HTMLElement;
    } else {
      this.container = container;
    }
  }

  schema(spec: NarrativeTextSpec) {
    this.spec = spec;
    return this;
  }

  theme(theme: ThemeProps) {
    this.themeConfig = theme;
    return this;
  }

  render() {
    const container = this.container;
    const spec = this.spec;
    const theme = this.themeConfig;
    render(container, spec, theme);
  }
}

const render = (container: string | HTMLElement, spec: NarrativeTextSpec, theme: ThemeProps) => {
  // Resolve container if it's a selector string
  if (typeof container === 'string') {
    const element = document.querySelector(container);
    if (!element) {
      throw new Error(`Container not found: ${container}`);
    }
    container = element as HTMLElement;
  }

  // Render the component
  preactRender(
    h(NarrativeTextVis, {
      spec,
      theme,
    }),
    container,
  );

  // Return unmount function
  return () => {
    preactRender(null, container as HTMLElement);
  };
};
