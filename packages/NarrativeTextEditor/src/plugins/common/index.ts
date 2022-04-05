import { unwrapList, ELEMENT_PARAGRAPH, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4 } from '@udecode/plate';

import type { AutoformatBlockRule, PlateEditor } from '@udecode/plate';

/** valid types for most plugins */
export const NORMAL_VALID_TYPES = [ELEMENT_PARAGRAPH, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4];

export const clearBlockFormat: AutoformatBlockRule['preFormat'] = (editor) => unwrapList(editor as PlateEditor);
