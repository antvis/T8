import React from 'react';
import { Popover } from 'antd';
import cx from 'classnames';
import { isArray } from 'lodash';
import { TrendLine } from '../charts';
import { usePhraseParser } from './usePhraseParser';
import { BasicPhraseProps } from './interface';
import { DetailChartDisplayType } from '../interface';

interface Props extends BasicPhraseProps {
  detailChartDisplayType: DetailChartDisplayType;
}

export const TrendDesc: React.FC<Props> = ({ phrase, detailChartDisplayType }) => {
  const pp = usePhraseParser({ phrase });
  let chart = null;
  if (phrase.type === 'entity' && phrase?.metadata?.entityType === 'trend_desc') {
    const detail = phrase?.metadata?.detail;
    if (isArray(detail) && detail.length > 0) {
      chart = <TrendLine data={detail} displayType={detailChartDisplayType} />;
    }
  }

  const children = (
    <span className={cx(pp.classNames)} style={phrase?.styles}>
      {pp.content}
      {detailChartDisplayType === 'inline' ? chart : null}
    </span>
  );

  if (chart && detailChartDisplayType === 'tooltip') {
    // pp.includesPopCls();
    return (
      <Popover title="数据详情" content={chart}>
        {children}
      </Popover>
    );
  }

  return children;
};
