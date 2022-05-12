import { useState } from 'react';
import { Form, InputNumber } from 'antd';
import '@antv/word-scale-chart';
import AnchorLayout from '../components/AnchorLayout';
import ContentBlock from '../components/ContentBlock';
// import HighlightCode from '../components/HighlightCode';
import getAnchors from '../utils/get-anchors';

const anchors = getAnchors('ws-chart', ['proportion-pie', 'paragraph']);

export default function WSChartPage() {
  const [fontSize, setFontSize] = useState<number>(14);
  return (
    <AnchorLayout anchorLinks={anchors}>
      <ContentBlock id={anchors[0].id} title={anchors[0].title}>
        <Form.Item label="Font Size">
          <InputNumber
            min={12}
            style={{ margin: '0 16px' }}
            value={fontSize}
            onChange={(e) => {
              setFontSize(e);
            }}
          />
        </Form.Item>
        <div style={{ fontSize }}>
          {generatePercentValues().map((value) => (
            <>
              {(value * 100).toFixed(2) + '%'}
              <wsc-proportion key={value} data={value} size={fontSize} />
            </>
          ))}
        </div>
      </ContentBlock>
    </AnchorLayout>
  );
}

function generatePercentValues(step: number = 0.15) {
  const start = 0;
  const result = [];
  result.push(start - step);
  for (let i = start; i <= 1 + step; i += step) {
    result.push(i);
  }
  return result;
}
