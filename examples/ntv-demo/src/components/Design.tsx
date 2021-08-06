import React from 'react';
import { NarrativeTextVis, ITextSpec } from '@antv/narrative-text-vis';
import ui from '../data/ui.json';

export const Design: React.FC = () => {
  return (
    <div style={{ marginBottom: 48 }}>
      <NarrativeTextVis spec={ui as ITextSpec} />
    </div>
  );
};
