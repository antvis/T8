import { defineConfig } from 'vitepress';
import llmstxt, { copyOrDownloadAsMarkdownButtons } from 'vitepress-plugin-llms';
import container from 'markdown-it-container';
import { renderSandbox } from 'vitepress-plugin-sandpack';

const createLangConfig = (lang: string, label: string) => {
  return {
    label,
    lang,
    link: `/${lang}`,
    themeConfig: {
      nav: [
        { text: 'Home', link: `/${lang}` },
        { text: 'Tutorial', link: `/${lang}/tutorial/quick-start` },
        { text: 'Schema', link: `/${lang}/schema/index` },
        { text: 'API', link: `/${lang}/api/index` },
      ],
      sidebar: {
        [`/${lang}/tutorial/`]: [
          {
            text: 'Tutorial',
            items: [
              { text: 'Quick Start', link: `/${lang}/tutorial/quick-start` },
              {
                text: 'Advanced',
                items: [
                  { text: 'Theme', link: `/${lang}/tutorial/advanced/theme` },
                  { text: 'Events', link: `/${lang}/tutorial/advanced/events` },
                  { text: 'Plugin', link: `/${lang}/tutorial/advanced/plugin` },
                ],
              },
            ],
          },
        ],
        [`/${lang}/schema/`]: [
          {
            text: 'Schema',
            items: [
              { text: 'Overview', link: `/${lang}/schema/index` },
              { text: 'Structure', link: `/${lang}/schema/structure` },
              {
                text: 'Types',
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
      },
    },
  };
};

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'T8: Text Visualization',
  vite: {
    // @ts-expect-error type error
    plugins: [llmstxt()],
  },
  markdown: {
    config(md) {
      md.use(copyOrDownloadAsMarkdownButtons)
        .use(container, 'sandbox', {
          render(tokens, idx) {
            return renderSandbox(tokens, idx, 'sandbox');
          },
        })
        .use(container, 'my-sandbox', {
          render(tokens, idx) {
            return renderSandbox(tokens, idx, 'my-sandbox');
          },
        });
    },
  },
  description: '🧬 Narrative text visualization for unstructured data.',
  themeConfig: {
    logo: {
      src: 'https://avatars.githubusercontent.com/u/19199542?s=200&v=4',
      onClick: () => {
        window.open('https://antv.antgroup.com', '_blank');
      },
    },
    search: {
      provider: 'local',
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/antvis/t8' }],
  },

  rewrites: {
    '/': '/en',
  },

  locales: {
    en: createLangConfig('en', 'English'),
    zh: createLangConfig('zh', '简体中文'),
  },
});
