import { KEYS_HEADING } from '@udecode/plate-heading';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { ELEMENT_UL, ELEMENT_OL } from '@udecode/plate-list';

export const safeSlateValue = [{ type: ELEMENT_PARAGRAPH, children: [{ text: '' }] }];

export const BLOCK_KEYS = [...KEYS_HEADING, ELEMENT_PARAGRAPH, ELEMENT_UL, ELEMENT_OL] as const;

export type BlockKey = typeof BLOCK_KEYS[number];
