import React from 'react';
import { map } from 'lodash';
import { ITextSpec } from '@antv/text-schema';
import { Headline, TextLine, Bullets } from './paragraphs';

export interface NarrativeTextVisProps {
  spec: ITextSpec;
}

export const NarrativeTextVis: React.FC<NarrativeTextVisProps> = ({ spec }) => {
  const { headline, sections } = spec;
  return (
    <div>
      {headline ? <Headline spec={headline} /> : null}
      {sections
        ? map(sections, (section, index) => (
            <div key={index}>
              {map(section.paragraphs, (p, pid) => {
                if (p.type === 'text') {
                  return <TextLine spec={p} key={pid} />;
                }
                if (p.type === 'bullets') {
                  return <Bullets spec={p} key={pid} />;
                }
                return null;
              })}
            </div>
          ))
        : null}
    </div>
  );
};
