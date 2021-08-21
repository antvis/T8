import React from 'react';
import { BasicPhraseProps } from './interface';
import { usePhraseParser } from './usePhraseParser';
import { classnames as cx } from '../utils/classnames';

export const Default: React.FC<BasicPhraseProps> = ({ phrase }) => {
  const phraseParser = usePhraseParser({ phrase });
  return phrase?.styles || phraseParser.classNames.length > 0 ? (
    <span className={cx(phraseParser.classNames)} style={phrase?.styles}>
      {phraseParser.content}
    </span>
  ) : (
    <>{phraseParser.content}</>
  );
};
