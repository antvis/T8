import { ITextSpec, IHeadline, ISection, IPhrase } from '@antv/text-schema';
import { Text } from 'slate';
import { get, map } from 'lodash';
import { ITemplate } from '../types';

export function template2text(template: ITemplate): ITextSpec {
  const textSpec: ITextSpec = {};
  if (template?.headline) {
    textSpec.headline = headingEl2headline(template?.headline);
  }
  if (template?.sections) {
    textSpec.sections = map(template?.sections, (section) => elements2section(section));
  }
  return textSpec;
}

export function headingEl2headline(heading: ITemplate['headline']): IHeadline {
  return {
    type: 'headline',
    phrases: leaf2phrases(get(heading, '0.children', [])),
  };
}

export function elements2section(elements: ITemplate['sections'][number]): ISection {
  const paragraphs: ISection['paragraphs'] = map(elements, (el) => {
    // bullets
    if (el) {
      // return {
      //   type: 'paragraph',
      //   children: [{ text: '' }],
      // };
    }
    return {
      type: 'normal',
      phrases: leaf2phrases(get(el, 'children', [])),
    };
  });

  return {
    paragraphs,
  };
}

function leaf2phrases(leafs: Text[]): IPhrase[] {
  return map(leafs, (leaf) => {
    if ('isVariable' in leaf && leaf.isVariable) {
      return {
        type: 'entity',
        value: leaf.text,
        metadata: {
          entityType: 'value',
        },
      };
    }
    return {
      type: 'text',
      value: leaf.text,
    };
  });
}
