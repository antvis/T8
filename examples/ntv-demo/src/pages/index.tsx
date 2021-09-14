import { useState, ReactNode } from 'react';
import { Radio, Divider } from 'antd';
import {
  NarrativeTextVis,
  Section,
  Paragraph,
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
        <span>Display mode of detailed data: </span>
        <Radio.Group
          optionType="button"
          buttonStyle="solid"
          options={[
            { value: 'inline', label: 'inline' },
            { value: 'tooltip', label: 'tooltip' },
          ]}
          onChange={(e) => {
            setDetailChartDisplayType(e.target.value);
          }}
          value={detailChartDisplayType}
        />
      </div>
      <Divider orientation="left">1. Phrase</Divider>
      <Design detailChartDisplayType={detailChartDisplayType} />
      <Divider orientation="left">2. Paragraph</Divider>
      <Paragraph<ModalShowDetailMeta>
        spec={{
          type: 'normal',
          phrases: [
            { type: 'text', value: 'This is a single paragraph example.' },
            {
              type: 'entity',
              value: 'trend line',
              metadata: {
                entityType: 'trend_desc',
                detail: [1, 12, 13, 15, 8, 7, 10],
              },
            },
            {
              type: 'custom',
              value: 'Custom Interactive',
              metadata: {
                interaction: 'click',
                show: 'modal',
                tableId: '0xx4',
              },
            },
          ],
          styles: {
            marginBottom: 36,
            backgroundColor: 'antiquewhite',
          },
        }}
        detailChartDisplayType={detailChartDisplayType}
        customPhraseRender={customPhraseRender}
      />
      <Divider orientation="left">3. Section</Divider>
      <Section
        spec={{
          paragraphs: [
            {
              type: 'normal',
              phrases: [
                { type: 'text', value: 'Normal Paragraph' },
                {
                  type: 'entity',
                  value: 'trend line',
                  metadata: {
                    entityType: 'trend_desc',
                    detail: [1, 12, 13, 15, 8, 7, 10],
                  },
                },
              ],
            },
            {
              type: 'bullets',
              isOrder: false,
              bullets: [
                {
                  type: 'bullet-item',
                  phrases: [{ type: 'text', value: 'Bullet one' }],
                },
                {
                  type: 'bullet-item',
                  phrases: [{ type: 'text', value: 'Bullet two' }],
                },
              ],
            },
          ],
          styles: {
            marginBottom: 36,
            backgroundColor: 'antiquewhite',
          },
        }}
        detailChartDisplayType={detailChartDisplayType}
      />
      <Divider orientation="left">4. Narrative</Divider>
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
