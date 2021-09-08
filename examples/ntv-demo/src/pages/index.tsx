import { useState, ReactNode } from 'react';
import { Button, Radio } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { history } from 'umi';
import {
  NarrativeTextVis,
  ITextSpec,
  NarrativeTextVisProps,
  ICustomPhrase,
} from '@antv/narrative-text-vis';
import { Design } from '../components/Design';
import {
  ModalShowDetail,
  ModalShowDetailMeta,
} from '../components/ModalShowDetail';
import booking from '../data/booking.json';
import './index.less';

export default function IndexPage() {
  const [detailChartDisplayType, setDetailChartDisplayType] =
    useState<NarrativeTextVisProps['detailChartDisplayType']>('inline');

  const customPhraseRender = (
    phrase: ICustomPhrase<ModalShowDetailMeta>,
  ): ReactNode => {
    if (
      phrase.metadata?.interaction === 'click' &&
      phrase.metadata?.show === 'modal'
    ) {
      return <ModalShowDetail phrase={phrase} />;
    }
    return null;
  };

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
        <a
          target="_blank"
          href="https://lexiodemo.narrativescience.com/apps/salesforce-demo/stories/977f56b0-6308-4dc2-bcec-023ee4aa01d0?source=pinned-metrics"
        >
          Lexio Demo
        </a>
      </blockquote>
      <NarrativeTextVis<ModalShowDetailMeta>
        spec={booking as ITextSpec<ModalShowDetailMeta>}
        detailChartDisplayType={detailChartDisplayType}
        customPhraseRender={customPhraseRender}
      />
    </div>
  );
}
