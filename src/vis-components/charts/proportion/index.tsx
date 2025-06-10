import { FunctionalComponent } from 'preact';
import { getArcPath } from './getArcPath';
import { useSvgWrapper } from '../hooks/useSvgWrapper';

// Background color for the unfilled portion of the circle
const PROPORTION_SHADOW_COLOR = '#CDDDFD';
// Fill color for the proportion segment
const PROPORTION_FILL_COLOR = '#3471F9';

/**
 * Proportion Component
 *
 * Visualizes a proportion/percentage as a filled segment of a circle
 * Similar to a simplified pie chart with two segments (filled and unfilled)
 * If proportion is 1 (100%), it renders a fully filled circle
 *
 * @param data - Proportion value between 0 and 1 (e.g., 0.75 for 75%)
 */
export const Proportion: FunctionalComponent<{ data: number }> = ({ data }) => {
  // Get SVG wrapper and calculated size based on font
  const [Svg, size] = useSvgWrapper();
  // Calculate radius from size
  const r = size / 2;

  return (
    <Svg width={size} height={size}>
      {/* Background circle (unfilled portion) */}
      <circle cx={r} cy={r} r={r} fill={PROPORTION_SHADOW_COLOR} />

      {/* Filled portion - either full circle or arc segment */}
      {data >= 1 ? (
        // For 100% or more, draw a full circle
        <circle cx={r} cy={r} r={r} fill={PROPORTION_FILL_COLOR} />
      ) : (
        // For less than 100%, draw an arc segment
        <path d={getArcPath(size, data)} fill={PROPORTION_FILL_COLOR} />
      )}
    </Svg>
  );
};
