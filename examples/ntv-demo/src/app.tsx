import {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';
import 'prismjs/themes/prism.css';
import './app.less';

export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings };
}): BasicLayoutProps => {
  return {
    // runtime layout config
    ...initialState?.settings,
  };
};
