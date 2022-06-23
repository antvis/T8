import { PlateEditor, Value } from '@udecode/plate-core';
import { findVariableInput } from './findVariableInput';

export const isSelectionInVariableInput = <V extends Value>(editor: PlateEditor<V>) =>
  findVariableInput(editor) !== undefined;
