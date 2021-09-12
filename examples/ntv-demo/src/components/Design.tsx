import React from 'react';
import { Descriptions, Tag, message } from 'antd';
import { NarrativeTextVisProps, Phrase } from '@antv/narrative-text-vis';

export const Design: React.FC<{
  detailChartDisplayType: NarrativeTextVisProps['detailChartDisplayType'];
}> = ({ detailChartDisplayType }) => {
  return (
    <div style={{ marginBottom: 48 }}>
      <Descriptions title="Data marking specification" bordered size="small">
        <Descriptions.Item label="Metric Name">
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
        <Descriptions.Item label="Metric Value">
          <Phrase
            phrase={{
              type: 'entity',
              value: '901632.11',
              metadata: {
                entityType: 'metric_value',
              },
            }}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Delta Value">
          <Phrase.DeltaValue
            phrase={{
              type: 'entity',
              value: '100.33',
              metadata: {
                entityType: 'delta_value',
                assessment: 'positive',
                detail: ['120.12', '220.45'],
              },
            }}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Ratio Value">
          <Phrase.RatioValue
            phrase={{
              type: 'entity',
              value: '30%',
              metadata: {
                entityType: 'ratio_value',
                assessment: 'negative',
              },
            }}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Contribution">
          <Phrase
            phrase={{
              type: 'entity',
              value: '20%',
              metadata: {
                entityType: 'contribute_ratio',
              },
            }}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Trend">
          <Phrase.TrendDesc
            phrase={{
              type: 'entity',
              value: 'periodic',
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
        <Descriptions.Item label="Drill Down Dimension">
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
        <Descriptions.Item label="Custom">
          <Phrase.Custom<{
            popMsg: string;
          }>
            phrase={{
              type: 'custom',
              value: 'Click to say hello',
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
