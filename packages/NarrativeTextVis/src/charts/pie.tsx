import React, { useRef, useEffect } from 'react';
import { ProportionPie } from '@antv/word-scale-chart';

export const ProportionPieChart: React.FC<{ data: number }> = ({ data }) => {
  const container = useRef<HTMLSpanElement>(null);
  const chart = useRef<ProportionPie>(null);
  useEffect(() => {
    if (container.current) {
      chart.current = new ProportionPie(container.current, data);
    }
  }, [data]);
  return <span ref={container} />;
};
