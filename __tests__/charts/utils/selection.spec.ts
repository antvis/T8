import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Selection } from '../../../src/charts/utils/selection';

describe('Selection', () => {
  let testContainer: HTMLDivElement;

  beforeEach(() => {
    testContainer = document.createElement('div');
    testContainer.innerHTML = `
      <svg id="test-svg">
        <g class="test-group">
          <rect class="test-rect" width="10" height="10"></rect>
          <circle class="test-circle" r="5"></circle>
        </g>
        <g class="test-group">
          <rect class="test-rect" width="20" height="20"></rect>
        </g>
      </svg>
    `;
    document.body.appendChild(testContainer);
  });

  afterEach(() => {
    document.body.removeChild(testContainer);
  });

  describe('constructor', () => {
    it('should create selection with single element', () => {
      const element = document.createElement('div');
      const selection = new Selection(element);
      expect(selection.node()).toBe(element);
      expect(selection.nodes()).toEqual([element]);
    });

    it('should create selection with array of elements', () => {
      const elements = [document.createElement('div'), document.createElement('span')];
      const selection = new Selection(elements);
      expect(selection.nodes()).toEqual(elements);
    });

    it('should handle empty array', () => {
      const selection = new Selection([]);
      expect(selection.node()).toBeNull();
      expect(selection.nodes()).toEqual([]);
    });
  });

  describe('select', () => {
    it('should select single element by id', () => {
      const selection = Selection.select('#test-svg');
      expect(selection.node()).toBe(document.getElementById('test-svg'));
    });

    it('should select single element by class', () => {
      const selection = Selection.select('.test-group');
      expect(selection.node()).toBe(document.querySelector('.test-group'));
    });

    it('should return empty selection for non-existent selector', () => {
      const selection = Selection.select('#non-existent');
      expect(selection.node()).toBeNull();
      expect(selection.nodes()).toEqual([]);
    });

    it('should select first element when multiple match', () => {
      const selection = Selection.select('.test-rect');
      const firstRect = document.querySelector('.test-rect');
      expect(selection.node()).toBe(firstRect);
    });
  });

  describe('selectAll', () => {
    it('should select all elements by class', () => {
      const selection = Selection.selectAll('.test-group');
      const allGroups = document.querySelectorAll('.test-group');
      expect(selection.nodes()).toEqual(Array.from(allGroups));
    });

    it('should select all elements by tag', () => {
      const selection = Selection.selectAll('.test-rect');
      const allRects = document.querySelectorAll('.test-rect');
      expect(selection.nodes()).toEqual(Array.from(allRects));
    });

    it('should return empty selection for non-existent selector', () => {
      const selection = Selection.selectAll('.non-existent');
      expect(selection.nodes()).toEqual([]);
    });
  });

  describe('attr', () => {
    it('should set attribute on single element', () => {
      const rect = document.querySelector('.test-rect') as SVGElement;
      const selection = new Selection(rect);
      selection.attr('fill', 'red');
      expect(rect.getAttribute('fill')).toBe('red');
    });

    it('should set attribute on multiple elements', () => {
      const selection = Selection.selectAll('.test-rect');
      selection.attr('stroke', 'blue');
      const rects = document.querySelectorAll('.test-rect');
      rects.forEach((rect) => {
        expect(rect.getAttribute('stroke')).toBe('blue');
      });
    });

    it('should handle numeric values', () => {
      const rect = document.querySelector('.test-rect') as SVGElement;
      const selection = new Selection(rect);
      selection.attr('x', 100);
      expect(rect.getAttribute('x')).toBe('100');
    });

    it('should return selection for chaining', () => {
      const rect = document.querySelector('.test-rect') as SVGElement;
      const selection = new Selection(rect);
      const result = selection.attr('fill', 'red');
      expect(result).toBe(selection);
    });
  });

  describe('style', () => {
    it('should set style on single element', () => {
      const element = document.createElement('div');
      const selection = new Selection(element);
      selection.style('color', 'red');
      expect(element.style.color).toBe('red');
    });

    it('should set style on multiple elements', () => {
      const elements = [document.createElement('div'), document.createElement('span')];
      const selection = new Selection(elements);
      selection.style('font-size', '16px');
      elements.forEach((el) => {
        expect(el.style.fontSize).toBe('16px');
      });
    });

    it('should return selection for chaining', () => {
      const element = document.createElement('div');
      const selection = new Selection(element);
      const result = selection.style('color', 'blue');
      expect(result).toBe(selection);
    });
  });

  describe('append', () => {
    it('should append new SVG element to single parent', () => {
      const svg = document.querySelector('#test-svg') as SVGElement;
      const selection = new Selection(svg);
      const newSelection = selection.append('rect');

      expect(newSelection.nodes().length).toBe(1);
      expect(newSelection.node()?.tagName).toBe('rect');
      expect(svg.contains(newSelection.node()!)).toBe(true);
    });

    it('should append new SVG elements to multiple parents', () => {
      const groups = Selection.selectAll('.test-group');
      const newSelection = groups.append('circle');

      expect(newSelection.nodes().length).toBe(2);
      newSelection.nodes().forEach((node) => {
        expect(node.tagName).toBe('circle');
      });
    });

    it('should create elements in SVG namespace', () => {
      const svg = document.querySelector('#test-svg') as SVGElement;
      const selection = new Selection(svg);
      const newSelection = selection.append('line');

      const newElement = newSelection.node();
      expect(newElement?.namespaceURI).toBe('http://www.w3.org/2000/svg');
    });

    it('should return new selection with appended elements', () => {
      const svg = document.querySelector('#test-svg') as SVGElement;
      const selection = new Selection(svg);
      const newSelection = selection.append('path');

      expect(newSelection).not.toBe(selection);
      expect(newSelection.nodes().length).toBe(1);
    });
  });

  describe('text', () => {
    it('should set text content on single element', () => {
      const element = document.createElement('div');
      const selection = new Selection(element);
      selection.text('Hello World');
      expect(element.textContent).toBe('Hello World');
    });

    it('should set text content on multiple elements', () => {
      const elements = [document.createElement('div'), document.createElement('span')];
      const selection = new Selection(elements);
      selection.text('Test Text');
      elements.forEach((el) => {
        expect(el.textContent).toBe('Test Text');
      });
    });

    it('should return selection for chaining', () => {
      const element = document.createElement('div');
      const selection = new Selection(element);
      const result = selection.text('content');
      expect(result).toBe(selection);
    });

    it('should handle empty text', () => {
      const element = document.createElement('div');
      element.textContent = 'initial';
      const selection = new Selection(element);
      selection.text('');
      expect(element.textContent).toBe('');
    });
  });

  describe('on', () => {
    it('should add event listener to single element', () => {
      const element = document.createElement('div');
      const selection = new Selection(element);
      const handler = vi.fn();

      selection.on('click', handler);
      element.click();

      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should add event listener to multiple elements', () => {
      const elements = [document.createElement('div'), document.createElement('div')];
      const selection = new Selection(elements);
      const handler = vi.fn();

      selection.on('click', handler);
      elements.forEach((el) => el.click());

      expect(handler).toHaveBeenCalledTimes(2);
    });

    it('should return selection for chaining', () => {
      const element = document.createElement('div');
      const selection = new Selection(element);
      const result = selection.on('click', () => {});
      expect(result).toBe(selection);
    });

    it('should handle different event types', () => {
      const element = document.createElement('div');
      const selection = new Selection(element);
      const clickHandler = vi.fn();
      const mouseoverHandler = vi.fn();

      selection.on('click', clickHandler).on('mouseover', mouseoverHandler);

      element.click();
      element.dispatchEvent(new MouseEvent('mouseover'));

      expect(clickHandler).toHaveBeenCalledTimes(1);
      expect(mouseoverHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe('node', () => {
    it('should return first element', () => {
      const elements = [document.createElement('div'), document.createElement('span')];
      const selection = new Selection(elements);
      expect(selection.node()).toBe(elements[0]);
    });

    it('should return null for empty selection', () => {
      const selection = new Selection([]);
      expect(selection.node()).toBeNull();
    });
  });

  describe('nodes', () => {
    it('should return all elements', () => {
      const elements = [document.createElement('div'), document.createElement('span')];
      const selection = new Selection(elements);
      expect(selection.nodes()).toEqual(elements);
    });

    it('should return empty array for empty selection', () => {
      const selection = new Selection([]);
      expect(selection.nodes()).toEqual([]);
    });

    it('should return copy of internal array', () => {
      const elements = [document.createElement('div')];
      const selection = new Selection(elements);
      const nodes = selection.nodes();
      nodes.push(document.createElement('span'));
      expect(selection.nodes().length).toBe(1);
    });
  });

  describe('method chaining', () => {
    it('should support method chaining', () => {
      const svg = document.querySelector('#test-svg') as SVGElement;
      const selection = new Selection(svg);

      const result = selection
        .append('rect')
        .attr('width', '50')
        .attr('height', '30')
        .style('fill', 'green')
        .text('Rectangle');

      const rect = result.node() as SVGRectElement;
      expect(rect.tagName).toBe('rect');
      expect(rect.getAttribute('width')).toBe('50');
      expect(rect.getAttribute('height')).toBe('30');
      expect(rect.style.fill).toBe('green');
      expect(rect.textContent).toBe('Rectangle');
    });
  });
});
