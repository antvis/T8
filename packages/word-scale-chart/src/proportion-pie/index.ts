import { drawPie } from './drawPie';
import { removeAllChildren, getElementFontSize } from '../utils';

interface IConfig {
  fontSize: number;
}

export class ProportionPie {
  private container: HTMLSpanElement;
  private data: number;
  private height: number;

  constructor(span: HTMLSpanElement, data: number, config?: Partial<IConfig>) {
    this.container = span;
    this.data = data;
    this.height = config?.fontSize || getElementFontSize(span);
    this.init();
  }
  private init() {
    this.clearAllChildren();
    this.draw();
  }
  private draw() {
    drawPie(this.container, this.data, this.height);
  }
  private clearAllChildren() {
    removeAllChildren(this.container);
  }
}
