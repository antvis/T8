import { AnyObject, BlockDescriptor } from './plugin-protocol.type';

export const createCustomBlockFactory = <MetaData = AnyObject>(
  descriptor: Omit<BlockDescriptor<MetaData>, 'isBlock'>,
): BlockDescriptor<MetaData> => {
  return { ...descriptor, isBlock: true };
};
