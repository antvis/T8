import React from 'react';
import {
  PhraseSpec,
  EntityPhraseSpec,
  CustomPhraseSpec,
  isTextPhrase,
  isEntityPhrase,
} from '@antv/narrative-text-schema';
import { isFunction, kebabCase } from 'lodash';
import { Entity, Bold, Italic, Underline } from '../styled';
import { getPrefixCls, classnames as cx, functionalize } from '../utils';
import { ThemeProps, ExtensionProps, PhraseEvents } from '../interface';
import { PhraseDescriptor, AnyObject, presetPluginManager } from '../chore/plugin';

type PhraseProps = ThemeProps &
  ExtensionProps &
  PhraseEvents & {
    spec: PhraseSpec;
  };

function renderPhraseByDescriptor(
  spec: EntityPhraseSpec | CustomPhraseSpec,
  descriptor: PhraseDescriptor<AnyObject>,
  theme: ThemeProps,
  events: PhraseEvents,
) {
  const { value = '', metadata = {}, styles: specStyles = {} } = spec;
  const { overwrite, classNames, style: descriptorStyle, onHover, onClick, content = () => value } = descriptor || {};

  const handleClick = () => {
    onClick?.(spec?.value, metadata);
    events?.onClickPhrase?.(spec);
  };

  const handleMouseEnter = () => {
    onHover?.(spec?.value, metadata);
    events?.onMouseEnterPhrase?.(spec);
  };
  const handleMouseLeave = () => {
    events?.onMouseLeavePhrase?.(spec);
  };

  const defaultNode = (
    <Entity
      {...theme}
      style={{
        ...functionalize(descriptorStyle, {})(spec?.value, metadata as any),
        ...specStyles,
      }}
      className={cx(
        getPrefixCls('value'),
        isEntityPhrase(spec) ? getPrefixCls(kebabCase(spec.metadata.entityType)) : '',
        ...functionalize(classNames, [])(spec?.value, metadata as any),
      )}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {content(value, metadata)}
    </Entity>
  );
  if (isFunction(overwrite)) return overwrite(defaultNode, value, metadata);
  return defaultNode;
}

/** <Phrase /> can use independence */
export function Phrase({ spec: phrase, size = 'normal', pluginManager = presetPluginManager, ...events }: PhraseProps) {
  const onClick = () => {
    events?.onClickPhrase?.(phrase);
  };
  const onMouseEnter = () => {
    events?.onMouseEnterPhrase?.(phrase);
  };
  const onMouseLeave = () => {
    events?.onMouseLeavePhrase?.(phrase);
  };
  let defaultText = events ? (
    <span onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {phrase.value}
    </span>
  ) : (
    phrase.value
  );
  if (isTextPhrase(phrase)) {
    if (phrase.bold) defaultText = <Bold>{defaultText}</Bold>;
    if (phrase.italic) defaultText = <Italic>{defaultText}</Italic>;
    if (phrase.underline) defaultText = <Underline>{defaultText}</Underline>;
    if (phrase.url)
      defaultText = (
        <a target="_blank" rel="noreferrer" href={phrase.url}>
          {defaultText}
        </a>
      );
    return defaultText;
  }
  const descriptor = pluginManager?.getPhraseDescriptorBySpec(phrase);
  if (descriptor) return <>{renderPhraseByDescriptor(phrase, descriptor, { size }, events)}</>;
  return defaultText;
}
