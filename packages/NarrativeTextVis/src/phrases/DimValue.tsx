import React from 'react';
import { Popover } from 'antd';
import cx from 'classnames';
import { isUndefined } from 'lodash';
import { BasicPhraseProps } from './interface';
import { usePhraseParser } from './usePhraseParser';

export const DimValue: React.FC<BasicPhraseProps> = ({ phrase }) => {
  const pp = usePhraseParser({ phrase });
  const children = (
    <span className={cx(pp.classNames)} style={phrase?.styles}>
      {pp.content}
    </span>
  );

  if (phrase.type === 'entity' && phrase?.metadata?.entityType === 'dim_value') {
    const detail = phrase?.metadata?.detail;
    if (detail && !isUndefined(detail?.left) && !isUndefined(detail?.op) && !isUndefined(detail?.right)) {
      return <Popover content={`${detail.left} ${detail.op} ${detail.right}`}>{children}</Popover>;
    }
  }

  return children;
};
