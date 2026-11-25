import { describe, expect, it, vi } from 'vitest';
import { h } from '../src/vis-components/dom';

describe('h', () => {
  it('creates element with attributes, style and children', () => {
    const el = h(
      'div',
      { className: 'a', id: 'b', style: { fontSize: 14, lineHeight: 2, color: 'red' } },
      'x',
      [1, null, false],
      h('i', null),
    );
    expect(el.outerHTML).toBe(
      '<div class="a" id="b" style="font-size: 14px; line-height: 2; color: red;">x1<i></i></div>',
    );
  });

  it('binds onXxx props as lowercase event listeners', () => {
    const onClick = vi.fn();
    const onMouseEnter = vi.fn();
    const el = h('span', { onClick, onMouseEnter });
    el.dispatchEvent(new Event('click'));
    el.dispatchEvent(new Event('mouseenter'));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
  });
});
