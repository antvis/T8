import { EntityType } from '@antv/narrative-text-schema';
import { PluginManager } from './chore/plugin';

export type PhraseType = 'text' | EntityType | null;

export type ThemeProps = {
  size?: 'normal' | 'small';
};

export type ExtensionProps = {
  pluginManager?: PluginManager;
};
