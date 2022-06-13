import { AutoformatRule } from '@udecode/plate-autoformat';
import { MARK_BOLD, MARK_ITALIC } from '@udecode/plate-basic-marks';

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
];
