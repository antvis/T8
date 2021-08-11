import React, { useEffect } from 'react';
import { Popover } from 'antd';
import cx from 'classnames';
import { isUndefined } from 'lodash';
import { BasicPhraseProps } from './interface';
import { usePhraseParser } from './usePhraseParser';

export const DimValue: React.FC<BasicPhraseProps> = ({ phrase }) => {
  const phraseParser = usePhraseParser({ phrase });

  useEffect(() => {
    if (phrase.type === 'entity' && phrase?.metadata?.entityType === 'dim_value') {
      const detail = phrase?.metadata?.detail;
      if (detail && !isUndefined(detail?.left) && !isUndefined(detail?.op) && !isUndefined(detail?.right)) {
        phraseParser.setPopoverContent(`${detail.left} ${detail.op} ${detail.right}`);
      } else {
        phraseParser.setPopoverContent(null);
      }
    } else {
      phraseParser.setPopoverContent(null);
    }
  }, [phrase]);

  const children = (
    <span className={cx(phraseParser.classNames)} style={phrase?.styles}>
      {phraseParser.content}
    </span>
  );

  return phraseParser.PopoverContent ? <Popover content={phraseParser.PopoverContent}>{children}</Popover> : children;
};
