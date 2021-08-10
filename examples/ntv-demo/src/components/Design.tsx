import React from 'react';
import {
  NarrativeTextVis,
  ITextSpec,
  NarrativeTextVisProps,
} from '@antv/narrative-text-vis';
import ui from '../data/ui.json';

export const Design: React.FC<{
  detailChartDisplayType: NarrativeTextVisProps['detailChartDisplayType'];
}> = ({ detailChartDisplayType }) => {
  return (
    <div style={{ marginBottom: 48 }}>
      <NarrativeTextVis
        spec={ui as ITextSpec}
        detailChartDisplayType={detailChartDisplayType}
      />
    </div>
  );
};
