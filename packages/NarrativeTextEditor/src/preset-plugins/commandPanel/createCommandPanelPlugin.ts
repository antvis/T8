import { createPluginFactory } from '@udecode/plate-core';
import { KEY_COMMAND_PANEL } from './constants';
import { withCommandPanel } from './withCommandPanel';
import { CommandPanelPlugin } from './types';

export const createCommandPanelPlugin = createPluginFactory<CommandPanelPlugin>({
  key: KEY_COMMAND_PANEL,
  withOverrides: withCommandPanel,
});
