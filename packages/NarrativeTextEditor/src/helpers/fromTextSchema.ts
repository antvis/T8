import type {
  BulletsParagraphSpec,
  HeadingParagraphSpec,
  NarrativeTextSpec,
  ParagraphSpec,
  PhraseSpec,
  TextParagraphSpec,
} from '@antv/narrative-text-vis';
import type { TDescendant } from '@udecode/plate';
import type { NarrativeTextEditorProps } from '../types';

// TODO #羽然 对于已知类型，PhraseSpec， HeadlineSpec， ParagraphSpec 可以转换；转换到 custom Spec 还有问题

// 将 text-schema 转换成 NarrativeVisEditor 需要的格式
export const specToEditorProps = (
  spec: NarrativeTextSpec,
): {
  content?: NarrativeTextEditorProps['initialValue'];
  variableMap: NarrativeTextEditorProps['variableMap'];
} => {
  const variableMap = {};
  const content: TDescendant[] = [];

  let variableIndex = -1;
  // phrase 元素转换
  const convertPhrase = (phrase: PhraseSpec) => {
    switch (phrase.type) {
      case 'text':
        return {
          text: phrase.value,
        };
      case 'entity': {
        // 如果没有 phrase 上没有 id 属性 则用序号代替 variable key
        const variableKey = (phrase.metadata as any)?.id || `variable_${(variableIndex += 1)}`;
        variableMap[variableKey] = {
          ...phrase,
        };
        return {
          type: 'variable',
          children: [
            {
              text: '',
            },
          ],
          value: phrase.value,
          metadata: phrase.metadata,
          key: variableKey,
        };
      }
      case 'custom':
        // TODO CustomPhraseSpec 时的转换: 内置的 custom 类型，可以提供内置定制转换，外部的需要自己提供转换函数，否则使用 phrase.value 兜底
        return {
          type: phrase.type,
          text: phrase.value,
          metadata: phrase.metadata,
        };
      default:
        return { text: '' };
    }
  };

  const convertPhraseArray = (phrases: PhraseSpec[]) => {
    const elements: TDescendant[] = [];
    phrases.forEach((phrase) => {
      if (phrase.type === 'text') {
        elements.push(convertPhrase(phrase));
      } else {
        elements.push({ text: ' ' });
        elements.push(convertPhrase(phrase));
        elements.push({ text: ' ' });
      }
    });
    return elements;
  };

  // 块级元素转换
  // TODO 应该在 text-schema 中，每个 spec 自己提供转换函数吗
  const convertParagraph = (paragraph: ParagraphSpec) => {
    switch (paragraph?.type) {
      case 'normal':
        return {
          type: 'p',
          children: convertPhraseArray((paragraph as TextParagraphSpec).phrases),
        };
      case 'bullets': {
        const bullets = (paragraph as BulletsParagraphSpec).bullets.map((bullet) => {
          const { phrases, subBullet } = bullet;
          return {
            type: 'li',
            children: convertPhraseArray(phrases).concat(convertParagraph(subBullet) || []),
          };
        });
        return {
          type: 'ul',
          children: bullets,
        };
      }
      case 'heading1':
      case 'heading2':
      case 'heading3':
      case 'heading4':
      case 'heading5':
      case 'heading6':
        return {
          type: `h${paragraph.type[paragraph.type.length - 1]}`,
          children: convertPhraseArray((paragraph as HeadingParagraphSpec).phrases),
        };
      default:
        // TODO 当 paragraph 为 CustomMetaData 类型时
        return { text: '' };
    }
  };
  const { headline, sections } = spec;
  if (headline?.phrases) {
    content.push({
      type: 'h1',
      children: convertPhraseArray(headline.phrases),
    });
  }
  sections?.forEach((section) => {
    if (section.paragraphs) {
      (section.paragraphs as ParagraphSpec[])?.forEach((paragraph) => {
        content.push(convertParagraph(paragraph));
      });
    }
  });

  return {
    content: content.length > 0 ? content : undefined,
    variableMap,
  };
};
