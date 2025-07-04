import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'AntV T8',
  description: '🧬 Narrative text visualization for unstructured data.',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Tutorial', link: '/tutorial/quick-start' },
      { text: 'Schema', link: '/schema/index' },
      { text: 'vis', link: '/vis/index' },
    ],

    sidebar: {
      '/tutorial/': [
        {
          text: '教程',
          items: [
            { text: '快速开始', link: '/tutorial/quick-start' },
            { text: '进阶', link: '/tutorial/advanced' },
          ],
        },
      ],

      '/schema/': [
        {
          items: [{ text: 'Schema', link: '/schema/index' }],
        },
      ],

      '/vis/': [
        {
          text: '可视化',
          items: [
            { text: '组件', link: '/vis/index' },
            { text: '样式', link: '/vis/style' },
            { text: '主题', link: '/vis/theme' },
            { text: '交互', link: '/vis/interactive' },
            { text: '自定义', link: '/vis/custom' },
          ],
        },
      ],

      '/': [
        {
          text: '快速导航',
          items: [
            { text: '教程', link: '/tutorial/quick-start' },
            { text: 'API 文档', link: '/api/runtime' },
          ],
        },
      ],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
});
