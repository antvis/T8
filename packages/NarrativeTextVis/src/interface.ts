import { EntityType } from '@antv/narrative-text-schema';
import { PluginManager } from './chore/plugin';

export type PhraseType = 'text' | EntityType | null;

export type ThemeProps = {
  /**
   * @description size of text
   * @description.zh-CN 文本大小
   */
  size?: 'normal' | 'small';
};

export type ExtensionProps = {
  /**
   * @description extension plugin
   * @description.zh-CN 扩展插件
   */
  pluginManager?: PluginManager;
};
