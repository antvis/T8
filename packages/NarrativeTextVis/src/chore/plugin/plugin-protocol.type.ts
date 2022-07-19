import { CSSProperties, ReactNode } from 'react';
import { EntityMetaData, EntityEncoding, EntityType } from '@antv/narrative-text-schema';

/**
 * description for phrase render
 */
export interface PhraseDescriptor<MetaData> {
  /** key represent entityType of customType */
  key: string;
  isEntity: boolean;
  /**
   * main react node, default is phrase value
   * @param value phrase spec value
   * @param metadata phrase spec metadata
   */
  content?: (value: string, metadata: MetaData) => ReactNode;
  classNames?: string[] | ((value: string, metadata: MetaData) => string[]);
  style?: CSSProperties | ((value: string, metadata: MetaData) => CSSProperties);
  onHover?: (value: string, metadata: MetaData) => string;
  onClick?: (value: string, metadata: MetaData) => string;
  getText?: (value: string, metadata: MetaData) => string;
  getMarkdown?: (value: string, metadata: MetaData) => string;

  /**
   * overwrite will be the highest priority to render node if it defined
   * @param node the program result node
   * @param value phrase spec value
   * @param metadata phrase spec metadata
   */
  overwrite?: (node: ReactNode, value: string, metadata: MetaData) => ReactNode;
}

export type CustomPhraseDescriptor<MetaData> = PhraseDescriptor<MetaData> & { isEntity: false };

/**
 * description for entity phrase render
 */
export interface EntityPhraseDescriptor extends PhraseDescriptor<EntityMetaData> {
  key: EntityType;
  isEntity: true;
  /**
   * entity phrase encoding channel based on entityType
   */
  encoding?: EntityEncoding<ReactNode>;
}

export type SpecificEntityPhraseDescriptor = Omit<EntityPhraseDescriptor, 'key' | 'isEntity'>;
export type CustomEntityMode = 'overwrite' | 'merge';

export type EntityPhrasePlugin = (
  customPhraseDescriptor?: SpecificEntityPhraseDescriptor,
  mode?: CustomEntityMode,
) => PhraseDescriptor<EntityMetaData>;

export interface BlockDescriptor<MetaData> {
  key: string;
  isBlock: true;
  className?: string | ((metadata: MetaData) => string);
  style?: CSSProperties | ((metadata: MetaData) => CSSProperties);
  render?: (metadata: MetaData) => ReactNode;
  getText?: (metadata: MetaData) => string;
  getMarkdown?: (metadata: MetaData) => string;
}

export type AnyObject = Record<string, unknown>;

export type PluginType = PhraseDescriptor<AnyObject> | BlockDescriptor<AnyObject>;

export function isBlockDescriptor(plugin: PluginType): plugin is BlockDescriptor<AnyObject> {
  return 'isBlock' in plugin && plugin.isBlock;
}

export function isEntityDescriptor(plugin: PluginType): plugin is PhraseDescriptor<AnyObject> {
  return 'isEntity' in plugin && plugin.isEntity;
}

export function isCustomPhraseDescriptor(plugin: PluginType): plugin is PhraseDescriptor<AnyObject> {
  return 'isEntity' in plugin && !plugin.isEntity;
}
