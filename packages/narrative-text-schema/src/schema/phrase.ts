import { CSSProperties } from 'react';
import { CustomMetaData } from './common';

// P used for custom phrase;
export type PhraseSpec = TextPhraseSpec | EntityPhraseSpec | CustomPhraseSpec<CustomMetaData>;

export interface TextPhraseSpec {
  type: 'text';
  value: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  styles?: CSSProperties;
}

export interface EntityPhraseSpec {
  type: 'entity';
  value?: string;
  metadata?: EntityMetaData;
  styles?: CSSProperties;
}

export interface CustomPhraseSpec<P extends CustomMetaData = CustomMetaData> {
  type: 'custom';
  value?: string;
  metadata?: P;
  styles?: CSSProperties;
}

export type ValueAssessment = 'positive' | 'negative' | 'equal';

export const EntityType = [
  /**
   * @description main indicator value 主指标名
   * @example DAU
   * */
  'metric_name',
  /**
   * @description main indicator name 主指标值
   * @example 1.23 million
   * */
  'metric_value',
  /**
   * @description other indicator value 其他指标值
   * @example
   * */
  'other_metric_value',
  /**
   * @description contribution ratio 贡献度
   * @example 23%
   * */
  'contribute_ratio',
  /**
   * @description delate value 变化值
   * @example -1.2
   * */
  'delta_value',
  /**
   * @description ratio value 变化率
   * @example +23%
   * */
  'ratio_value',
  /**
   * @description trend description 趋势描述
   * @example up/down
   * */
  'trend_desc',
  /**
   * @description dimension value 维值
   * @example sex = man
   * */
  'dim_value',
  /**
   * @description time description 时间描述
   * @example 2021-11-19
   * */
  'time_desc',
  /**
   * @description proportion 占比
   * @example 20%
   * */
  'proportion',
] as const;

export type EntityType = typeof EntityType[number];

export type EntityMetaData = {
  /**
   * entity type, 实体类型标记
   * */
  entityType: EntityType;
  /**
   * assessment up or down, used for derived value
   * 衍生指标评估参数，指定上涨或者下跌
   * */
  assessment?: ValueAssessment;
  /**
   * original data, 原始数据
   * */
  origin?: number;
  /**
   * detail data, 明细数据，用于弹框展示
   */
  detail?: unknown;
};

export type TypeOrMetaReturnType<T> = T | ((value: string, metadata: EntityMetaData) => T);

/** entity phrase encoding channel */
export type EntityEncoding<NodeType> = Partial<{
  color: TypeOrMetaReturnType<string>;
  bgColor: TypeOrMetaReturnType<string>;
  fontSize: TypeOrMetaReturnType<string | number>;
  fontWeight: TypeOrMetaReturnType<string | number>;
  underline: TypeOrMetaReturnType<boolean>;
  prefix: TypeOrMetaReturnType<NodeType>;
  suffix: TypeOrMetaReturnType<NodeType>;
  inlineChart: TypeOrMetaReturnType<NodeType>;
}>;
