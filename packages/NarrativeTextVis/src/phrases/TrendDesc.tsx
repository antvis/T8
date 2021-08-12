import React, { useState, useEffect, ReactNode } from 'react';
import { Popover } from 'antd';
import cx from 'classnames';
import { isArray } from 'lodash';
import { usePhraseParser } from './usePhraseParser';
import { BasicPhraseProps } from './interface';
import { TrendLine } from '../charts';
import { DetailChartDisplayType } from '../interface';

interface Props extends BasicPhraseProps {
  detailChartDisplayType: DetailChartDisplayType;
}

export const TrendDesc: React.FC<Props> = ({ phrase, detailChartDisplayType }) => {
  const phraseParser = usePhraseParser({ phrase });
  const [Chart, setChart] = useState<ReactNode>(null);

  useEffect(() => {
    if (phrase.type === 'entity' && phrase?.metadata?.entityType === 'trend_desc') {
      const detail = phrase?.metadata?.detail;
      if (isArray(detail) && detail.length > 0) {
        const chart = <TrendLine data={detail} displayType={detailChartDisplayType} />;
        setChart(chart);
        if (detailChartDisplayType === 'tooltip') {
          phraseParser.setPopoverContent(chart);
        } else {
          phraseParser.setPopoverContent(null);
        }
      } else {
        setChart(null);
      }
    } else {
      phraseParser.setPopoverContent(null);
    }
  }, [phrase, detailChartDisplayType]);

  const children = (
    <span className={cx(phraseParser.classNames)} style={phrase?.styles}>
      {phraseParser.content}
      {detailChartDisplayType === 'inline' ? Chart : null}
    </span>
  );

  return Chart && detailChartDisplayType === 'tooltip' ? (
    <Popover title="数据详情" content={phraseParser.PopoverContent}>
      {children}
    </Popover>
  ) : (
    children
  );
};
