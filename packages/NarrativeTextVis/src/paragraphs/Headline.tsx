import React from 'react';
import { IHeadline } from '@antv/text-schema';
import { Phrase } from '../phrases';

interface Props {
  spec: IHeadline;
}

export const Headline: React.FC<Props> = ({ spec }) => {
  if (spec && spec.type === 'headline') {
    return (
      <h1>
        <Phrase spec={spec.phrases} />
      </h1>
    );
  }
  return null;
};
