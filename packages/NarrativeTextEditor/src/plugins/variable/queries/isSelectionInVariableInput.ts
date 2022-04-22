import { PlateEditor } from '@udecode/plate-core';
import { findVariableInput } from './findVariableInput';

export const isSelectionInVariableInput = (editor: PlateEditor) => findVariableInput(editor) !== undefined;
