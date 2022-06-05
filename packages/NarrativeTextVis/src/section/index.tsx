import React from 'react';
import { SectionSpec, isCustomSection, isStandardSection } from '@antv/narrative-text-schema';
import { v4 } from 'uuid';
import { isFunction } from 'lodash';
import { getPrefixCls, classnames as cx } from '../utils';
import { ThemeProps, ExtensionProps } from '../interface';
import { Container } from '../styled';
import { Paragraph } from '../paragraph';
import { presetPluginManager } from '../chore/plugin';

type SectionProps = ThemeProps &
  ExtensionProps & {
    /**
     * @description specification of section text spec
     * @description.zh-CN Section 描述 json 信息
     */
    spec: SectionSpec;
  };

export function Section({ spec, size = 'normal', pluginManager = presetPluginManager }: SectionProps) {
  const renderCustomSection = () => {
    if (isCustomSection(spec)) {
      const descriptor = pluginManager.getBlockDescriptor(spec.customType);
      if (descriptor && isFunction(descriptor?.render)) {
        return descriptor.render(spec);
      }
    }
    return null;
  };
  return (
    <Container size={size} as="section" className={cx(getPrefixCls('section'), spec.className)} style={spec.styles}>
      {renderCustomSection()}
      {isStandardSection(spec) &&
        spec.paragraphs.map((p) => <Paragraph key={v4()} spec={p} size={size} pluginManager={pluginManager} />)}
    </Container>
  );
}
