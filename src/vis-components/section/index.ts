import { SectionSpec, isCustomSection, isStandardSection } from '../../schema';
import { getPrefixCls, classnames as cx } from '../../utils';
import { Container } from '../styled';
import { renderParagraph } from '../paragraph';
import { RenderContext, getEventHandlers } from '../types';

export function renderSection(spec: SectionSpec, ctx: RenderContext) {
  const { pluginManager, onEvent } = ctx;

  const customContent = isCustomSection(spec)
    ? pluginManager.getBlockDescriptor(spec.customType)?.render?.(spec)
    : null;

  return Container(
    {
      className: cx(getPrefixCls('section'), spec.className),
      style: spec.styles,
      ...getEventHandlers(onEvent, 'section', spec),
    },
    customContent && Container({}, customContent),
    isStandardSection(spec) && spec.paragraphs.map((p) => renderParagraph(p, ctx)),
  );
}
