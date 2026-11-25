import { Ol, Ul, Li } from '../styled';
import { renderPhrases } from '../phrases';
import { getPrefixCls, classnames as cx } from '../../utils';
import { BulletsParagraphSpec, ParagraphType } from '../../schema';
import { RenderContext, getEventHandlers } from '../types';

export function renderBullets(spec: BulletsParagraphSpec, ctx: RenderContext, paragraphType: ParagraphType) {
  const Comp = spec.isOrder ? Ol : Ul;

  return Comp(
    { theme: ctx.theme, className: cx(getPrefixCls(spec.isOrder ? 'ol' : 'ul'), spec.className), style: spec.styles },
    spec.bullets?.map((bullet) =>
      Li(
        {
          className: cx(getPrefixCls('li'), bullet.className),
          style: bullet.styles,
          ...getEventHandlers(ctx.onEvent, 'paragraph', bullet),
        },
        renderPhrases(bullet.phrases, ctx, paragraphType),
        bullet.subBullet && renderBullets(bullet.subBullet, ctx, paragraphType),
      ),
    ),
  );
}
