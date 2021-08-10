import React from 'react';
import { map } from 'lodash';
import { ITextSpec } from '@antv/text-schema';
import { Headline, TextLine, Bullets } from './paragraphs';
import { DetailChartDisplayType } from './interface';

export interface NarrativeTextVisProps {
  spec: ITextSpec;
  /** use detail data to render chart, define how to display it  */
  detailChartDisplayType?: DetailChartDisplayType;
}

export const NarrativeTextVis: React.FC<NarrativeTextVisProps> = ({ spec, detailChartDisplayType = 'inline' }) => {
  const { headline, sections } = spec;
  return (
    <div>
      {headline ? <Headline spec={headline} /> : null}
      {sections
        ? map(sections, (section, index) => (
            <div key={index}>
              {map(section.paragraphs, (p, pid) => {
                if (p.type === 'normal') {
                  return <TextLine spec={p} key={pid} detailChartDisplayType={detailChartDisplayType} />;
                }
                if (p.type === 'bullets') {
                  return <Bullets spec={p} key={pid} detailChartDisplayType={detailChartDisplayType} />;
                }
                return null;
              })}
            </div>
          ))
        : null}
    </div>
  );
};
