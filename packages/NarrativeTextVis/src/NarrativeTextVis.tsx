import React from 'react';
import { NarrativeTextSpec } from '@antv/narrative-text-schema';
import { v4 } from 'uuid';
import { Container } from './styled';
import { Headline } from './paragraph';
import { Section } from './section';
import { ThemeProps, ExtensionProps, NarrativeEvents } from './interface';
import { classnames as cx, getPrefixCls } from './utils';
import { presetPluginManager } from './chore/plugin';

export type NarrativeTextVisProps = ThemeProps &
  ExtensionProps &
  NarrativeEvents & {
    /**
     * @description specification of narrative text spec
     * @description.zh-CN Narrative 描述 json 信息
     */
    spec: NarrativeTextSpec;
  };

export function NarrativeTextVis({
  spec,
  size = 'normal',
  pluginManager = presetPluginManager,
  ...events
}: NarrativeTextVisProps) {
  const { headline, sections, styles, className } = spec;
  const { onClickNarrative, onMouseEnterNarrative, onMouseLeaveNarrative, ...sectionEvents } = events || {};
  const onClick = () => {
    onClickNarrative?.(spec);
  };
  const onMouseEnter = () => {
    onMouseEnterNarrative?.(spec);
  };
  const onMouseLeave = () => {
    onMouseLeaveNarrative?.(spec);
  };
  return (
    <Container
      size={size}
      className={cx(className, getPrefixCls('container'))}
      style={styles}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {headline ? <Headline spec={headline} pluginManager={pluginManager} {...sectionEvents} /> : null}
      {sections
        ? sections?.map((section) => (
            <Section key={v4()} size={size} spec={section} pluginManager={pluginManager} {...sectionEvents} />
          ))
        : null}
    </Container>
  );
}
