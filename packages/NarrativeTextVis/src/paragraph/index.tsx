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

type ParagraphProps = ThemeProps &
  ExtensionProps & {
    spec: ParagraphSpec;
  };

export function Paragraph({ spec, pluginManager, size = 'normal' }: ParagraphProps) {
  if (isCustomParagraph(spec)) {
    const descriptor = pluginManager.getBlockDescriptor(spec.customType);
    if (descriptor && descriptor?.render) return <>{descriptor.render(spec)}</>;
  }
  if (isHeadingParagraph(spec)) {
    return <Heading spec={spec} pluginManager={pluginManager} />;
  }
  if (isTextParagraph(spec)) {
    return <TextLine spec={spec} size={size} pluginManager={pluginManager} />;
  }
  if (isBulletParagraph(spec)) {
    return <Bullets spec={spec} size={size} pluginManager={pluginManager} />;
  }
  return null;
}

export { Headline } from './Headline';
