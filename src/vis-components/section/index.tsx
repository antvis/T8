import { v4 } from 'uuid';
import { SectionSpec, isCustomSection, isStandardSection } from '../../schema';
import { getPrefixCls, classnames as cx, functionalize } from '../../utils';
import { Container } from '../styled';
import { Paragraph } from '../paragraph';
import { usePluginManager, useEvent } from '../context';
import { useMemo } from 'preact/hooks';

type SectionProps = {
  /**
   * @description specification of section text spec
   * @description.zh-CN Section 描述 json 信息
   */
  spec: SectionSpec;
};

export function Section({ spec }: SectionProps) {
  const { onEvent } = useEvent();

  const pluginManager = usePluginManager();

  const onClick = () => {
    onEvent?.('section:click', spec);
  };
  const onMouseEnter = () => {
    onEvent?.('section:mouseenter', spec);
  };
  const onMouseLeave = () => {
    onEvent?.('section:mouseleave', spec);
  };

  const renderCustomSection = () => {
    if (isCustomSection(spec)) {
      const descriptor = pluginManager.getBlockDescriptor(spec.customType);
      if (descriptor) {
        return functionalize<HTMLElement>(descriptor.render, null)(spec);
      }
    }
    return null;
  };

  const sectionContent: HTMLElement | null = useMemo(() => {
    if (isCustomSection(spec)) {
      return renderCustomSection();
    }
    return null;
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
      <Container dangerouslySetInnerHTML={{ __html: sectionContent?.outerHTML || '' }} />
      {isStandardSection(spec) && spec.paragraphs.map((p) => <Paragraph key={p.key || v4()} spec={p} />)}
    </Container>
  );
}
