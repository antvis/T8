import { HeadlineSpec, NarrativeTextSpec, ParagraphSpec, PhraseSpec } from '@antv/narrative-text-vis';
import { TDescendant } from '@udecode/plate';
import { NarrativeTextEditorProps } from '../types';

// [WIP] 将 text-schema 转换成 NarrativeVisEditor 需要的格式
export const specToEditorProps = (
  spec: NarrativeTextSpec,
): {
  content?: NarrativeTextEditorProps['initialValue'];
  variableMap: NarrativeTextEditorProps['variableMap'];
} => {
  const variableMap = {};
  const content: TDescendant[] = [];

  let variableIndex = -1;
  const phraseToEditorContent = (phrase: PhraseSpec) => {
    if (phrase.type === 'text') {
      return {
        text: phrase.value,
      };
    }
    if (phrase.type === 'entity') {
      variableIndex += 1;
      variableMap[`variable_${variableIndex}`] = {
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
        key: `variable_${variableIndex}`,
      };
    }
    return { text: '' };
  };
  const convertPhases = (phrases: PhraseSpec[]) => {
    const elements: TDescendant[] = [];
    phrases.forEach((phrase) => {
      // elements.push(phraseToEditorContent(phrase))
      if (phrase.type === 'text') {
        elements.push(phraseToEditorContent(phrase));
      } else {
        elements.push({ text: '' });
        elements.push(phraseToEditorContent(phrase));
        elements.push({ text: '' });
      }
    });
    return elements;
  };
  const { headline, sections } = spec;
  if (headline?.phrases) {
    content.push({
      type: 'h1',
      children: convertPhases(headline.phrases),
    });
  }
  sections?.forEach((section) => {
    section.paragraphs?.forEach((paragraph) => {
      if (paragraph?.type === 'normal') {
        content.push({
          type: 'p',
          children: convertPhases(paragraph.phrases),
        });
      }
      if (paragraph?.type === 'bullets') {
        const bullets = paragraph.bullets.map((bullet) => {
          return {
            type: 'li',
            children: convertPhases(bullet.phrases),
          };
        });
        content.push({
          type: 'ul',
          children: bullets,
        });
      }
    });
  });

  return {
    content: content.length > 0 ? content : undefined,
    variableMap,
  };
};

// [WIP] 将 NarrativeVisEditor 的 content value 转换为 text-schema
export const editorPropsToSpec = (elements: TDescendant[]) => {
  // TODO 对于已知类型，PhraseSpec， HeadlineSpec， ParagraphSpec 可以转换；转换到 custom Spec 还有问题
  const convertElement = (element: TDescendant) => {
    const getChildrenPhrases = (children: TDescendant[]) => {
      return children?.map((child) => convertElement(child) as PhraseSpec).filter((phrase: PhraseSpec) => phrase);
    };

    switch (element.type) {
      case 'variable':
        return {
          type: 'entity',
          value: element.value,
          metadata: element.metadata,
        };
      case 'h1':
        return {
          type: 'headline',
          phrases: getChildrenPhrases(element.children),
        };
      case 'p':
        return {
          type: 'normal',
          phrases: getChildrenPhrases(element.children),
        };
      case 'ul':
        return {
          type: 'bullets',
          isOrder: false,
          bullets: getChildrenPhrases(element.children),
        };
      case 'ol':
        return {
          type: 'bullets',
          isOrder: false,
          bullets: getChildrenPhrases(element.children),
        };
      case 'li':
        // TODO 编辑后会变成 children 是 lic 类型的，目前还不能转换
        return {
          type: 'bullet-item',
          phrases: getChildrenPhrases(element.children),
        };
      default:
        if (element.text) {
          return {
            type: 'text',
            value: element.text,
          };
        }
        return null;
    }
  };

  const spec: NarrativeTextSpec = {
    // TODO editor 中什么元素对应 sections
    sections: [
      {
        paragraphs: [],
      },
    ],
  };
  for (let i = 0; i < elements.length; i += 1) {
    const element = elements[i];
    // 处理块级元素外层结构
    switch (element.type) {
      case 'h1':
        spec.headline = (convertElement(element) as HeadlineSpec) ?? undefined;
        break;
      case 'p':
      case 'ul':
      case 'ol':
        spec.sections?.[0].paragraphs?.push(convertElement(element) as ParagraphSpec);
        break;
      default:
        break;
    }
  }
  return spec;
};
