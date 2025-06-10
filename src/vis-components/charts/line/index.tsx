import { FunctionalComponent } from 'preact';
import { useSvgWrapper } from '../hooks/useSvgWrapper';
import { useLineCompute } from './useLineCompute';

// ID for the gradient fill effect
const LINEAR_FILL_COLOR_ID = 'wsc-line-fill';
// Color for the line stroke
const LINE_STROKE_COLOR = '#5B8FF9';

/**
 * SingleLineChart Component
 *
 * Renders a simple line chart with a filled area below the line
 * The chart automatically adjusts to the font size of its container
 *
 * @param data - Array of numeric values to display as a line chart
 */
export const SingleLine: FunctionalComponent<{ data: number[] }> = ({ data }) => {
  // Get SVG wrapper and calculated size based on font
  const [Svg, size] = useSvgWrapper();
  // Calculate all the line paths and dimensions
  const { width, height, linePath, polygonPath } = useLineCompute(size, data);

  return (
    <Svg height={height} width={width}>
      <defs>
        <linearGradient id={LINEAR_FILL_COLOR_ID} x1="50%" x2="50%" y1="0%" y2="122.389541%">
          <stop offset="0%" stop-color={LINE_STROKE_COLOR} />
          <stop offset="100%" stop-color="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      {linePath && <path d={linePath} stroke={LINE_STROKE_COLOR} fill="transparent" />}
      {polygonPath && <polygon points={polygonPath} fill={`url(#${LINEAR_FILL_COLOR_ID})`} />}
    </Svg>
  );
};
