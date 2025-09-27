/**
 * Selection API for DOM manipulation
 * Provides D3-like selection interface for SVG elements
 */

export class Selection {
  private elements: Element[];

  constructor(elements: Element | Element[]) {
    this.elements = Array.isArray(elements) ? elements : [elements];
  }

  static select(selector: string): Selection {
    const element = document.querySelector(selector);
    return new Selection(element || []);
  }

  static selectAll(selector: string): Selection {
    const elements = document.querySelectorAll(selector);
    return new Selection(Array.from(elements));
  }

  attr(name: string, value: string | number): Selection {
    this.elements.forEach((el) => {
      if (el instanceof Element) {
        el.setAttribute(name, String(value));
      }
    });
    return this;
  }

  style(name: string, value: string): Selection {
    this.elements.forEach((el) => {
      if (el instanceof Element) {
        (el as HTMLElement).style.setProperty(name, value);
      }
    });
    return this;
  }

  append(tagName: string): Selection {
    const newElements: Element[] = [];
    this.elements.forEach((el) => {
      const newEl = document.createElementNS('http://www.w3.org/2000/svg', tagName);
      el.appendChild(newEl);
      newElements.push(newEl);
    });
    return new Selection(newElements);
  }

  text(content: string): Selection {
    this.elements.forEach((el) => {
      el.textContent = content;
    });
    return this;
  }

  on(event: string, handler: (event: Event) => void): Selection {
    this.elements.forEach((el) => {
      el.addEventListener(event, handler);
    });
    return this;
  }

  node(): Element | null {
    return this.elements[0] || null;
  }

  nodes(): Element[] {
    return [...this.elements];
  }
  datum(data): Selection {
    this.elements.forEach((el) => {
      // Store the data on the element, a common D3 practice
      // You can also use a private field on the Selection instance.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (el as any).__data__ = data;
    });
    return this;
  }
}
