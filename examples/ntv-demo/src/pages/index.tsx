import React, { useState } from 'react';
import { Button, Radio } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { history } from 'umi';
import {
  NarrativeTextVis,
  ITextSpec,
  NarrativeTextVisProps,
} from '@antv/narrative-text-vis';
import { Design } from '../components/Design';
import textData from '../data/custom.json';
import './index.less';

// 热更新可能有问题，先直接引入文件
import '@antv/narrative-text-vis/es/index.css';

export default function IndexPage() {
  const [detailChartDisplayType, setDetailChartDisplayType] =
    useState<NarrativeTextVisProps['detailChartDisplayType']>('inline');
  return (
    <div className="container" style={{ maxWidth: 866, margin: '0 auto' }}>
      <div style={{ margin: '24px 0' }}>
        <span>明细数据图显示方式：</span>
        <Radio.Group
          optionType="button"
          buttonStyle="solid"
          options={[
            { value: 'inline', label: '行内' },
            { value: 'tooltip', label: '弹框' },
          ]}
          onChange={(e) => {
            setDetailChartDisplayType(e.target.value);
          }}
          value={detailChartDisplayType}
        />
      </div>
      <Design detailChartDisplayType={detailChartDisplayType} />
      <blockquote>
        {'Thanks for '}
        <a href="https://lexiodemo.narrativescience.com/apps/salesforce-demo/stories/977f56b0-6308-4dc2-bcec-023ee4aa01d0?source=pinned-metrics">
          Lexio Demo
        </a>
      </blockquote>
      <NarrativeTextVis
        spec={textData as ITextSpec}
        detailChartDisplayType={detailChartDisplayType}
      />
      <Button
        type="primary"
        icon={<ArrowRightOutlined />}
        onClick={() => history.push('/edit')}
      >
        Try edit it!
      </Button>
    </div>
  );
}
