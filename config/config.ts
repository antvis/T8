/**
 * dumi config file, more config see https://d.umijs.org/config
 */
import { defineConfig } from 'dumi';

const LOGO_URL = 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png';

// TODO 临时网站部署
const BASE_PATH = 'antv-t8-site';

export default defineConfig({
  title: 'T8',
  favicon: LOGO_URL,
  logo: LOGO_URL,
  base: `/${BASE_PATH}`,
  publicPath: `/${BASE_PATH}/`,
  mode: 'site',
  outputPath: 'site-dist',
  theme: {
    '@s-site-menu-width': '280px',
    '@primary-color': '#873bf4',
  },
  locales: [
    ['zh-CN', '中文'],
    ['en-US', 'English'],
  ],
  resolve: {
    includes: ['docs/', 'packages/NarrativeTextVis/docs/', 'packages/NarrativeTextEditor/docs/'],
  },
  extraBabelIncludes: ['@antv/dumi-theme-antv'],
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
});
