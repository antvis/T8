import { ParagraphType } from '../schema';
import { SeedTokenOptions } from '../theme';

const PARAGRAPH_TRANSFORM_MAP: Record<Exclude<ParagraphType, 'normal' | 'bullets'>, string> = {
  headline: 'h1',
  heading1: 'h1',
  heading2: 'h2',
  heading3: 'h3',
  heading4: 'h4',
  heading5: 'h5',
  heading6: 'h6',
};

export const getElementFontSize = (paragraphType: ParagraphType, themeSeedToken: SeedTokenOptions) => {
  const fontSizeMultiple = themeSeedToken?.fontSizeMultiples[PARAGRAPH_TRANSFORM_MAP[paragraphType]] ?? 1;

  return (themeSeedToken?.fontSize ?? 12) * fontSizeMultiple;
};
