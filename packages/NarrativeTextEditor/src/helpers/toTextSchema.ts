import type { HeadlineSpec, NarrativeTextSpec, ParagraphSpec, PhraseSpec } from '@antv/narrative-text-vis';
import type { TDescendant } from '@udecode/plate-core';

// convert the content value of NarrativeVisEditor to text-schema
export const editorPropsToSpec = (elements: TDescendant[]) => {
  const convertElement = (element: TDescendant) => {
    const getChildren = (children: TDescendant[]): PhraseSpec[] => {
      return children?.map((child) => convertElement(child) as PhraseSpec).filter((phrase: PhraseSpec) => phrase);
    };

    switch (element?.type) {
      case 'variable':
        return {
          type: 'entity',
          value: element.value,
          metadata: {
            ...element.metadata,
            sourceId: element.key,
          },
        };
      case 'h1':
        return {
          type: 'headline',
          phrases: getChildren(element.children),
        };
      case 'p':
        return {
          type: 'normal',
          phrases: getChildren(element.children),
        };
      case 'ul':
        return {
          type: 'bullets',
          isOrder: false,
          bullets: getChildren(element.children),
        };
      case 'ol':
        return {
          type: 'bullets',
          isOrder: true,
          bullets: getChildren(element.children),
        };
      case 'li': {
        const phraseChildren: TDescendant[] = [];
        let subBulletChild;
        element.children?.forEach((child: TDescendant) => {
          // 编辑后会变成 children 是 lic 类型的, 特殊处理
          if (child.type === 'lic' && child.children?.length > 0) {
            phraseChildren.push(...child.children);
          } else if (child.type === 'ul' || child.type === 'ol') {
            subBulletChild = child;
          } else {
            phraseChildren.push(child);
          }
        });
        return {
          type: 'bullet-item',
          phrases: getChildren(phraseChildren),
          subBullet: subBulletChild && convertElement(subBulletChild),
        };
      }
      default: {
        // TODO test custom elements
        if (element.text) {
          return {
            ...element,
            type: 'text',
            value: element.text,
          };
        }
        return {
          ...element,
        };
      }
    }
  };

  const paragraphs: ParagraphSpec[] = [];
  const spec: NarrativeTextSpec = {
    headline: undefined,
    // the main body of editor content to one section
    sections: [
      {
        paragraphs,
      },
    ],
  };
  for (let i = 0; i < elements.length; i += 1) {
    const element = elements[i];
    // 处理块级元素外层结构
    switch (element.type) {
      case 'h1': {
        const headlineSpec = convertElement(element);
        if (!spec.headline && headlineSpec) {
          spec.headline = headlineSpec as HeadlineSpec;
        } else {
          paragraphs.push(headlineSpec as ParagraphSpec);
        }
        break;
      }
      case 'p':
      case 'ul':
      case 'ol':
        paragraphs.push(convertElement(element) as ParagraphSpec);
        break;
      default:
        break;
    }
  }
  return spec;
};
