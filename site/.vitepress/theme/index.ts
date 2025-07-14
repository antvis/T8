// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import './style.css';
import CopyOrDownloadAsMarkdownButtons from './components/CopyOrDownloadAsMarkdownButtons.vue';
import { Sandbox } from 'vitepress-plugin-sandpack';
import MySandbox from './components/MySandbox.vue';
import 'vitepress-plugin-sandpack/dist/style.css';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app }) {
    app.component('CopyOrDownloadAsMarkdownButtons', CopyOrDownloadAsMarkdownButtons);
    app.component('Sandbox', Sandbox);
    app.component('MySandbox', MySandbox);
  },
} satisfies Theme;
