import React from 'react';
import {
  PhraseSpec,
  EntityPhraseSpec,
  CustomPhraseSpec,
  isTextPhrase,
  isEntityPhrase,
} from '@antv/narrative-text-schema';
import { isFunction, kebabCase } from 'lodash';
import { Entity } from '../styled';
import { getPrefixCls, classnames as cx, functionalize } from '../utils';
import { ThemeProps, ExtensionProps } from '../interface';
import { PhraseDescriptor, AnyObject, presetPluginManager } from '../chore/plugin';

type PhraseProps = ThemeProps &
  ExtensionProps & {
    spec: PhraseSpec;
  };

function renderPhraseByDescriptor(
  spec: EntityPhraseSpec | CustomPhraseSpec,
  descriptor: PhraseDescriptor<AnyObject>,
  theme: ThemeProps,
) {
  const { value = '', metadata = {}, styles: specStyles = {} } = spec;
  const { overwrite, classNames, style: descriptorStyle, onHover, onClick, content = () => value } = descriptor || {};

  const defaultNode = (
    <Entity
      {...theme}
      style={{
        ...specStyles,
        ...functionalize(descriptorStyle, {})(spec?.value, metadata as any),
      }}
      className={cx(
        getPrefixCls('value'),
        isEntityPhrase(spec) ? getPrefixCls(kebabCase(spec.metadata.entityType)) : '',
        ...functionalize(classNames, [])(spec?.value, metadata as any),
      )}
      onClick={
        isFunction(onClick)
          ? () => {
              onClick(spec?.value, metadata);
            }
          : undefined
      }
      onMouseEnter={
        isFunction(onHover)
          ? () => {
              onHover(spec?.value, metadata);
            }
          : undefined
      }
    >
      {content(value, metadata)}
    </Entity>
  );
  if (isFunction(overwrite)) return overwrite(defaultNode, value, metadata);
  return defaultNode;
}

/** <Phrase /> can use independence */
export function Phrase({ spec: phrase, size = 'normal', pluginManager = presetPluginManager }: PhraseProps) {
  const defaultText = <>{phrase.value}</>;
  if (isTextPhrase(phrase)) return defaultText;
  const descriptor = pluginManager?.getPhraseDescriptorBySpec(phrase);
  if (descriptor) return <>{renderPhraseByDescriptor(phrase, descriptor, { size })}</>;
  return defaultText;
}
