import React, { ReactNode } from 'react';
import { map, get, isUndefined } from 'lodash';
import cx, { Argument } from 'classnames';
import { IPhrase, IEntityType, ValueAssessment } from '@antv/text-schema';
import { CaretUpOutlined, CaretDownOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { getPrefixCls } from '../utils/getPrefixCls';

interface Props {
  spec: IPhrase[];
}

export const Phrases: React.FC<Props> = ({ spec }) => (
  <>
    {map(spec, (phrase, index) => {
      const children = (
        <span className={cx(getClassNames(phrase))} style={phrase?.styles} key={`${phrase.value}-${index}`}>
          {getText(phrase)}
        </span>
      );
      // TODO interactive of get detail
      return children;
    })}
  </>
);

/** use className to encode value */
function getClassNames(phrase: IPhrase): Argument[] {
  const classNames: Argument[] = [];
  const classNameMap: Partial<Record<IEntityType, string>> = {
    metric_name: 'metric-name',
    metric_value: 'metric-value',
    contribute_ratio: 'contribute-ratio',
    trend_desc: 'trend-desc',
    dim_value: 'dim-value',
  };
  if (phrase.type === 'entity') {
    classNames.push(getPrefixCls('value'));
    const entityCl = get(classNameMap, phrase?.metadata?.entityType);
    if (entityCl) classNames.push(getPrefixCls(entityCl));
  }
  const as = getCompareAssessment(phrase);
  if (as) classNames.push(getPrefixCls(`value-${as}`));
  return classNames;
}

function getCompareAssessment(phrase: IPhrase): ValueAssessment | null {
  const COMPARE = ['ratio_value', 'delta_value'];
  if (phrase.type === 'entity' && COMPARE.includes(phrase?.metadata?.entityType)) {
    // TODO 通过数值判断方向标记 & 处理 0 的时候
    const as = get(phrase, 'metadata.assessment', null);
    return as;
  }
  return null;
}

function getText(phrase: IPhrase): ReactNode {
  const originalData = get(phrase, 'metadata.data');
  const format = get(phrase, 'metadata.format');
  const as = getCompareAssessment(phrase);
  const str = phrase.value;
  if (!isUndefined(originalData) && !isUndefined(format)) {
    // TODO do data formatting
  }

  let prefixFlag = null;
  const entityType = get(phrase, 'metadata.entityType');
  if (entityType === 'ratio_value') {
    prefixFlag = as === 'positive' ? <CaretUpOutlined /> : <CaretDownOutlined />;
  } else if (entityType === 'delta_value') {
    prefixFlag = as === 'positive' ? <PlusOutlined /> : <MinusOutlined />;
  }

  if (prefixFlag) {
    return (
      <>
        {prefixFlag}
        {str}
      </>
    );
  }

  return str;
}
