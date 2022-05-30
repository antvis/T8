import React from 'react';
import { HeadlineSpec } from '@antv/narrative-text-schema';
import { Headline as StyledHeadline } from '../styled';
import { Phrases } from '../phrases';
import { getPrefixCls, classnames as cx } from '../utils';
import { ExtensionProps } from '../interface';
import { presetPluginManager } from '../chore/plugin';

type HeadlineProps = ExtensionProps & {
  spec: HeadlineSpec;
};

export function Headline({ spec, pluginManager = presetPluginManager }: HeadlineProps) {
  return (
    <StyledHeadline className={cx(getPrefixCls('headline'), spec.className)} style={spec.styles}>
      <Phrases spec={spec.phrases} pluginManager={pluginManager} />
    </StyledHeadline>
  );
}
