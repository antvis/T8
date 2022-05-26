import { BlockDescriptor } from './plugin-protocol.type';

export const createCustomBlockFactory = <MetaData>(
  descriptor: Omit<BlockDescriptor<MetaData>, 'isBlock'>,
): BlockDescriptor<MetaData> => {
  return { ...descriptor, isBlock: true };
};
