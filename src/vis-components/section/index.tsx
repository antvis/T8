import { SectionSpec, isCustomSection, isStandardSection } from '../../schema';
import { v4 } from 'uuid';
import { getPrefixCls, classnames as cx, isFunction } from '../../utils';
import { SectionEvents } from '../../interface';
import { Container } from '../styled';
import { Paragraph } from '../paragraph';
import { usePluginManager } from '../context/hooks/plugin';

type SectionProps = SectionEvents & {
  /**
   * @description specification of section text spec
   * @description.zh-CN Section 描述 json 信息
   */
  spec: SectionSpec;
};

export function Section({ spec, ...events }: SectionProps) {
  const { onClickSection, onMouseEnterSection, onMouseLeaveSection, ...paragraphEvents } = events || {};

  const pluginManager = usePluginManager();

  const onClick = () => {
    onClickSection?.(spec);
  };
  const onMouseEnter = () => {
    onMouseEnterSection?.(spec);
  };
  const onMouseLeave = () => {
    onMouseLeaveSection?.(spec);
  };
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
    <Container
      as="section"
      className={cx(getPrefixCls('section'), spec.className)}
      style={spec.styles}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {renderCustomSection()}
      {isStandardSection(spec) &&
        spec.paragraphs.map((p) => <Paragraph key={p.key || v4()} spec={p} {...paragraphEvents} />)}
    </Container>
  );
}
