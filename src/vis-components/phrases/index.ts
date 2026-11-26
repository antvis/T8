import { ParagraphType, PhraseSpec } from '../../schema';
import { RenderContext } from '../types';
import { renderPhrase } from './Phrase';

export function renderPhrases(spec: PhraseSpec[] | undefined, ctx: RenderContext, paragraphType: ParagraphType) {
  return spec?.map((phrase) => renderPhrase(phrase, ctx, paragraphType));
}

export { renderPhrase } from './Phrase';

export type { TooltipProps } from './ui';
