import { afterEach, describe, expect, it, vi } from 'vitest';
import { Tooltip } from '../src/vis-components/phrases/ui';

describe('Tooltip', () => {
  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = '';
  });

  it('shows the title on hover and removes it on leave', () => {
    vi.useFakeTimers();
    const onVisibleChange = vi.fn();
    const trigger = Tooltip({ title: 'tip', onVisibleChange }, 'text');
    document.body.appendChild(trigger);

    trigger.dispatchEvent(new Event('mouseenter'));
    vi.advanceTimersByTime(100);
    expect(document.querySelector('.t8-tooltip-inner')?.textContent).toBe('tip');

    trigger.dispatchEvent(new Event('mouseleave'));
    vi.advanceTimersByTime(100);
    expect(document.querySelector('.t8-tooltip')).toBeNull();
    expect(onVisibleChange.mock.calls).toEqual([[true], [false]]);
  });

  it('toggles on click when trigger is click', () => {
    const trigger = Tooltip({ title: 'tip', trigger: 'click' }, 'text');
    document.body.appendChild(trigger);

    trigger.dispatchEvent(new Event('click'));
    expect(document.querySelector('.t8-tooltip')).not.toBeNull();
    trigger.dispatchEvent(new Event('click'));
    expect(document.querySelector('.t8-tooltip')).toBeNull();
  });
});
