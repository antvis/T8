import { PhraseDescriptor } from './types';

export const createPhraseFactory =
  (isEntity: boolean) =>
  <MetaData>(descriptor: Omit<PhraseDescriptor<MetaData>, 'isEntity'>): PhraseDescriptor<MetaData> => {
    return { isEntity, getText: (value) => value, ...descriptor };
  };
