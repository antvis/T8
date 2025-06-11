import { FunctionalComponent, cloneElement, isValidElement, render } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { JSX } from 'preact/jsx-runtime';
import { getPrefixCls } from '../../../utils';
import { TooltipProps } from '../../types';

const TOOLTIP_CONTAINER_ID = 'ntv-tooltip-container';

// Create portal container.
const createContainer = () => {
  if (document.getElementById(TOOLTIP_CONTAINER_ID)) {
    return document.getElementById(TOOLTIP_CONTAINER_ID) as HTMLDivElement;
  }

  const container = document.createElement('div');
  container.className = getPrefixCls('tooltip-container');
  container.id = TOOLTIP_CONTAINER_ID;
  document.body.appendChild(container);
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

/**
 * Tooltip Component
 *
 * A simple, lightweight tooltip component that displays tips when users interact with elements
 *
 * @example
 * <Tooltip title="This is a tip">
 *   <button>Hover to see</button>
 * </Tooltip>
 */
export const Tooltip: FunctionalComponent<TooltipProps> = ({
  title,
  visible: propsVisible,
  defaultVisible = false,
  children,
  placement = 'top',
  trigger = 'hover',
  style,
  className,
  showArrow = true,
  onVisibleChange,
  offset = placement === 'top' || placement === 'bottom' ? 4 : 8,
  mouseEnterDelay = 100,
  mouseLeaveDelay = 100,
}) => {
  // Store element references.
  const triggerChildrenRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const enterTimer = useRef<number | null>(null);
  const leaveTimer = useRef<number | null>(null);
  const tooltipInnerRef = useRef<HTMLDivElement>(null);

  // Control visibility.
  const [visible, setVisible] = useState(defaultVisible);
  // if visible is provided, use it as the final visible state.
  const finalVisible = propsVisible !== undefined ? propsVisible : visible;

  // Ensure container is created only once.
  useEffect(() => {
    if (!containerRef.current) {
      containerRef.current = createContainer();
    }

    // clear container when unmount.
    return () => {
      if (containerRef.current) {
        document.body.removeChild(containerRef.current);
        containerRef.current = null;
      }
      // Clear potential timers
      if (enterTimer.current) window.clearTimeout(enterTimer.current);
      if (leaveTimer.current) window.clearTimeout(leaveTimer.current);
    };
  }, []);

  useEffect(() => {
    // render tooltip when visible or title changes.
    renderTooltip();

    // // render title to tooltip-inner
    // if (finalVisible) {
    //   renderTitle();
    // }
  }, [finalVisible, title]);

  // Calculate tooltip position
  useEffect(() => {
    if (finalVisible && triggerChildrenRef.current && tooltipRef.current) {
      const triggerRect = triggerChildrenRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      let top = 0;
      let left = 0;
      let arrowStyle: JSX.CSSProperties = {};

      // Calculate coordinates based on placement
      switch (placement) {
        case 'top':
          top = triggerRect.top - tooltipRect.height - offset;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          arrowStyle = {
            bottom: '-8px',
            left: '50%',
            transform: 'translateX(-50%)',
            borderColor: 'rgba(0, 0, 0, 0.75) transparent transparent transparent',
          };
          break;
        case 'bottom':
          top = triggerRect.bottom + offset;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          arrowStyle = {
            top: '-8px',
            left: '50%',
            transform: 'translateX(-50%)',
            borderColor: 'transparent transparent rgba(0, 0, 0, 0.75) transparent',
          };
          break;
        case 'left':
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.left - tooltipRect.width - offset;
          arrowStyle = {
            right: '-8px',
            top: '50%',
            transform: 'translateY(-50%)',
            borderColor: 'transparent transparent transparent rgba(0, 0, 0, 0.75)',
          };
          break;
        case 'right':
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.right + offset;
          arrowStyle = {
            left: '-8px',
            top: '50%',
            transform: 'translateY(-50%)',
            borderColor: 'transparent rgba(0, 0, 0, 0.75) transparent transparent',
          };
          break;
      }

      // Apply calculated position
      tooltipRef.current.style.top = `${top + window.scrollY}px`;
      tooltipRef.current.style.left = `${left + window.scrollX}px`;

      // If showing arrow, set arrow style
      if (showArrow && tooltipRef.current.firstChild) {
        const arrowElement = tooltipRef.current.firstChild as HTMLElement;
        Object.assign(arrowElement.style, arrowStyle);
      }
    }
  }, [finalVisible, placement, offset, showArrow]);

  // Handle visibility change
  const handleVisibleChange = (newVisible: boolean) => {
    if (propsVisible === undefined) {
      setVisible(newVisible);
    }
    onVisibleChange?.(newVisible);
  };

  // Mouse enter handler
  const handleMouseEnter = () => {
    if (leaveTimer.current) {
      window.clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }

    if (!finalVisible) {
      enterTimer.current = window.setTimeout(() => {
        handleVisibleChange(true);
      }, mouseEnterDelay);
    }
  };

  // Mouse leave handler
  const handleMouseLeave = () => {
    if (enterTimer.current) {
      window.clearTimeout(enterTimer.current);
      enterTimer.current = null;
    }

    if (finalVisible) {
      leaveTimer.current = window.setTimeout(() => {
        handleVisibleChange(false);
      }, mouseLeaveDelay);
    }
  };

  // Click handler
  const handleClick = () => {
    handleVisibleChange(!finalVisible);
  };

  // Add event handlers based on trigger type
  const triggerProps: JSX.HTMLAttributes<HTMLElement> = {};
  if (trigger === 'hover') {
    triggerProps.onMouseEnter = handleMouseEnter;
    triggerProps.onMouseLeave = handleMouseLeave;
  } else if (trigger === 'click') {
    triggerProps.onClick = handleClick;
  }

  // Assign ref to the child element
  triggerProps.ref = triggerChildrenRef;
  triggerProps.className = getPrefixCls('tooltip-trigger');

  // Render tooltip content
  const renderTooltip = () => {
    const container = containerRef.current;

    const tooltipContent =
      !finalVisible || !title ? null : (
        <div
          ref={tooltipRef}
          className={`${getPrefixCls('tooltip')} ${className || ''}`}
          style={{ ...tooltipContentStyle, ...style }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {showArrow && <div className={getPrefixCls('tooltip-arrow')} style={arrowStyle} />}
          <div className={getPrefixCls('tooltip-inner')} id="tooltip-inner" ref={tooltipInnerRef} />
        </div>
      );

    render(tooltipContent, container);

    // apply real dom to tooltip-inner when visible.
    if (tooltipInnerRef.current && finalVisible) {
      if (typeof title === 'string' || typeof title === 'number') {
        tooltipInnerRef.current.appendChild(document.createTextNode(String(title)));
      } else if (title instanceof HTMLElement) {
        tooltipInnerRef.current.appendChild(title);
      }
    }
  };

  // Clone the child element and add event handlers
  const child = isValidElement(children) ? (
    cloneElement(children, triggerProps)
  ) : (
    <span {...triggerProps}>{children}</span>
  );

  // Return the modified child and tooltip
  return child;
};
