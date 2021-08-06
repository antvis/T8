import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { history } from 'umi';
import { NarrativeTextVis, ITextSpec } from '@antv/narrative-text-vis';
import { Design } from '../components/Design';
import textData from '../data/custom.json';
import './index.less';

// 热更新可能有问题，先直接引入文件
import '@antv/narrative-text-vis/es/index.css';

export default function IndexPage() {
  return (
    <div className="container" style={{ maxWidth: 866, margin: '0 auto' }}>
      <Design />
      <blockquote>
        {'Thanks for '}
        <a href="https://lexiodemo.narrativescience.com/apps/salesforce-demo/stories/977f56b0-6308-4dc2-bcec-023ee4aa01d0?source=pinned-metrics">
          Lexio Demo
        </a>
      </blockquote>
      <NarrativeTextVis spec={textData as ITextSpec} />
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
