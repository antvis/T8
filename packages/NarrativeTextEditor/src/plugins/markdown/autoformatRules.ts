import {
  autoformatArrow,
  autoformatLegal,
  autoformatLegalHtml,
  autoformatMath,
  autoformatPunctuation,
  autoformatSmartQuotes,
} from '@udecode/plate-autoformat';
import { autoformatBlocks } from './autoformatBlocks';
import { autoformatLists } from './autoformatLists';
import { autoformatMarks } from './autoformatMarks';

export const autoformatRules = [
  ...autoformatBlocks,
  ...autoformatLists,
  ...autoformatMarks,
  ...autoformatSmartQuotes, // "" ''
  ...autoformatPunctuation, // -- ... >> <<
  ...autoformatLegal, // (c) -> ©
  ...autoformatLegalHtml, // &copy; -> ©
  ...autoformatArrow, // => -> ⇒
  ...autoformatMath, // !==
];
