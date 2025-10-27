import {
  ParagraphSpec,
  isHeadingParagraph,
  isTextParagraph,
  isBulletParagraph,
  isCustomParagraph,
  ParagraphType,
} from '../../schema';
import { Heading } from './Heading';
import { TextLine } from './TextLine';
import { Bullets } from './Bullets';
import { usePluginManager, useEvent, CurrentParagraphInfoProvider } from '../context';
import { useMemo } from 'preact/hooks';
import { functionalize } from '../../utils';

type ParagraphProps = {
  /**
   * @description specification of paragraph text spec
   * @description.zh-CN 段落描述 json 信息
   */
  spec: ParagraphSpec;
};

export function Paragraph({ spec }: ParagraphProps) {
  const pluginManager = usePluginManager();

  const { onEvent } = useEvent();

  const onClick = () => {
    onEvent?.('paragraph:click', spec);
  };
  const onMouseEnter = () => {
    onEvent?.('paragraph:mouseenter', spec);
  };
  const onMouseLeave = () => {
    onEvent?.('paragraph:mouseleave', spec);
  };

  let content = null;

  const paragraphContent: HTMLElement | null = useMemo(() => {
    if (isCustomParagraph(spec)) {
      const descriptor = pluginManager.getBlockDescriptor(spec.customType);
      if (descriptor) {
        return functionalize<HTMLElement>(descriptor.render, null)(spec);
      }
    }
    return null;
  }, [spec]);

  if (paragraphContent) {
    return (
      <div
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        dangerouslySetInnerHTML={{ __html: paragraphContent.outerHTML }}
      />
    );
  }

  if (isHeadingParagraph(spec)) {
    content = <Heading spec={spec} />;
  }
  if (isTextParagraph(spec)) {
    content = <TextLine spec={spec} />;
  }
  if (isBulletParagraph(spec)) {
    content = <Bullets spec={spec} />;
  }
  return content ? (
    <CurrentParagraphInfoProvider paragraphType={spec.type as ParagraphType}>
      <div onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {content}
      </div>
    </CurrentParagraphInfoProvider>
  ) : null;
}

export { Headline } from './Headline';
