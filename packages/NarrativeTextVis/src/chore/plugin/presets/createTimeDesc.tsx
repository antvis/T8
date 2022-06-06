import { createEntityPhraseFactory } from '../createEntityPhraseFactory';
import { SpecificEntityPhraseDescriptor } from '../plugin-protocol.type';

const defaultTimeDescDescriptor: SpecificEntityPhraseDescriptor = {
  encoding: {
    underline: true,
  },
};

export const createTimeDesc = createEntityPhraseFactory('time_desc', defaultTimeDescDescriptor);
