import React from 'react';
import cx from 'classnames';
import { BasicPhraseProps } from './interface';
import { usePhraseParser } from './usePhraseParser';

export const Default: React.FC<BasicPhraseProps> = ({ phrase }) => {
  const phraseParser = usePhraseParser({ phrase });
  return (
    <span className={cx(phraseParser.classNames)} style={phrase?.styles}>
      {phraseParser.content}
    </span>
  );
};
