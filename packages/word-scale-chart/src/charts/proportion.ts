import { html, svg, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ChartBase } from './base';
import { prefix } from './constants';

const elementTag = `${prefix}-proportion`;
const shadowColor = '#CDDDFD';
const fillColor = '#3471F9';

@customElement(elementTag)
export class Proportion extends ChartBase {
  @property({ type: Number }) data = 0;
  @state() cx = this.size / 2;
  @state() cy = this.size / 2;
  @state() r = this.size / 2;
  @state() angle = 0;

  protected compute() {
    super.compute();
    this.cx = this.size / 2;
    this.cy = this.size / 2;
    this.r = this.size / 2;
    this.angle = normalizeProportion(this.data) * 2 * Math.PI;
  }
  protected renderShadow() {
    return svg`<circle cx=${this.cx} cy=${this.cy} r=${this.r} fill=${shadowColor}></circle>`;
  }
  protected renderArc() {
    const dx = this.cx + this.r * Math.sin(this.angle);
    const dy = this.cy - this.r * Math.cos(this.angle);

    if (this.data === 1) {
      return svg`<circle cx=${this.cx} cy=${this.cy} r=${this.r} fill=${fillColor}></circle>`;
    }

    const path = `
      M${this.cx} ${0}
      A ${this.cx} ${this.cy} 0 ${this.angle > Math.PI ? 1 : 0} 1 ${dx} ${dy}
      L ${this.cx} ${this.cy} Z
    `;

    return svg`<path d=${path} fill=${fillColor}></path>`;
  }
  render(): TemplateResult {
    return html` <svg width=${this.size} height=${this.size}>${this.renderShadow()} ${this.renderArc()}</svg> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wsc-proportion': Proportion;
  }
}

/**
 * make data between 0 ~ 1
 */
function normalizeProportion(data: number | undefined) {
  if (typeof data !== 'number') return 0;
  if (data > 1) return 1;
  if (data < 0) return 0;
  return data;
}
