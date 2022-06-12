/* eslint-disable no-param-reassign */
import { Value, PlateEditor, WithPlatePlugin } from '@udecode/plate-core';
import { CommandPanelPlugin } from './types';
import { commandPanelActions } from './commandPanel.store';

export const withCommandPanel = <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(
  editor: E,
  { options: { trigger = '/' } }: WithPlatePlugin<CommandPanelPlugin, V, E>,
) => {
  const { insertText } = editor;
  editor.insertText = (text) => {
    insertText(text);
    if (text === trigger) {
      console.log('trigger', editor.selection);
      commandPanelActions.open({
        targetRange: editor.selection,
      });
    } else {
      console.log('reset');
      commandPanelActions.reset();
    }
  };
  return editor;
};
