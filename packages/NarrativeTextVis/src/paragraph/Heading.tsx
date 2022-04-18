import React from 'react';
import { HeadingParagraphSpec, DefaultCustomPhraseGeneric } from '@antv/narrative-text-schema';
import { isNaN } from 'lodash';
import * as Elements from '../styled';
import { Phrases } from '../phrases';
import { classnames as cx } from '../utils/classnames';
import { getPrefixCls } from '../utils/getPrefixCls';
import { WithPhraseProps } from '../interface';
import { getHeadingWeight } from './helpers';

type HeadingProps<P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric> = WithPhraseProps<P> & {
  spec: HeadingParagraphSpec<P>;
};

export function Heading<P extends DefaultCustomPhraseGeneric>({ spec, ...phraseProps }: HeadingProps<P>) {
  const weight = getHeadingWeight(spec.type);
  if (isNaN(weight)) return null;
  const Tag = Elements[`H${weight}`];
  return (
    <Tag className={cx(getPrefixCls(`h${weight}`), spec.className)} style={spec.styles}>
      <Phrases<P> spec={spec.phrases} {...phraseProps} />
    </Tag>
  );
}
