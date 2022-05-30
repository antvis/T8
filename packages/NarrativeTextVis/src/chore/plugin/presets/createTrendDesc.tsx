import React from 'react';
import { isArray } from 'lodash';
import { SingleLineChart } from '../../../line-charts';
import { createEntityPhraseFactory } from '../createEntityPhraseFactory';
import { SpecificEntityPhraseDescriptor } from '../plugin-protocol.type';

const defaultTrendDescDescriptor: SpecificEntityPhraseDescriptor = {
  encoding: {
    inlineChart: (value, { detail }) => {
      if (isArray(detail) && detail.length) return <SingleLineChart data={detail} />;
      return null;
    },
  },
};

export const createTrendDesc = createEntityPhraseFactory('trend_desc', defaultTrendDescDescriptor);
