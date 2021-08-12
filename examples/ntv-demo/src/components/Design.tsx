import React from 'react';
import { Descriptions, Tag, message } from 'antd';
import { NarrativeTextVisProps, Phrase } from '@antv/narrative-text-vis';

export const Design: React.FC<{
  detailChartDisplayType: NarrativeTextVisProps['detailChartDisplayType'];
}> = ({ detailChartDisplayType }) => {
  return (
    <div style={{ marginBottom: 48 }}>
      <Descriptions title="数据标记规范" bordered size="small">
        <Descriptions.Item label="指标">
          <Phrase
            phrase={{
              type: 'entity',
              value: 'DAU',
              metadata: {
                entityType: 'metric_name',
              },
            }}
          />
        </Descriptions.Item>
        <Descriptions.Item label="指标值">
          <Phrase
            phrase={{
              type: 'entity',
              metadata: {
                entityType: 'metric_value',
                data: 901632.11,
                format: '0.0a',
              },
            }}
          />
        </Descriptions.Item>
        <Descriptions.Item label="差值">
          <Phrase.DeltaValue
            phrase={{
              type: 'entity',
              metadata: {
                entityType: 'delta_value',
                data: 100.33,
                format: '0.0',
                detail: [120.12, 220.45],
              },
            }}
          />
        </Descriptions.Item>
        <Descriptions.Item label="比率">
          <Phrase.RatioValue
            phrase={{
              type: 'entity',
              metadata: {
                entityType: 'ratio_value',
                data: -0.034,
                format: '0.0%',
              },
            }}
          />
        </Descriptions.Item>
        <Descriptions.Item label="贡献度">
          <Phrase
            phrase={{
              type: 'entity',
              metadata: {
                entityType: 'contribute_ratio',
                data: 0.05,
                format: '0.0%',
              },
            }}
          />
        </Descriptions.Item>
        <Descriptions.Item label="趋势描述">
          <Phrase.TrendDesc
            phrase={{
              type: 'entity',
              value: '周期性',
              metadata: {
                entityType: 'trend_desc',
                detail: [
                  264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592,
                  492, 467, 513, 546, 983, 340, 539, 243, 226, 192,
                ],
              },
            }}
            detailChartDisplayType={detailChartDisplayType || 'inline'}
          />
        </Descriptions.Item>
        <Descriptions.Item label="维值条件">
          <Phrase.DimValue
            phrase={{
              type: 'entity',
              value: '北京',
              metadata: {
                entityType: 'dim_value',
                detail: {
                  left: '城市',
                  op: '=',
                  right: '北京',
                },
              },
            }}
          />
        </Descriptions.Item>
        <Descriptions.Item label="自定义">
          <Phrase.Custom<{
            popMsg: string;
          }>
            phrase={{
              type: 'custom',
              value: '点击 say hello',
              metadata: {
                popMsg: '👋 hello',
              },
              styles: {
                cursor: 'pointer',
              },
            }}
            customPhraseRender={(phrase) => (
              <Tag
                color="purple"
                onClick={() => {
                  message.success(phrase?.metadata?.popMsg);
                }}
                style={{ cursor: 'pointer' }}
              >
                {phrase.value}
              </Tag>
            )}
          />
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};
