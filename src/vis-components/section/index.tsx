import { v4 } from 'uuid';
import { SectionSpec, isCustomSection, isStandardSection } from '../../schema';
import { getPrefixCls, classnames as cx, functionalize } from '../../utils';
import { Container } from '../styled';
import { Paragraph } from '../paragraph';
import { usePluginManager, useEvent } from '../context';
import { useEffect, useRef } from 'preact/hooks';
import { EventType } from '../types';

type SectionProps = {
  /**
   * @description specification of section text spec
   * @description.zh-CN Section 描述 json 信息
   */
  spec: SectionSpec;
};

export function Section({ spec }: SectionProps) {
  const { onClick: onSectionClick, onMouseEnter: onSectionMouseEnter, onMouseLeave: onSectionMouseLeave } = useEvent();

  const customSectionRef = useRef<HTMLDivElement>(null);
  const pluginManager = usePluginManager();

  const onClick = () => {
    onSectionClick?.(EventType.ON_SECTION_CLICK, spec);
  };
  const onMouseEnter = () => {
    onSectionMouseEnter?.(EventType.ON_SECTION_MOUSE_ENTER, spec);
  };
  const onMouseLeave = () => {
    onSectionMouseLeave?.(EventType.ON_SECTION_MOUSE_LEAVE, spec);
  };

  const renderCustomSection = () => {
    if (isCustomSection(spec)) {
      const descriptor = pluginManager.getBlockDescriptor(spec.customType);
      if (descriptor) {
        return functionalize<HTMLElement | DocumentFragment>(descriptor.render, null)(spec);
      }
    }
    return null;
  };

  useEffect(() => {
    if (customSectionRef.current && isCustomSection(spec)) {
      const contentResult = renderCustomSection();
      if (contentResult instanceof DocumentFragment || contentResult instanceof HTMLElement) {
        customSectionRef.current.appendChild(contentResult);
      } else {
        console.warn('Unexpected content type returned from render function:', contentResult);
      }
    }
  }, [spec]);

  return (
    <Container
      as="section"
      className={cx(getPrefixCls('section'), spec.className)}
      style={spec.styles}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Container forwardRef={customSectionRef} />
      {isStandardSection(spec) && spec.paragraphs.map((p) => <Paragraph key={p.key || v4()} spec={p} />)}
    </Container>
  );
}
