import {
  ParagraphSpec,
  isHeadingParagraph,
  isTextParagraph,
  isBulletParagraph,
  isCustomParagraph,
  ParagraphType,
} from '../../schema';
import { h } from '../dom';
import { renderHeading } from './Heading';
import { renderTextLine } from './TextLine';
import { renderBullets } from './Bullets';
import { RenderContext, getEventHandlers } from '../types';

export function renderParagraph(spec: ParagraphSpec, ctx: RenderContext) {
  return ctx.reuse ? ctx.reuse(spec, () => createParagraph(spec, ctx)) : createParagraph(spec, ctx);
}

function createParagraph(spec: ParagraphSpec, ctx: RenderContext) {
  const events = getEventHandlers(ctx.onEvent, 'paragraph', spec);

  if (isCustomParagraph(spec)) {
    const content = ctx.pluginManager.getBlockDescriptor(spec.customType)?.render?.(spec);
    if (content) return h('div', events, content);
  }

  const paragraphType = spec.type as ParagraphType;
  let content: HTMLElement | null = null;
  if (isHeadingParagraph(spec)) content = renderHeading(spec, ctx, paragraphType);
  if (isTextParagraph(spec)) content = renderTextLine(spec, ctx, paragraphType);
  if (isBulletParagraph(spec)) content = renderBullets(spec, ctx, paragraphType);

  return content && h('div', events, content);
}

export { renderHeadline } from './Headline';
