import { ITextSpec, IHeadline, ISection, IPhrase } from '@antv/text-schema';
import { Text } from 'slate';
import { get, map } from 'lodash';
import { ITemplate } from '../types';

export function text2template(textSpec: ITextSpec): ITemplate {
  const template: ITemplate = {};
  if (textSpec?.headline) {
    template.headline = headline2headingEl(textSpec?.headline);
  }
  if (textSpec?.sections) {
    template.sections = map(textSpec?.sections, (section) => section2elements(section));
  }
  return template;
}

function headline2headingEl(headline: IHeadline): ITemplate['headline'] {
  return [
    {
      type: 'heading',
      children: phrases2leaf(get(headline, 'phrases', [])),
    },
  ];
}

function section2elements(section: ISection): ITemplate['sections'][number] {
  return map(section?.paragraphs, (paragraph) => {
    if (paragraph.type === 'bullets') {
      return {
        type: 'paragraph',
        children: [{ text: '' }],
      };
    }
    return {
      type: 'paragraph',
      children: phrases2leaf(get(paragraph, 'phrases', [])),
    };
  });
}

function phrases2leaf(phrases: IPhrase[]): Text[] {
  return map(phrases, (phrase) => {
    if (phrase.type === 'entity') {
      return {
        text: phrase.value,
        type: 'value',
        isVariable: true,
      };
    }
    return {
      text: phrase.value,
    };
  });
}
