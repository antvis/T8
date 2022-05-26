import React from 'react';
import { HeadingParagraphSpec, getHeadingWeight } from '@antv/narrative-text-schema';
import { isNaN } from 'lodash';
import * as Elements from '../styled';
import { Phrases } from '../phrases';
import { getPrefixCls, classnames as cx } from '../utils';
import { ExtensionProps } from '../interface';

type HeadingProps = ExtensionProps & {
  spec: HeadingParagraphSpec;
};

export function Heading({ spec }: HeadingProps) {
  const weight = getHeadingWeight(spec.type);
  if (isNaN(weight)) return null;
  const Tag = Elements[`H${weight}`];
  return (
    <Tag className={cx(getPrefixCls(`h${weight}`), spec.className)} style={spec.styles}>
      <Phrases spec={spec.phrases} />
    </Tag>
  );
}
