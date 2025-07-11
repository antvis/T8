import { defineConfig } from 'vitepress';

const createLangConfig = (lang: string, label: string) => {
  return {
    label,
    lang,
    link: `/${lang}/`,
    themeConfig: {
      nav: [
        { text: 'Home', link: `/${lang}/` },
        { text: 'Tutorial', link: `/${lang}/tutorial/quick-start` },
        { text: 'Schema', link: `/${lang}/schema/index` },
        { text: 'Vis', link: `/${lang}/vis/index` },
      ],
      sidebar: {
        [`/${lang}/tutorial/`]: [
          {
            text: 'Tutorial',
            items: [
              { text: 'Quick Start', link: `/${lang}/tutorial/quick-start` },
              { text: 'Advanced', link: `/${lang}/tutorial/advanced` },
            ],
          },
        ],
        [`/${lang}/schema/`]: [
          {
            text: 'Schema',
            items: [
              { text: '介绍', link: `/${lang}/schema/index` },
              { text: '总体结构', link: `/${lang}/schema/structure` },
              {
                text: '类型定义',
                items: [
                  { text: 'NarrativeText', link: `/${lang}/schema/types/narrative-text` },
                  { text: 'Section', link: `/${lang}/schema/types/section` },
                  { text: 'Paragraph', link: `/${lang}/schema/types/paragraph` },
                  { text: 'Phrase & Entity', link: `/${lang}/schema/types/phrase` },
                ],
              },
            ],
          },
        ],
        [`/${lang}/vis/`]: [
          {
            text: 'Vis',
            items: [
              { text: 'Overview', link: `/${lang}/vis/index` },
              { text: 'Custom', link: `/${lang}/vis/custom` },
              { text: 'Interactive', link: `/${lang}/vis/interactive` },
              { text: 'Style', link: `/${lang}/vis/style` },
              { text: 'Theme', link: `/${lang}/vis/theme` },
            ],
          },
        ],
      },
    },
  };
};

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'AntV T8',
  description: '🧬 Narrative text visualization for unstructured data.',
  themeConfig: {
    logo: {
      src: 'https://avatars.githubusercontent.com/u/19199542?s=200&v=4',
      height: 60,
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/antvis/t8' }],
  },

  locales: {
    en: createLangConfig('en', 'English'),
    zh: createLangConfig('zh', '简体中文'),
  },
});
