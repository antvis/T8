import React from 'react';
import {
  ParagraphSpec,
  isCustomParagraph,
  isHeadingParagraph,
  isTextParagraph,
  isBulletParagraph,
} from '@antv/narrative-text-schema';

import { Heading } from './Heading';
import { TextLine } from './TextLine';
import { Bullets } from './Bullets';
import { ThemeProps, ExtensionProps } from '../interface';

import { usePluginCreator } from '../chore/plugin';

type ParagraphProps = ThemeProps &
  ExtensionProps & {
    spec: ParagraphSpec;
  };

export function Paragraph({ spec, pluginManager, plugins, size = 'normal' }: ParagraphProps) {
  const innerPluginManager = usePluginCreator(pluginManager, plugins);
  if (isCustomParagraph(spec)) {
    const plugin = innerPluginManager.getBlockDescriptor(spec.customType);
    if (plugin && plugin?.render) return <>{plugin.render(spec)}</>;
  }
  if (isHeadingParagraph(spec)) {
    return <Heading spec={spec} pluginManager={innerPluginManager} />;
  }
  if (isTextParagraph(spec)) {
    return <TextLine spec={spec} size={size} pluginManager={innerPluginManager} />;
  }
  if (isBulletParagraph(spec)) {
    return <Bullets spec={spec} size={size} pluginManager={innerPluginManager} />;
  }
  return null;
}

export { Headline } from './Headline';
