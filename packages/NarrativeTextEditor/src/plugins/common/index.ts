import { PlateEditor } from '@udecode/plate-core';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4 } from '@udecode/plate-heading';
import { unwrapList } from '@udecode/plate-list';
import { AutoformatBlockRule } from '@udecode/plate-autoformat';

/** valid types for most plugins */
export const NORMAL_VALID_TYPES = [ELEMENT_PARAGRAPH, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4];

export const clearBlockFormat: AutoformatBlockRule['preFormat'] = (editor) => unwrapList(editor as PlateEditor);
