import { HeadlineSpec, ParagraphType } from '../../schema';
import { Headline } from '../styled';
import { renderPhrases } from '../phrases';
import { getPrefixCls, classnames as cx } from '../../utils';
import { RenderContext, getEventHandlers } from '../types';

export function renderHeadline(spec: HeadlineSpec, ctx: RenderContext) {
  return Headline(
    {
      ...getEventHandlers(ctx.onEvent, 'paragraph', spec),
      className: cx(getPrefixCls('headline'), spec.className),
      style: spec.styles,
      theme: ctx.theme,
    },
    renderPhrases(spec.phrases, ctx, ParagraphType.HEADLINE),
  );
}
