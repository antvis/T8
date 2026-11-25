import { ParagraphType, TextParagraphSpec } from '../../schema';
import { P } from '../styled';
import { renderPhrases } from '../phrases';
import { getPrefixCls, classnames as cx } from '../../utils';
import { RenderContext } from '../types';

export function renderTextLine(spec: TextParagraphSpec, ctx: RenderContext, paragraphType: ParagraphType) {
  return P(
    { theme: ctx.theme, className: cx(getPrefixCls('p'), spec.className), style: spec.styles },
    renderPhrases(spec.phrases, ctx, paragraphType),
  );
}
