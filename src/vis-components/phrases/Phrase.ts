import {
  PhraseSpec,
  EntityPhraseSpec,
  CustomPhraseSpec,
  isTextPhrase,
  isEntityPhrase,
  EntityMetaData,
  ParagraphType,
} from '../../schema';
import { Entity, Bold, Italic, Underline } from '../styled';
import { getPrefixCls, classnames as cx, functionalize, kebabCase, isFunction, isEmpty, isNil } from '../../utils';
import { PhraseDescriptor } from '../../plugin';
import { Child, h } from '../dom';
import { RenderContext, getEventHandlers } from '../types';
import { Tooltip } from './ui';

function renderPhraseByDescriptor(
  spec: EntityPhraseSpec | CustomPhraseSpec,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  descriptor: PhraseDescriptor<any>,
  { theme, onEvent }: RenderContext,
  containerParagraphType: ParagraphType,
) {
  const { value = '', metadata = {}, styles: specStyles = {} } = spec;
  const { classNames, style: descriptorStyle, onHover, onClick, render = () => value, tooltip } = descriptor || {};

  const content = functionalize<HTMLElement | string>(render, null)(
    value,
    metadata as EntityMetaData,
    containerParagraphType,
    theme,
  );

  const entity = Entity(
    {
      theme,
      style: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...functionalize(descriptorStyle, {})(spec?.value, metadata as any, theme),
        ...specStyles,
      },
      className: cx(
        getPrefixCls('value'),
        isEntityPhrase(spec) ? getPrefixCls(kebabCase(spec.metadata.entityType)) : '',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(functionalize(classNames, [])(spec?.value, metadata as any) as Array<string>),
      ),
    },
    // the rendered element may be shared between phrases, so always insert a copy.
    content instanceof Node ? content.cloneNode(true) : content,
  );

  const node =
    isFunction(onEvent) || isFunction(onClick) || isFunction(onHover)
      ? h(
          'span',
          {
            onClick: () => {
              onClick?.(spec?.value, metadata);
              onEvent?.('phrase:click', spec);
            },
            onMouseEnter: () => {
              onHover?.(spec?.value, metadata);
              onEvent?.('phrase:mouseenter', spec);
            },
            onMouseLeave: () => onEvent?.('phrase:mouseleave', spec),
          },
          entity,
        )
      : entity;

  const title = tooltip && functionalize(tooltip.title, null)(value, metadata as EntityMetaData);

  return isNil(title) ? node : Tooltip({ ...tooltip, title }, node);
}

export function renderPhrase(phrase: PhraseSpec, ctx: RenderContext, paragraphType: ParagraphType): Child {
  const { theme, pluginManager, onEvent } = ctx;

  let text: Child = !isEmpty(onEvent)
    ? h('span', getEventHandlers(onEvent, 'phrase', phrase), phrase.value)
    : phrase.value;

  if (isTextPhrase(phrase)) {
    if (phrase.bold) text = Bold({}, text);
    if (phrase.italic) text = Italic({}, text);
    if (phrase.underline) text = Underline({}, text);
    if (phrase.url) {
      text = h(
        'a',
        {
          target: '_blank',
          rel: 'noreferrer',
          href: phrase.url,
          style: { color: theme.colorLink, textDecoration: 'underline' },
        },
        text,
      );
    }
    return text;
  }

  const descriptor = pluginManager?.getPhraseDescriptorBySpec(phrase);
  return descriptor ? renderPhraseByDescriptor(phrase, descriptor, ctx, paragraphType) : text;
}
