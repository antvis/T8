import { TextVis } from '@antv/narrative-text-vis';
import styles from './index.less';

// 热更新可能有问题，先直接引入文件
import '../../../../packages/NarrativeTextVis/lib/index.css';

export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <TextVis content="hello world" split={false} />
    </div>
  );
}
