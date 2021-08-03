/* eslint-disable no-param-reassign */
import { useEffect } from 'react';
import { Descendant } from 'slate';
import { useImmer } from 'use-immer';
import { ITextSpec } from '@antv/text-schema';
import { ITemplate } from './types';
import { text2template, headingEl2headline, elements2section } from './adaptors';

export const useEditor = (initialTextSpec?: ITextSpec) => {
  const [template, setTemplate] = useImmer<ITemplate>({});
  const [textSpec, setTextSpec] = useImmer<ITextSpec>(initialTextSpec);

  useEffect(() => {
    if (textSpec) {
      setTemplate(text2template(initialTextSpec));
    }
  }, []);

  /** 更新模版内容 */
  const update = (part: 'headline' | 'section', sliceTmp: Descendant[], sid?: number) => {
    setTemplate((draft) => {
      if (part === 'headline') {
        draft.headline = sliceTmp;
      } else if (part === 'section') {
        if (!draft?.sections) draft.sections = [];
        draft.sections[sid] = sliceTmp;
      }
    });
    setTextSpec((draft) => {
      if (part === 'headline') {
        draft.headline = headingEl2headline(sliceTmp);
      } else if (part === 'section') {
        draft.sections[sid] = elements2section(sliceTmp);
      }
    });
  };
  return { template, textSpec, update };
};
