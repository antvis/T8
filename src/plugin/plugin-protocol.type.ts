import type { ComponentChildren, JSX } from 'preact';
// import type { TooltipProps } from 'antd';
import type { EntityMetaData, EntityEncoding, EntityType } from '../schema';

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
  content?: (value: string, metadata: MetaData) => ComponentChildren;
  /**
   * tooltip of phrases
   */
  // TODO: add tooltip without antd
  // tooltip?:
  //   | false
  //   | (TooltipProps & {
  //       // overwrite antd tooltip title props
  //       title: (value: string, metadata: MetaData) => ReactNode;
  //     });
  classNames?: string[] | ((value: string, metadata: MetaData) => string[]);
  style?: JSX.CSSProperties | ((value: string, metadata: MetaData) => JSX.CSSProperties);
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
  overwrite?: (node: ComponentChildren, value: string, metadata: MetaData) => ComponentChildren;
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
  encoding?: EntityEncoding<ComponentChildren>;
}

export type SpecificEntityPhraseDescriptor = Omit<EntityPhraseDescriptor, 'key' | 'isEntity'>;
export type CustomEntityMode = 'overwrite' | 'merge';

export type EntityPhrasePlugin = (
  customPhraseDescriptor?: SpecificEntityPhraseDescriptor,
  mode?: CustomEntityMode,
) => PhraseDescriptor<EntityMetaData>;

export interface BlockDescriptor<CustomBlockSpec> {
  key: string;
  isBlock: true;
  className?: string | ((spec: CustomBlockSpec) => string);
  style?: JSX.CSSProperties | ((spec: CustomBlockSpec) => JSX.CSSProperties);
  render?: (spec: CustomBlockSpec) => ComponentChildren;
  getText?: (spec: CustomBlockSpec) => string;
  getMarkdown?: (spec: CustomBlockSpec) => string;
}

export type AnyObject = Record<string, unknown>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PluginType = PhraseDescriptor<any> | BlockDescriptor<any>;

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
