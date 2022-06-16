import { PhraseDescriptor, CustomPhraseDescriptor, AnyObject } from './plugin-protocol.type';
import { createPhraseFactory } from './createPhraseFactory';

export const createCustomPhraseFactory = <MetaData = AnyObject>(
  descriptor: Omit<CustomPhraseDescriptor<MetaData>, 'isEntity'>,
): PhraseDescriptor<MetaData> => createPhraseFactory(false)<MetaData>(descriptor);
