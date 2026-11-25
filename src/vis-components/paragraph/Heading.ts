import { HeadingParagraphSpec, ParagraphType, getHeadingWeight } from '../../schema';
import * as Elements from '../styled';
import { renderPhrases } from '../phrases';
import { getPrefixCls, classnames as cx } from '../../utils';
import { RenderContext } from '../types';

export function renderHeading(spec: HeadingParagraphSpec, ctx: RenderContext, paragraphType: ParagraphType) {
  const weight = getHeadingWeight(spec.type);
  if (isNaN(weight)) return null;
  const Tag = Elements[`H${weight}`];

  return Tag(
    { className: cx(getPrefixCls(`h${weight}`), spec.className), style: spec.styles, theme: ctx.theme },
    renderPhrases(spec.phrases, ctx, paragraphType),
  );
}
