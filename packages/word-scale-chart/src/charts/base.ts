import { LitElement, css, TemplateResult, html } from 'lit';
import { property } from 'lit/decorators.js';

export class ChartBase extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    this.compute?.();
  }
  @property({ type: Number }) size = 14;
  // eslint-disable-next-line class-methods-use-this
  protected compute() {
    // extend class will achieve this method
  }
  static styles = css`
    svg {
      margin: 0px 4px;
      transform: translate(0px, 0.125em);
    }
  `;
  protected render(): TemplateResult {
    return html`<svg></svg>`;
  }
}
