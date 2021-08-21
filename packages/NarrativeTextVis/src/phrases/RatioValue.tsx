/* eslint-disable no-nested-ternary */
import React from 'react';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { BasicPhraseProps } from './interface';
import { usePhraseParser } from './usePhraseParser';
import { classnames as cx } from '../utils/classnames';

export const RatioValue: React.FC<BasicPhraseProps> = ({ phrase }) => {
  const phraseParser = usePhraseParser({ phrase });
  return (
    <span className={cx(phraseParser.classNames)} style={phrase?.styles}>
      {phraseParser.type === 'ratio_value' ? (
        phraseParser.assessment === 'positive' ? (
          <CaretUpOutlined />
        ) : (
          <CaretDownOutlined />
        )
      ) : null}
      {phraseParser.content}
    </span>
  );
};
