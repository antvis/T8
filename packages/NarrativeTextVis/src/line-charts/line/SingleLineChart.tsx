import React from 'react';
import { useSvgWrapper } from '../hooks/useSvgWrapper';
import { useLineCompute } from './useLineCompute';

const linearFillColorId = 'wsc-line-fill';
const strokeColor = '#5B8FF9';

export const SingleLineChart: React.FC<{ data: number[] }> = ({ data }) => {
  const [Svg, size] = useSvgWrapper();
  const { width, height, linePath, polygonPath } = useLineCompute(size, data);
  return (
    <Svg width={width} height={height}>
      <defs>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="122.389541%" id={linearFillColorId}>
          <stop stopColor={strokeColor} offset="0%" />
          <stop stopColor="#FFFFFF" stopOpacity="0" offset="100%" />
        </linearGradient>
      </defs>
      {linePath && <path d={linePath} stroke={strokeColor} fill="transparent" />}
      {polygonPath && <polygon points={polygonPath} fill={`url(#${linearFillColorId})`} />}
    </Svg>
  );
};
