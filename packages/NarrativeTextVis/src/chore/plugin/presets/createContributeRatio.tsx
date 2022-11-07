import { createEntityPhraseFactory } from '../createEntityPhraseFactory';
import { SpecificEntityPhraseDescriptor } from '../plugin-protocol.type';
import { seedToken } from '../../../theme';

const defaultContributeRatioDescriptor: SpecificEntityPhraseDescriptor = {
  encoding: {
    color: seedToken.colorConclusion,
  },
  tooltip: {
    title: (value, metadata) => metadata.origin ?? `${metadata.origin}`,
  },
};

export const createContributeRatio = createEntityPhraseFactory('contribute_ratio', defaultContributeRatioDescriptor);
