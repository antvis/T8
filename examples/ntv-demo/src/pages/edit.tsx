import { Row, Col } from 'antd';
import { ITextSpec } from '@antv/narrative-text-vis';
import { NarrativeTextVis } from '@antv/narrative-text-vis';
import { TextTemplateEditor } from '@antv/text-template-editor';
import booking from '../data/booking.json';
import './index.less';

export default function EditorPage() {
  const editor = TextTemplateEditor.useEditor(booking as ITextSpec);
  const { textSpec } = editor;
  return (
    <div className="container">
      <blockquote>
        {'Thanks for '}
        <a href="https://lexiodemo.narrativescience.com/apps/salesforce-demo/stories/977f56b0-6308-4dc2-bcec-023ee4aa01d0?source=pinned-metrics">
          Lexio Demo
        </a>
      </blockquote>
      <Row gutter={48}>
        <Col span={12}>
          <NarrativeTextVis spec={textSpec} />
        </Col>
        <Col span={12}>
          <TextTemplateEditor editor={editor} />
        </Col>
      </Row>
    </div>
  );
}
