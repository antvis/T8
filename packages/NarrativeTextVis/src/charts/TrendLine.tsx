import React, { useRef, useEffect } from 'react';
import { TinyLine, TinyLineOptions } from '@antv/g2plot';
import { DetailChartDisplayType } from '../interface';

interface Props {
  data: number[];
  displayType: DetailChartDisplayType;
}

function getOption(data: number[], displayType: DetailChartDisplayType): TinyLineOptions {
  const config = {
    data,
    height: displayType === 'inline' ? 20 : 100,
    width: displayType === 'inline' ? 60 : 300,
    smooth: true,
    autoFit: !(displayType === 'inline'),
  };
  if (displayType === 'inline') {
    return {
      ...config,
      tooltip: false,
    };
  }
  return config;
}

export const TrendLine: React.FC<Props> = ({ data, displayType }) => {
  const container = useRef<HTMLDivElement>(null);
  const chart = useRef<TinyLine>(null);
  useEffect(() => {
    if (container.current) {
      if (!chart.current) {
        chart.current = new TinyLine(container.current, getOption(data, displayType));
        chart.current.render();
      } else {
        chart.current.update(getOption(data, displayType));
      }
    }
    return () => {
      if (chart.current) chart.current.destroy();
    };
  }, [data, displayType]);
  return <div ref={container} style={{ display: 'inline-block' }} />;
};
