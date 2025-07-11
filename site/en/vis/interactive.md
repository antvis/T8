---
title: Interactive Analysis
---

# Interactive Analysis

T8 provides powerful interactive analysis capabilities that allow users to explore and analyze data through customizable text and visualizations.

## Basic Example

The following example demonstrates how to create an interactive analysis interface with:

- Date comparison selection
- Trend description customization
- Chart type switching
- Insight input

```jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import moment from 'moment';
import Mock from 'mockjs';
import { isEqual } from 'lodash';
import { Spin, DatePicker, Select, message, Input } from 'antd';
import { RedditOutlined } from '@ant-design/icons';
import * as Charts from '@antv/g2plot';
import {
  NarrativeTextVis,
  PluginManager,
  createCustomPhraseFactory,
  createCustomBlockFactory,
} from '@antv/narrative-text-vis';

const DATE_FORMAT = 'YYYY.MM.DD';
const mockData = Array.from({ length: 100 }, (v, i) => ({
  date: moment().subtract(i, 'day').format(DATE_FORMAT),
  gmv: Mock.mock('@float(10, 100, 2, 2)'),
}));

// Mock API request
function fetchData(compareDate = moment().subtract(1, 'week').format(DATE_FORMAT)) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const baseData = mockData[0];
      const compareData = mockData.find((item) => item.date === compareDate);
      const deltaValue = baseData.gmv - compareData.gmv;
      const ratioValue = deltaValue / baseData.gmv;
      function getAssessment(value) {
        return value > 0 ? 'positive' : 'negative';
      }
      resolve({
        sections: [
          {
            key: 'insight',
            paragraphs: [
              {
                type: 'normal',
                key: 'explain',
                phrases: [
                  { type: 'text', value: 'On ' },
                  { type: 'entity', value: baseData.date, metadata: { entityType: 'time_desc' } },
                  { type: 'text', value: ', ' },
                  { type: 'entity', value: 'GMV', metadata: { entityType: 'metric_name' } },
                  { type: 'text', value: ' was ' },
                  { type: 'entity', value: `${baseData.gmv}M`, metadata: { entityType: 'metric_value' } },
                  { type: 'text', value: '. Compared to the base date ' },
                  {
                    type: 'custom',
                    value: compareDate,
                    metadata: {
                      customType: 'compare_date',
                      // Server specifies allowed date range for user selection
                      allowRange: [0, 30],
                    },
                  },
                  { type: 'text', value: ', it ' },
                  { type: 'text', value: deltaValue > 0 ? 'increased by ' : 'decreased by ' },
                  {
                    type: 'entity',
                    value: `${Math.abs(deltaValue).toFixed(2)}M`,
                    metadata: { entityType: 'delta_value', assessment: getAssessment(deltaValue) },
                  },
                  { type: 'text', value: ' (' },
                  {
                    type: 'entity',
                    value: `${(Math.abs(ratioValue) * 100).toFixed(2)}%`,
                    metadata: { entityType: 'ratio_value', assessment: getAssessment(ratioValue) },
                  },
                  { type: 'text', value: ') with a ' },
                  {
                    type: 'custom',
                    value: '',
                    metadata: { customType: 'gmv_trend_desc', options: ['significant', 'moderate', 'negligible'] },
                  },
                  { type: 'text', value: ' trend. The main contributing factors are: ' },
                  {
                    type: 'custom',
                    value: Mock.mock('@sentence(10, 20)'),
                    metadata: { customType: 'gmv_insight' },
                  },
                ],
              },
              {
                customType: 'plot',
                key: 'plot',
                // Server specifies available chart types for switching
                chartTypes: ['Line', 'Scatter'],
                data: mockData,
              },
            ],
          },
        ],
      });
    }, 500);
  });
}

const Chart = ({ chartTypes, config }) => {
  const container = useRef();
  const plot = useRef();
  const prevConfig = useRef(config);
  const [chatType, setChartType] = useState(chartTypes[0]);

  useEffect(() => {
    if (container.current) {
      // Check if plot needs to be destroyed and recreated based on config changes
      if (plot.current) {
        if (isEqual(prevConfig.current, config)) return;
        plot?.current?.destroy();
      }
      plot.current = new Charts[chatType](container.current, config);
      prevConfig.current = config;
      plot.current.render();
    }
  }, [config]);

  // Always re-render when chart type changes
  useEffect(() => {
    if (plot.current) plot?.current?.destroy();
    if (container.current) {
      plot.current = new Charts[chatType](container.current, config);
      plot.current.render();
    }
  }, [chatType]);

  return (
    <>
      <div style={{ textAlign: 'right', marginBottom: 12 }}>
        <Select
          bordered={false}
          value={chatType}
          style={{ width: 100 }}
          options={chartTypes.map((t) => ({ label: t, value: t }))}
          onChange={(value) => {
            setChartType(value);
          }}
        />
      </div>
      <div ref={container}></div>
    </>
  );
};

export default () => {
  const [loading, setLoading] = useState(false);
  const [textSpec, setTextSpec] = useState({});
  const [pluginManager] = useState(new PluginManager());

  const getTextSpecFormServer = useCallback((compareDate) => {
    setLoading(true);
    fetchData(compareDate).then((spec) => {
      setTextSpec(spec);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    getTextSpecFormServer();
    pluginManager.registerAll([
      createCustomBlockFactory({
        key: 'plot',
        render(metadata) {
          return (
            <Chart
              chartTypes={metadata.chartTypes}
              config={{
                data: metadata.data,
                padding: 'auto',
                xField: 'date',
                yField: 'gmv',
              }}
            />
          );
        },
      }),
      createCustomPhraseFactory({
        key: 'compare_date',
        overwrite: (node, value, metadata) => {
          const disabledDate = (current) => {
            if (!current) return false;
            const { allowRange } = metadata;
            return (
              current > moment().subtract(allowRange[0], 'day').endOf('day') ||
              current < moment().subtract(allowRange[1], 'day').endOf('day')
            );
          };
          return (
            <DatePicker
              style={{ width: '120px', textDecoration: 'underline' }}
              size="small"
              disabledDate={disabledDate}
              defaultValue={moment(value)}
              format={`(${DATE_FORMAT})`}
              onChange={(date) => getTextSpecFormServer(moment(date).format(DATE_FORMAT))}
              bordered={false}
            />
          );
        },
      }),
      createCustomPhraseFactory({
        key: 'gmv_trend_desc',
        overwrite: (node, value, metadata) => {
          return (
            <Select
              size="small"
              style={{ padding: 0 }}
              bordered={false}
              options={metadata.options.map((t) => ({ label: t, value: t }))}
              defaultValue={metadata.options[0]}
              dropdownMatchSelectWidth={false}
              onChange={(value) => {
                message.info(`User wants to describe as ${value}`);
              }}
            />
          );
        },
      }),
      createCustomPhraseFactory({
        key: 'gmv_insight',
        overwrite: (node, value, metadata) => {
          return (
            <Input
              size="small"
              style={{ width: '200px', borderBottom: '1px dashed #ccc' }}
              bordered={false}
              defaultValue={value}
              placeholder="Enter insight"
              prefix={<RedditOutlined style={{ opacity: 0.45 }} />}
            />
          );
        },
      }),
    ]);
  }, []);

  return (
    <Spin spinning={loading}>
      <NarrativeTextVis spec={textSpec} pluginManager={pluginManager} />
    </Spin>
  );
};
```

## Interactive Features

### Date Comparison

Users can select a comparison date within a specified range using a date picker. The text and visualizations will update automatically to show the comparison between the selected date and the current date.

### Trend Description

Users can choose from predefined trend descriptions (significant, moderate, negligible) to better describe the data changes. This helps in providing more accurate and meaningful insights.

### Chart Type Switching

The visualization can be switched between different chart types (Line, Scatter) to view the data from different perspectives.

### Insight Input

Users can input their own insights about the data using a text input field. This allows for capturing user observations and analysis directly in the narrative.
