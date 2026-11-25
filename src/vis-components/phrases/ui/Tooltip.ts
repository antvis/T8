import { getPrefixCls } from '../../../utils';
import { Child, h } from '../../dom';

const TOOLTIP_CONTAINER_ID = 'ntv-tooltip-container';

type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

// Tooltip props.
export interface TooltipProps {
  /** Tooltip content */
  title: HTMLElement | string | number;
  /** Placement */
  placement?: TooltipPlacement;
  /** Trigger method */
  trigger?: 'hover' | 'click';
  /** Custom style on tooltip div*/
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: Record<string, any>;
  /** className */
  className?: string;
  /** Show arrow */
  showArrow?: boolean;
  /** Callback when visibility changes */
  onVisibleChange?: (visible: boolean) => void;
  /** Offset distance */
  offset?: number;
  /** Mouse enter delay (ms) */
  mouseEnterDelay?: number;
  /** Mouse leave delay (ms) */
  mouseLeaveDelay?: number;
}

// Create portal container.
const getContainer = () => {
  let container = document.getElementById(TOOLTIP_CONTAINER_ID);
  if (!container) {
    container = h('div', { className: getPrefixCls('tooltip-container'), id: TOOLTIP_CONTAINER_ID });
    document.body.appendChild(container);
  }
  return container;
};

const tooltipContentStyle = {
  position: 'absolute',
  zIndex: 1000,
  padding: '6px 8px',
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  color: '#fff',
  borderRadius: '4px',
  fontSize: '12px',
  maxWidth: '300px',
  wordWrap: 'break-word',
  boxShadow: '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08)',
  fontFamily: 'PingFang SC, Microsoft YaHei, Arial, sans-serif',
};

const arrowStyle = {
  position: 'absolute',
  width: '0',
  height: '0',
  borderStyle: 'solid',
  borderWidth: '4px',
};

const arrowPlacementStyle = {
  top: {
    bottom: '-8px',
    left: '50%',
    transform: 'translateX(-50%)',
    borderColor: 'rgba(0, 0, 0, 0.75) transparent transparent transparent',
  },
  bottom: {
    top: '-8px',
    left: '50%',
    transform: 'translateX(-50%)',
    borderColor: 'transparent transparent rgba(0, 0, 0, 0.75) transparent',
  },
  left: {
    right: '-8px',
    top: '50%',
    transform: 'translateY(-50%)',
    borderColor: 'transparent transparent transparent rgba(0, 0, 0, 0.75)',
  },
  right: {
    left: '-8px',
    top: '50%',
    transform: 'translateY(-50%)',
    borderColor: 'transparent rgba(0, 0, 0, 0.75) transparent transparent',
  },
};

/**
 * Tooltip
 *
 * Wraps the child in a trigger element, and shows the tip when users interact with it.
 *
 * @example
 * Tooltip({ title: 'This is a tip' }, button);
 */
export function Tooltip(props: TooltipProps, child: Child): HTMLElement {
  const {
    title,
    placement = 'top',
    trigger = 'hover',
    style,
    className,
    showArrow = true,
    onVisibleChange,
    offset = placement === 'top' || placement === 'bottom' ? 4 : 8,
    mouseEnterDelay = 100,
    mouseLeaveDelay = 100,
  } = props;

  let tip: HTMLElement | null = null;
  let timer: number | undefined;

  const position = (triggerEl: HTMLElement, tipEl: HTMLElement) => {
    const t = triggerEl.getBoundingClientRect();
    const r = tipEl.getBoundingClientRect();
    const centerLeft = t.left + (t.width - r.width) / 2;
    const centerTop = t.top + (t.height - r.height) / 2;
    const [top, left] = {
      top: [t.top - r.height - offset, centerLeft],
      bottom: [t.bottom + offset, centerLeft],
      left: [centerTop, t.left - r.width - offset],
      right: [centerTop, t.right + offset],
    }[placement];

    tipEl.style.top = `${top + window.scrollY}px`;
    tipEl.style.left = `${left + window.scrollX}px`;
  };

  const setVisible = (visible: boolean) => {
    if (visible === !!tip) return;

    if (visible) {
      if (!title) return;
      tip = h(
        'div',
        {
          className: `${getPrefixCls('tooltip')} ${className || ''}`,
          style: { ...tooltipContentStyle, ...style },
          onMouseEnter: () => delay(true, mouseEnterDelay),
          onMouseLeave: () => delay(false, mouseLeaveDelay),
        },
        showArrow &&
          h('div', {
            className: getPrefixCls('tooltip-arrow'),
            style: { ...arrowStyle, ...arrowPlacementStyle[placement] },
          }),
        h('div', { className: getPrefixCls('tooltip-inner'), id: 'tooltip-inner' }, title),
      );
      getContainer().appendChild(tip);
      position(triggerEl, tip);
    } else if (tip) {
      tip.remove();
      tip = null;
    }
    onVisibleChange?.(visible);
  };

  const delay = (visible: boolean, ms: number) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => setVisible(visible), ms);
  };

  const triggerEl: HTMLElement = h(
    'span',
    {
      className: getPrefixCls('tooltip-trigger'),
      ...(trigger === 'click'
        ? { onClick: () => setVisible(!tip) }
        : { onMouseEnter: () => delay(true, mouseEnterDelay), onMouseLeave: () => delay(false, mouseLeaveDelay) }),
    },
    child,
  );

  return triggerEl;
}
