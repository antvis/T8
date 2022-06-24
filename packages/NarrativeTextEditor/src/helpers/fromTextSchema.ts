import type {
  BulletsParagraphSpec,
  CustomMetaData,
  HeadingParagraphSpec,
  NarrativeTextSpec,
  ParagraphSpec,
  PhraseSpec,
  TextParagraphSpec,
} from '@antv/narrative-text-vis';
import type { TDescendant } from '@udecode/plate';
import type { VariableMap, NarrativeTextEditorProps } from '../types';

/**
 * Convert text-schema to the props of NarrativeVisEditor
 * 将 text-schema 转换成 NarrativeVisEditor 需要的格式
 * @param spec T8 text-schema
 * @returns
 */
export const specToEditorProps = (
  spec: NarrativeTextSpec,
): {
  content?: NarrativeTextEditorProps['initialValue'];
  variableMap: VariableMap;
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
        // if there isn't sourceId in phrase, use the index
        const variableKey = (phrase.metadata as any)?.sourceId || `variable_${(variableIndex += 1)}`;
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
        return {
          ...phrase,
          children: [
            {
              text: '',
            },
          ],
          key: phrase.metadata?.customType,
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

  // convert block elements
  const convertParagraph = (paragraph: ParagraphSpec): TDescendant => {
    if (!paragraph || typeof paragraph !== 'object') return { text: ' ' };
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
            children: convertPhraseArray(phrases).concat(subBullet ? convertParagraph(subBullet) || [] : []),
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
        return {
          ...paragraph,
          key: (paragraph as CustomMetaData)?.customType,
        };
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
        if (paragraph) {
          content.push(convertParagraph(paragraph));
        }
      });
    }
  });

  return {
    content: content.length > 0 ? content : undefined,
    variableMap,
  };
};
