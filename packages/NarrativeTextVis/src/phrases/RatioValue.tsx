/* eslint-disable no-nested-ternary */
import React from 'react';
import cx from 'classnames';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { BasicPhraseProps } from './interface';
import { usePhraseParser } from './usePhraseParser';

export const RatioValue: React.FC<BasicPhraseProps> = ({ phrase }) => {
  const pp = usePhraseParser({ phrase });
  return (
    <span className={cx(pp.classNames)} style={phrase?.styles}>
      {pp.type === 'ratio_value' ? pp.assessment === 'positive' ? <CaretUpOutlined /> : <CaretDownOutlined /> : null}
      {pp.content}
    </span>
  );
};
