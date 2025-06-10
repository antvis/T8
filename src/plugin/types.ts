import type { EntityMetaData, EntityType } from '../schema';
import { TooltipProps } from '../vis-components/ui';

interface CSSProperties {
  [key: string]: string | number | undefined;
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
  tooltip?:
    | false
    | (Omit<TooltipProps, 'children' | 'title'> & {
        // overwrite antd tooltip title props
        title: ((value: string, metadata: MetaData) => HTMLElement | string | number) | HTMLElement | string | number;
      });
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

export type EntityPhrasePlugin = (
  customPhraseDescriptor?: SpecificEntityPhraseDescriptor,
  mode?: CustomEntityMode,
) => PhraseDescriptor<EntityMetaData>;

export interface BlockDescriptor<CustomBlockSpec> {
  key: string;
  isBlock: true;
  className?: string | ((spec: CustomBlockSpec) => string);
  style?: CSSProperties | ((spec: CustomBlockSpec) => CSSProperties);
  render?: (spec: CustomBlockSpec) => HTMLElement | DocumentFragment;
  getText?: (spec: CustomBlockSpec) => string;
  getMarkdown?: (spec: CustomBlockSpec) => string;
}
