import { ParagraphSpec, isHeadingParagraph, isTextParagraph, isBulletParagraph, isCustomParagraph } from '../../schema';

import { Heading } from './Heading';
import { TextLine } from './TextLine';
import { Bullets } from './Bullets';
import { ParagraphEvents } from '../../interface';
import { usePluginManager } from '../context/';

type ParagraphProps = ParagraphEvents & {
  /**
   * @description specification of paragraph text spec
   * @description.zh-CN 段落描述 json 信息
   */
  spec: ParagraphSpec;
};

export function Paragraph({ spec, ...events }: ParagraphProps) {
  const pluginManager = usePluginManager();

  const { onClickParagraph, onMouseEnterParagraph, onMouseLeaveParagraph, ...phraseEvents } = events || {};
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

  if (isCustomParagraph(spec)) {
    const descriptor = pluginManager.getBlockDescriptor(spec.customType);
    if (descriptor && descriptor?.render) content = descriptor.render(spec);
  }

  if (isHeadingParagraph(spec)) {
    content = <Heading spec={spec} {...phraseEvents} />;
  }
  if (isTextParagraph(spec)) {
    content = <TextLine spec={spec} {...phraseEvents} />;
  }
  if (isBulletParagraph(spec)) {
    content = <Bullets spec={spec} {...events} />;
  }
  return content ? (
    <div onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {content}
    </div>
  ) : null;
}

export { Headline } from './Headline';
