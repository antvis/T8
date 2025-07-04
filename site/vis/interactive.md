---
title: 分析交互
order: 6
group:
  path: /example
  title: 使用示例
  order: 1
nav:
  title: 解读文本可视化
  path: /narrative
  order: 2
---

## 洞察分析

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

// 模拟后端请求返回数据
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
                  { type: 'text', value: '当日 ' },
                  { type: 'entity', value: baseData.date, metadata: { entityType: 'time_desc' } },
                  { type: 'text', value: ' ' },
                  { type: 'entity', value: 'GMV', metadata: { entityType: 'metric_name' } },
                  { type: 'text', value: ' ' },
                  { type: 'entity', value: `${baseData.gmv} 万`, metadata: { entityType: 'metric_value' } },
                  { type: 'text', value: '，对比基准日期' },
                  {
                    type: 'custom',
                    value: compareDate,
                    metadata: {
                      customType: 'compare_date',
                      // 服务端告诉客户端只允许用户选择的时间范围
                      allowRange: [0, 30],
                    },
                  },
                  {
                    type: 'entity',
                    value: `${Math.abs(deltaValue).toFixed(2)} 万`,
                    metadata: { entityType: 'delta_value', assessment: getAssessment(deltaValue) },
                  },
                  { type: 'text', value: '（' },
                  {
                    type: 'entity',
                    value: `${(Math.abs(ratioValue) * 100).toFixed(2)}%`,
                    metadata: { entityType: 'ratio_value', assessment: getAssessment(ratioValue) },
                  },
                  { type: 'text', value: '）' },
                  { type: 'text', value: deltaValue > 0 ? '增加 ' : '减少 ' },
                  {
                    type: 'custom',
                    value: '',
                    metadata: { customType: 'gmv_trend_desc', options: ['明显', '平缓', '可忽略不计'] },
                  },
                  { type: 'text', value: '。主要影响因素是：' },
                  {
                    type: 'custom',
                    value: Mock.mock('@csentence(10, 20)'),
                    metadata: { customType: 'gmv_insight' },
                  },
                ],
              },
              {
                customType: 'plot',
                key: 'plot',
                // 服务端告诉前端可选的图表类型范围，用于切换
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
      // 在局部刷新机制下，判断如果有 plot 需要比对 config 然后进行销毁
      if (plot.current) {
        if (isEqual(prevConfig.current, config)) return;
        plot?.current?.destroy();
      }
      plot.current = new Charts[chatType](container.current, config);
      prevConfig.current = config;
      plot.current.render();
    }
  }, [config]);

  // 如果是图表类型变化，必然重新渲染
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
          return null;
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
                message.info(`用户希望描述为 ${value}`);
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
              placeholder="请输入洞见"
              prefix={<RedditOutlined style={{ opacity: 0.45 }} />}
            />
          );
        },
      }),
    ]);
  }, [getTextSpecFormServer]);

  return <NarrativeTextVis spec={textSpec} pluginManager={pluginManager} />;
};
```

## 图表联动

hover 文本内容，高亮对应数据饼图区块。

🚧 TODO 图表联动文本显示，需完善状态系统，eg active，规范状态显示样式

<style>
  .hover-g2plot-pie {
    cursor: pointer;
    margin-bottom: 2px;
  }
  .hover-g2plot-pie:hover {
    background-color: #EEF7FF;
  }
</style>

```jsx
import React, { useRef, useEffect } from 'react';
import { Pie } from '@antv/g2plot';
import { NarrativeTextVis } from '@antv/narrative-text-vis';
import { get } from 'lodash';

const data = [
  { city: '北京', mau: 1000, rc: +0.12 },
  { city: '上海', mau: 800, rc: -0.22 },
  { city: '广州', mau: 600, rc: +0.02 },
];

const textSpec = {
  sections: [
    {
      paragraphs: [
        {
          type: 'normal',
          phrases: [{ type: 'text', value: '各城市数据表现是:' }],
        },
        {
          type: 'bullets',
          isOrder: true,
          bullets: data.map((item) => ({
            type: 'bullet-item',
            className: 'hover-g2plot-pie',
            phrases: [
              { type: 'entity', value: item.city, metadata: { entityType: 'dim_value' } },
              { type: 'text', value: ' 的 ' },
              { type: 'entity', value: 'MAU', metadata: { entityType: 'metric_name' } },
              { type: 'text', value: ' 是 ' },
              { type: 'entity', value: item.mau, metadata: { entityType: 'metric_value' } },
              { type: 'text', value: ' 环比 ' },
              {
                type: 'entity',
                value: Math.abs(item.rc) * 100 + '%',
                metadata: { entityType: 'ratio_value', assessment: item.rc > 0 ? 'positive' : 'negative' },
              },
              { type: 'text', value: '。' },
            ],
          })),
        },
      ],
    },
  ],
};

export default () => {
  const chartContainerRef = useRef();
  const chartRef = useRef();

  useEffect(() => {
    if (chartContainerRef.current) {
      chartRef.current = new Pie(chartContainerRef.current, {
        data,
        angleField: 'mau',
        colorField: 'city',
        padding: 20,
      });
      chartRef.current.render();
    }
  }, []);

  const onMouseEnterParagraph = (spec) => {
    if (chartRef.current) {
      const type = get(spec, 'phrases[0].value');
      chartRef.current.setState('selected', (datum) => datum.city === type);
      chartRef.current.setState('selected', (datum) => datum.city !== type, false);
    }
  };
  const onMouseLeaveParagraph = () => {
    if (chartRef.current) {
      chartRef.current.setState('selected', () => true, false);
    }
  };
  return (
    <>
      <NarrativeTextVis
        spec={textSpec}
        onMouseEnterParagraph={onMouseEnterParagraph}
        onMouseLeaveParagraph={onMouseLeaveParagraph}
      />
      <div ref={chartContainerRef}></div>
    </>
  );
};
```
