import { ReactNode, useState, useEffect } from 'react';
import { IPhrase } from '@antv/text-schema';
import { remove } from 'lodash';
import { parsePhrase, PhraseParser } from '../utils/phrase-parser';
import { getPrefixCls } from '../utils/getPrefixCls';

export const usePhraseParser = ({ phrase }: { phrase: IPhrase }) => {
  const phraseParser = parsePhrase(phrase);
  const [classNames, setClassNames] = useState<PhraseParser['classNames']>(phraseParser.classNames);
  const [PopoverContent, setPopoverContent] = useState<ReactNode>(null);

  /**
   * push popover class to remind user:
   * You can hover here!
   */
  useEffect(() => {
    const popCls = getPrefixCls('popover-marker');
    if (PopoverContent) {
      if (!classNames.includes(popCls)) setClassNames([...classNames, popCls]);
    } else {
      const index = classNames.indexOf(popCls);
      if (index > -1) setClassNames(remove(classNames, (n) => n !== popCls));
    }
  }, [PopoverContent]);

  return {
    ...phraseParser,
    classNames,
    content: phraseParser.content,
    PopoverContent,
    setPopoverContent,
  };
};
