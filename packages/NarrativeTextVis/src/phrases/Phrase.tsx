import React from 'react';
import { PhraseSpec, DefaultCustomPhraseGeneric } from '@antv/narrative-text-schema';
import { isEmpty } from 'lodash';
import { usePhraseParser } from './usePhraseParser';
import { Entity } from '../styled';
import { Custom } from './Custom';
import { classnames as cx } from '../utils/classnames';
import { WithPhraseProps, ThemeProps } from '../interface';

type PhraseProps<P extends DefaultCustomPhraseGeneric> = WithPhraseProps<P> & {
  spec: PhraseSpec<P>;
};

/** <Phrase /> can use independence */
export function Phrase<P extends DefaultCustomPhraseGeneric>({
  spec: phrase,
  customEntityEncoding,
  customPhraseRender,
  size = 'normal',
}: ThemeProps & PhraseProps<P>) {
  if (phrase.type === 'custom') {
    return <Custom<P> phrase={phrase} customPhraseRender={customPhraseRender} />;
  }

  const { styles, classNames, Content, type, assessment } = usePhraseParser({ phrase, customEntityEncoding });

  return isEmpty(styles) && classNames.length === 0 ? (
    <>{Content}</>
  ) : (
    <Entity size={size} type={type} assessment={assessment} className={cx(...classNames)} style={styles}>
      {Content}
    </Entity>
  );
}
