import React from 'react';
import { Descriptions } from 'antd';
import { NarrativeTextVisProps, Phrase } from '@antv/narrative-text-vis';

const Design: React.FC<
  Partial<Pick<NarrativeTextVisProps, 'customEntityEncoding'>>
> = ({ customEntityEncoding }) => {
  return (
    <div style={{ marginBottom: 48 }}>
      <Descriptions title="Data marking specification" bordered size="small">
        <Descriptions.Item label="Metric Name">
          <Phrase
            spec={{
              type: 'entity',
              value: 'DAU',
              metadata: {
                entityType: 'metric_name',
              },
            }}
            customEntityEncoding={customEntityEncoding}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Metric Value">
          <Phrase
            spec={{
              type: 'entity',
              value: '901632.11',
              metadata: {
                entityType: 'metric_value',
              },
            }}
            customEntityEncoding={customEntityEncoding}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Other Metric Value">
          <Phrase
            spec={{
              type: 'entity',
              value: '30%',
              metadata: {
                entityType: 'other_metric_value',
              },
            }}
            customEntityEncoding={customEntityEncoding}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Delta Value">
          <Phrase
            spec={{
              type: 'entity',
              value: '100.33',
              metadata: {
                entityType: 'delta_value',
                assessment: 'positive',
                detail: ['120.12', '220.45'],
              },
            }}
            customEntityEncoding={customEntityEncoding}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Ratio Value">
          <Phrase
            spec={{
              type: 'entity',
              value: '30%',
              metadata: {
                entityType: 'ratio_value',
                assessment: 'negative',
              },
            }}
            customEntityEncoding={customEntityEncoding}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Contribution">
          <Phrase
            spec={{
              type: 'entity',
              value: '20%',
              metadata: {
                entityType: 'contribute_ratio',
              },
            }}
            customEntityEncoding={customEntityEncoding}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Trend Description">
          <Phrase
            spec={{
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
            customEntityEncoding={customEntityEncoding}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Drill Down Dimension">
          <Phrase
            spec={{
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
            customEntityEncoding={customEntityEncoding}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Time Description">
          <Phrase
            spec={{
              type: 'entity',
              value: '2021-10-11',
              metadata: {
                entityType: 'time_desc',
              },
            }}
            customEntityEncoding={customEntityEncoding}
          />
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default Design;
