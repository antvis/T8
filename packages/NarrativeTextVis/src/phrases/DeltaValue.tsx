import React from 'react';
import { Popover } from 'antd';
import cx from 'classnames';
import { isArray } from 'lodash';
import numeral from 'numeral';
import { BasicPhraseProps } from './interface';
import { usePhraseParser } from './usePhraseParser';

export const DeltaValue: React.FC<BasicPhraseProps> = ({ phrase }) => {
  const pp = usePhraseParser({ phrase });
  const children = (
    <span className={cx(pp.classNames)} style={phrase?.styles}>
      {pp.type === 'delta_value' && pp.assessment === 'negative' ? '-' : ''}
      {pp.type === 'delta_value' && pp.assessment === 'positive' ? '+' : ''}
      {pp.content}
    </span>
  );
  if (phrase.type === 'entity' && phrase?.metadata?.entityType === 'delta_value') {
    const detail = phrase?.metadata?.detail;
    const format = phrase?.metadata?.format;
    if (isArray(detail) && detail.length === 2) {
      const before = format ? numeral(detail[0]).format(format) : detail[0];
      const after = format ? numeral(detail[1]).format(format) : detail[1];
      return (
        <Popover title="数据详情" content={`${before} -> ${after}`}>
          {children}
        </Popover>
      );
    }
  }
  return children;
};
