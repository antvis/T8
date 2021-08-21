import React, { useEffect } from 'react';
import { Popover } from 'antd';
import { BasicPhraseProps } from './interface';
import { usePhraseParser } from './usePhraseParser';
import { isArray } from '../utils/type';
import { classnames as cx } from '../utils/classnames';

export const DeltaValue: React.FC<BasicPhraseProps> = ({ phrase }) => {
  const phraseParser = usePhraseParser({ phrase });

  useEffect(() => {
    if (phrase.type === 'entity' && phrase?.metadata?.entityType === 'delta_value') {
      const detail = phrase?.metadata?.detail;
      if (isArray(detail) && detail.length === 2) {
        const [before, after] = detail;
        phraseParser.setPopoverContent(`${before} -> ${after}`);
      } else {
        phraseParser.setPopoverContent(null);
      }
    } else {
      phraseParser.setPopoverContent(null);
    }
  }, [phrase]);

  const children = (
    <span className={cx(phraseParser.classNames)} style={phrase?.styles}>
      {phraseParser.type === 'delta_value' && phraseParser.assessment === 'negative' ? '-' : ''}
      {phraseParser.type === 'delta_value' && phraseParser.assessment === 'positive' ? '+' : ''}
      {phraseParser.content}
    </span>
  );

  return phraseParser.PopoverContent ? (
    <Popover title="数据详情" content={phraseParser.PopoverContent}>
      {children}
    </Popover>
  ) : (
    children
  );
};
