import React from 'react';
import { getArcPath } from './getArcPath';
import { useSvgWrapper } from '../hooks/useSvgWrapper';

const shadowColor = '#CDDDFD';
const fillColor = '#3471F9';

export const ProportionChart: React.FC<{ data: number }> = ({ data }) => {
  const [Svg, size] = useSvgWrapper();
  const r = size / 2;
  return (
    <Svg width={size} height={size}>
      <circle cx={r} cy={r} r={r} fill={shadowColor} />
      {data >= 1 ? (
        <circle cx={r} cy={r} r={r} fill={fillColor} />
      ) : (
        <path d={getArcPath(size, data)} fill={fillColor} />
      )}
    </Svg>
  );
};
