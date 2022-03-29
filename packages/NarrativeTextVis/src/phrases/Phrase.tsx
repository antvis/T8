import React from 'react';
import { IPhrase, DefaultCustomPhraseGeneric } from '@antv/narrative-text-schema';
import { isEmpty } from 'lodash';
import { usePhraseParser } from './usePhraseParser';
import { Custom } from './Custom';
import { classnames as cx } from '../utils/classnames';
import { WithPhraseProps } from '../interface';

type PhraseProps<P extends DefaultCustomPhraseGeneric> = WithPhraseProps<P> & {
  spec: IPhrase<P>;
};

/** <Phrase /> can use independence */
export function Phrase<P extends DefaultCustomPhraseGeneric>({
  spec: phrase,
  customEntityEncoding,
  customPhraseRender,
}: PhraseProps<P>) {
  if (phrase.type === 'custom') {
    return <Custom<P> phrase={phrase} customPhraseRender={customPhraseRender} />;
  }

  const { styles, classNames, Content } = usePhraseParser({ phrase, customEntityEncoding });

  return isEmpty(styles) && classNames.length === 0 ? (
    <>{Content}</>
  ) : (
    <span className={cx(...classNames)} style={styles}>
      {Content}
    </span>
  );
}
