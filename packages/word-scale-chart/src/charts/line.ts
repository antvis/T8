import { html, svg, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ChartBase } from './base';
import { prefix } from './constants';
import { scaleLinear, Scale } from '../utils';

const elementTag = `${prefix}-line`;
const linearFillColorId = 'wsc-line-fill';
const strokeColor = '#5B8FF9';

@customElement(elementTag)
export class Line extends ChartBase {
  @property({ type: Array }) data: number[] = [];
  @state() height = this.size;
  @state() width = this.getWidth();
  @state() xScale: Scale | undefined;
  @state() yScale: Scale | undefined;

  protected getWidth() {
    return Math.max(this.size * 2, this.data?.length * 2);
  }

  protected compute() {
    super.compute();
    if (!this.data) return;
    this.height = this.size;
    this.width = this.getWidth();
    this.xScale = scaleLinear([0, this.width], [0, this.data?.length - 1]);
    const [min, max] = [Math.min(0, Math.min(...this.data)), Math.max(...this.data)];
    this.yScale = scaleLinear([0, this.height], [min, max]);
  }
  protected renderLine() {
    console.log('this.data: ', this.data);
    if (this.data?.length === 0) return null;
    if (this.xScale && this.yScale) {
      const points: [number, number][] = this.data.map((item, index) => [
        this.xScale?.(index),
        this.height - this.yScale?.(item),
      ]);
      const polygonPoints = [...points];
      const last = points[points.length - 1];
      polygonPoints.push([last[0], this.height]);
      polygonPoints.push([0, this.height]);
      const startPoint = points[0];
      polygonPoints.push(startPoint);

      const pathStr = points.reduce((prev, [x, y], index) => {
        if (index === 0) return `M${x} ${y}`;
        return `${prev} L ${x} ${y}`;
      }, '');
      const polygonPointsStr = polygonPoints.reduce((prev, [x, y]) => `${prev} ${x},${y}`, '');
      return svg`
        <path d=${pathStr} stroke=${strokeColor} fill="transparent"></path>
        <polygon points=${polygonPointsStr} fill="url(#${linearFillColorId})"></polygon>
      `;
    }
    return null;
  }
  render(): TemplateResult {
    return html`
      <svg width=${this.width} height=${this.height}>
        <defs>
          <linearGradient x1="50%" y1="0%" x2="50%" y2="122.389541%" id=${linearFillColorId}>
            <stop stop-color=${strokeColor} offset="0%"></stop>
            <stop stop-color="#FFFFFF" stop-opacity="0" offset="100%"></stop>
          </linearGradient>
        </defs>
        ${this.renderLine()}
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wsc-line': Line;
  }
}
