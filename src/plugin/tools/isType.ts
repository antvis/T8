import { BlockDescriptor, PhraseDescriptor, PluginType } from '../plugin-protocol.type';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isBlockDescriptor(plugin: PluginType): plugin is BlockDescriptor<any> {
  return 'isBlock' in plugin && plugin.isBlock;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isEntityDescriptor(plugin: PluginType): plugin is PhraseDescriptor<any> {
  return 'isEntity' in plugin && plugin.isEntity;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isCustomPhraseDescriptor(plugin: PluginType): plugin is PhraseDescriptor<any> {
  return 'isEntity' in plugin && !plugin.isEntity;
}
