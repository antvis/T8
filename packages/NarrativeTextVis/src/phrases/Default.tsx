import React from 'react';
import cx from 'classnames';
import { BasicPhraseProps } from './interface';
import { usePhraseParser } from './usePhraseParser';

export const Default: React.FC<BasicPhraseProps> = ({ phrase }) => {
  const pp = usePhraseParser({ phrase });
  return (
    <span className={cx(pp.classNames)} style={phrase?.styles}>
      {pp.content}
    </span>
  );
};
