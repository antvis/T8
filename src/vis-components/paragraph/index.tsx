import { ParagraphSpec, isHeadingParagraph, isTextParagraph, isBulletParagraph, isCustomParagraph } from '../../schema';

import { Heading } from './Heading';
import { TextLine } from './TextLine';
import { Bullets } from './Bullets';
import { ExtensionProps, ParagraphEvents } from '../../interface';
import { ThemeProps, defaultTheme } from '../../theme';
import { presetPluginManager } from '../../plugin';
import { useEffect, useRef } from 'preact/hooks';
import { functionalize } from '../../utils';

type ParagraphProps = ExtensionProps &
  ParagraphEvents & {
    /**
     * @description specification of paragraph text spec
     * @description.zh-CN 段落描述 json 信息
     */
    spec: ParagraphSpec;
    /**
     * @description theme props
     * @description.zh-CN 主题配置
     */
    theme?: ThemeProps;
  };

export function Paragraph({
  spec,
  pluginManager = presetPluginManager,
  theme = defaultTheme,
  ...events
}: ParagraphProps) {
  const { onClickParagraph, onMouseEnterParagraph, onMouseLeaveParagraph, ...phraseEvents } = events || {};
  const paragraphRef = useRef<HTMLDivElement>(null);
  const onClick = () => {
    onClickParagraph?.(spec);
  };
  const onMouseEnter = () => {
    onMouseEnterParagraph?.(spec);
  };
  const onMouseLeave = () => {
    onMouseLeaveParagraph?.(spec);
  };

  let content = null;

  useEffect(() => {
    if (isCustomParagraph(spec)) {
      const descriptor = pluginManager.getBlockDescriptor(spec.customType);
      if (descriptor && descriptor?.render) {
        const result = functionalize<HTMLElement | DocumentFragment>(descriptor.render, null)(spec);
        if (result instanceof DocumentFragment || result instanceof HTMLElement) {
          paragraphRef.current?.appendChild(result);
        } else {
          console.warn('Unexpected content type returned from render function:', result);
        }
      }
    }
  }, [spec]);

  if (isHeadingParagraph(spec)) {
    content = <Heading spec={spec} pluginManager={pluginManager} {...phraseEvents} />;
  }
  if (isTextParagraph(spec)) {
    content = <TextLine spec={spec} theme={theme} pluginManager={pluginManager} {...phraseEvents} />;
  }
  if (isBulletParagraph(spec)) {
    content = <Bullets spec={spec} theme={theme} pluginManager={pluginManager} {...events} />;
  }
  return content ? (
    <div onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} ref={paragraphRef}>
      {content}
    </div>
  ) : null;
}

export { Headline } from './Headline';
