import type { EntityMetaData, EntityType } from '../schema';

export interface CSSProperties {
  [key: string]: string | number | undefined;
}

/**
 * description for block render
 */
export interface BlockDescriptor<CustomBlockSpec> {
  /** key represent blockType */
  key: string;
  /** is block */
  isBlock: true;
  /** className of block */
  className?: string | ((spec: CustomBlockSpec) => string);
  /** style of block */
  style?: CSSProperties | ((spec: CustomBlockSpec) => CSSProperties);
  /**
   * render callback of block, T8 will use the return value to render the block
   * @param spec block spec
   * @returns HTMLElement | DocumentFragment T8 will use the return value to render the block
   */
  render?: ((spec: CustomBlockSpec) => HTMLElement | DocumentFragment) | HTMLElement | DocumentFragment;
  /** getText of block */
  getText?: (spec: CustomBlockSpec) => string;
  /** getMarkdown of block */
  getMarkdown?: (spec: CustomBlockSpec) => string;
}

/**
 * description for phrase render
 */
export interface PhraseDescriptor<MetaData> {
  /** key represent entityType of customType */
  key: string;
  isEntity: boolean;
  /**
   * render callback of phrase, T8 will use the return value to render the phrase
   * @param value phrase spec value
   * @param metadata phrase spec metadata
   * @returns HTMLElement | DocumentFragment T8 will use the return value to render the phrase
   */
  render?: ((value: string, metadata: MetaData) => HTMLElement | DocumentFragment) | HTMLElement | DocumentFragment;
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
  style?: CSSProperties | ((value: string, metadata: MetaData) => CSSProperties);
  onHover?: (value: string, metadata: MetaData) => string;
  onClick?: (value: string, metadata: MetaData) => string;
  getText?: (value: string, metadata: MetaData) => string;
  getMarkdown?: (value: string, metadata: MetaData) => string;
}

/**
 * render custom phrase
 */
export type CustomPhraseDescriptor<MetaData> = PhraseDescriptor<MetaData> & { isEntity: false };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PluginType = PhraseDescriptor<any> | BlockDescriptor<any>;

export interface EntityPhraseDescriptor extends PhraseDescriptor<EntityMetaData> {
  key: EntityType;
  isEntity: true;
}

export type SpecificEntityPhraseDescriptor = Omit<EntityPhraseDescriptor, 'key' | 'isEntity'>;
export type CustomEntityMode = 'overwrite' | 'merge';
