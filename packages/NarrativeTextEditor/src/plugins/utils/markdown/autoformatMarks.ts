import { AutoformatRule } from '@udecode/plate-autoformat';
import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
} from '@udecode/plate-basic-marks';

export const autoformatMarks: AutoformatRule[] = [
  {
    mode: 'mark',
    type: MARK_BOLD,
    match: ['**', '__'],
  },
  {
    mode: 'mark',
    type: MARK_ITALIC,
    match: ['*', '_'],
  },
  {
    mode: 'mark',
    type: MARK_STRIKETHROUGH,
    match: '~~',
  },
  {
    mode: 'mark',
    type: MARK_SUPERSCRIPT,
    match: '^',
  },
  {
    mode: 'mark',
    type: MARK_SUBSCRIPT,
    match: '~',
  },
  {
    mode: 'mark',
    type: MARK_CODE,
    match: '`',
  },
];
