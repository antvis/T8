/**
 * dumi config file, more config see https://d.umijs.org/config
 */
import { defineConfig } from 'dumi';

const LOGO_URL = 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png';

export default defineConfig({
  title: 'T8',
  favicon: LOGO_URL,
  logo: LOGO_URL,
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
    includes: ['docs/', 'packages/NarrativeTextEditor/docs/'],
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
