import React, { useEffect } from 'react';
import { Popover } from 'antd';
import cx from 'classnames';
import { isUndefined } from 'lodash';
import { BasicPhraseProps } from './interface';
import { usePhraseParser } from './usePhraseParser';

export const DimValue: React.FC<BasicPhraseProps> = ({ phrase }) => {
  const pp = usePhraseParser({ phrase });

  useEffect(() => {
    if (phrase.type === 'entity' && phrase?.metadata?.entityType === 'dim_value') {
      const detail = phrase?.metadata?.detail;
      if (detail && !isUndefined(detail?.left) && !isUndefined(detail?.op) && !isUndefined(detail?.right)) {
        pp.setPopoverContent(`${detail.left} ${detail.op} ${detail.right}`);
      } else {
        pp.setPopoverContent(null);
      }
    } else {
      pp.setPopoverContent(null);
    }
  }, [phrase]);

  const children = (
    <span className={cx(pp.classNames)} style={phrase?.styles}>
      {pp.content}
    </span>
  );

  return pp.PopoverContent ? <Popover content={pp.PopoverContent}>{children}</Popover> : children;
};
