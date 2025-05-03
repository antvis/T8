import { FunctionalComponent, JSX } from 'preact';
import { getElementFontSize, DEFAULT_FONT_SIZE } from './getElementFontSize';
import { useRef, useState, useLayoutEffect } from 'preact/hooks';

type SvgPreactFC = FunctionalComponent<JSX.SVGAttributes<SVGSVGElement>>;

/**
 * Custom hook that provides an SVG wrapper component and its calculated size
 *
 * This hook creates an SVG container that automatically sizes itself based on
 * the font size of its parent element. This allows charts to scale properly
 * within text content.
 *
 * @returns [Svg, size] - A tuple containing:
 *   - Svg: A component to wrap SVG content
 *   - size: The calculated size based on parent font size
 */
export const useSvgWrapper = () => {
  // Reference to the SVG element to measure font size
  const ele = useRef(null);
  // State to store calculated size
  const [size, setSize] = useState<number>(DEFAULT_FONT_SIZE);

  // Calculate size based on font size after component mounts
  useLayoutEffect(() => {
    if (ele.current) {
      setSize(getElementFontSize(ele.current, DEFAULT_FONT_SIZE));
    }
  }, []);

  /**
   * SVG wrapper component with consistent styling
   * Sets proper alignment within text content
   */
  const Svg = ({ children, ...otherProps }) => {
    return (
      <svg
        style={{
          margin: '0px 4px',
          transform: 'translate(0px, 0.125em)', // Adjust vertical alignment
        }}
        ref={ele}
        {...otherProps}
      >
        {children}
      </svg>
    );
  };

  return [Svg, size] as [SvgPreactFC, number];
};
