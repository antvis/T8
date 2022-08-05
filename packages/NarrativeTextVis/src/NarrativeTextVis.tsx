import React, { useRef, useEffect } from 'react';
import { NarrativeTextSpec } from '@antv/narrative-text-schema';
import { v4 } from 'uuid';
import { isHotkey } from 'is-hotkey';
import { Container } from './styled';
import { Headline } from './paragraph';
import { Section } from './section';
import { ThemeProps, ExtensionProps, NarrativeEvents } from './interface';
import { classnames as cx, getPrefixCls, elementContainsSelection } from './utils';
import { presetPluginManager } from './chore/plugin';

export type NarrativeTextVisProps = ThemeProps &
  ExtensionProps &
  NarrativeEvents & {
    /**
     * @description specification of narrative text spec
     * @description.zh-CN Narrative 描述 json 信息
     */
    spec: NarrativeTextSpec;
    onCopyByKeyboard?: () => void;
  };

export function NarrativeTextVis({
  spec,
  size = 'normal',
  onCopyByKeyboard,
  pluginManager = presetPluginManager,
  ...events
}: NarrativeTextVisProps) {
  const narrativeDomRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const onCopy = (event: KeyboardEvent) => {
      try {
        if (isHotkey('mod+c', event) && narrativeDomRef.current && elementContainsSelection(narrativeDomRef.current)) {
          onCopyByKeyboard?.();
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(`Listen copy by keyboard error，${e}`);
      }
    };

    if (onCopyByKeyboard) window.addEventListener('keydown', onCopy);

    return () => {
      if (onCopyByKeyboard) window.removeEventListener('keydown', onCopy);
    };
  }, [onCopyByKeyboard]);

  return (
    <Container
      size={size}
      className={cx(className, getPrefixCls('container'))}
      style={styles}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={narrativeDomRef}
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
