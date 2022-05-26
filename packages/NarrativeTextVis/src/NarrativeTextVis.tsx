import React from 'react';
import { NarrativeTextSpec } from '@antv/narrative-text-schema';
import { v4 } from 'uuid';
import { Container } from './styled';
import { Headline } from './paragraph';
import { Section } from './section';
import { ThemeProps, ExtensionProps } from './interface';
import { classnames as cx, getPrefixCls } from './utils';
import { usePluginCreator } from './chore/plugin';

export type NarrativeTextVisProps = ThemeProps &
  ExtensionProps & {
    spec: NarrativeTextSpec;
  };

export function NarrativeTextVis({ spec, size = 'normal', plugins, pluginManager }: NarrativeTextVisProps) {
  const { headline, sections, styles, className } = spec;
  const innerPluginManager = usePluginCreator(pluginManager, plugins);
  return (
    <Container size={size} className={cx(className, getPrefixCls('container'))} style={styles}>
      {headline ? <Headline spec={headline} pluginManager={innerPluginManager} /> : null}
      {sections
        ? sections?.map((section) => (
            <Section key={v4()} size={size} spec={section} pluginManager={innerPluginManager} />
          ))
        : null}
    </Container>
  );
}
