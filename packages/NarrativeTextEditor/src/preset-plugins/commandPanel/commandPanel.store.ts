/* eslint-disable no-param-reassign */
import { createStore } from '@udecode/zustood';
import { KEY_COMMAND_PANEL } from './constants';
import { CommandPanelState } from './types';

export const commandPanelStore = createStore(KEY_COMMAND_PANEL)<CommandPanelState>({
  items: [],
  targetRange: null,
  text: null,
}).extendActions((set) => ({
  open: (state: Pick<CommandPanelState, 'targetRange'>) => {
    set.mergeState(state);
  },
  reset: () => {
    set.state((draft) => {
      draft.items = [];
      draft.text = null;
      draft.targetRange = null;
    });
  },
}));

export const useCommandPanelSelectors = commandPanelStore.use;
export const commandPanelSelectors = commandPanelStore.get;
export const commandPanelActions = commandPanelStore.set;
