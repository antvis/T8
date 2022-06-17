import { defineConfig } from 'umi';

const logoUrl =
  'https://gw.alipayobjects.com/zos/antfincdn/nc7Fc0XBg5/8a6844f5-a6ed-4630-9177-4fa5d0b7dd47.png';

export default defineConfig({
  extraBabelPlugins: [
    [
      'prismjs',
      {
        languages: ['ts', 'tsx'],
        css: true,
      },
    ],
  ],
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {
    name: 'Narrative Text Vis',
    navTheme: 'light',
    logo: logoUrl,
    rightContentRender: false,
    headerRender: false,
    menu: {
      defaultOpenAll: true,
      ignoreFlatMenu: true,
    },
  },
  routes: [
    {
      path: '/',
      name: 'Introduction',
      icon: 'home',
      component: '@/pages/index',
    },
    {
      path: '/basic',
      name: 'Basic Usage',
      icon: 'alignLeft',
      component: '@/pages/basic',
    },
    {
      path: '/custom',
      name: 'Custom Usage',
      icon: 'fork',
      component: '@/pages/custom',
    },
    {
      path: '/tools',
      name: 'Tools',
      icon: 'tool',
      component: '@/pages/tools',
    },
    {
      path: '/ws-chart',
      name: 'Word Scale Charts',
      icon: 'pieChart',
      component: '@/pages/ws-chart',
    },
    {
      path: '/editor',
      name: 'Editor',
      icon: 'edit',
      component: '@/pages/editor',
    },
  ],
  favicon: logoUrl,
  fastRefresh: {},
  // webpack5: {},
  theme: {
    '@primary-color': '#873bf4',
  },
});
