import { defineConfig } from 'dumi';
import { repository, version } from './package.json';

export default defineConfig({
  ...(process.env.NODE_ENV === 'production' ? { ssr: { builder: 'webpack', mako: false } } : { ssr: false, mako: {} }),
  locales: [
    { id: 'zh', name: '中文' },
    { id: 'en', name: 'English' },
  ],
  favicons: ['https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*7svFR6wkPMoAAAAAAAAAAAAADmJ7AQ/original'], // 网站 favicon
  themeConfig: {
    title: 'dumi-theme-antv', // 网站header标题
    metas: {
      title: {
        zh: 'dumi-theme-antv 主题包',
        en: 'dumi-theme-antv',
      },
      description: {
        zh: '基于 dumi2 的 AntV 官网主题包',
        en: 'Based on dumi2, the AntV official website theme package',
      },
    },
    defaultLanguage: 'zh', // 默认语言
    isAntVSite: false, // 是否是 AntV 的大官网
    footerTheme: 'light',
    siteUrl: 'https://antv.vision', // 官网地址
    sitePackagePath: '/example', // 官网子包所在路径
    githubUrl: repository.url, // GitHub 地址
    showSearch: true, // 是否显示搜索框
    showGithubCorner: true, // 是否显示头部的 GitHub icon
    showGithubStars: true, // 是否显示 GitHub star 数量
    showAntVProductsCard: true, // 是否显示 AntV 产品汇总的卡片
    showLanguageSwitcher: true, // 是否显示官网语言切换
    showWxQrcode: true, // 是否显示头部菜单的微信公众号
    showChartResize: true, // 是否在 demo 页展示图表视图切换
    showAPIDoc: true,
    showSpecTab: true, // 是否在 demo 页展示API文档
    themeSwitcher: 'g2',
    es5: false,
    feedback: true, // 是否开启用户反馈功能
    petercat: {
      show: true,
      // 以下配置仅在 show 为 true 时生效
      // token 获取方式：https://github.com/petercat-ai/petercat/blob/main/docs/guides/quick_%20assistant_start_cn.md#token-%E8%8E%B7%E5%8F%96
      token: 'your_token',
    },
    links: true,
    version,
    versions: {
      // 历史版本以及切换下拉菜单
      '0.3.x': 'https://g.antv.vision/',
      '0.2.x': 'https://g2.antv.vision/',
    },
    internalSite: {
      url: 'https://antv.antgroup.com',
      name: {
        zh: '国内镜像',
        en: 'China Mirror',
      },
    },
    docsearchOptions: {
      // 头部搜索框配置
      versionV3: true,
      apiKey: '90c9a5dbf6e5ea7058cc32bcde8e94b2',
      indexName: 's2-antv-vision',
      appId: 'D73DOU8RXD',
      sort: ['!/api'],
    },
    /**
     *  tips: 文档列表类型的路由导航(nav) 请以 docs/* 格式命名
     */
    navs: [
      // 头部的菜单列表
      {
        slug: 'docs/manual',
        title: {
          zh: '教程',
          en: 'Tutorials',
        },
        order: 2,
      },
      {
        slug: 'docs/api',
        title: {
          zh: 'API',
          en: 'API',
        },
        order: 1,
      },
      {
        slug: 'docs/plots',
        title: {
          zh: '组件',
          en: 'Components',
        },
        order: 2,
      },
      {
        slug: 'examples',
        title: {
          zh: '图表示例',
          en: 'Examples',
        },
        order: 0,
      },
      {
        title: {
          zh: '相关资源',
          en: 'Related resource',
        },
        dropdownItems: [
          {
            name: {
              zh: 'Dumi 2.x',
              en: 'Dumi 2.x',
            },
            url: 'https://github.com/umijs/dumi',
          },
        ],
        order: 0,
      },
    ],
    ecosystems: [
      // 头部的菜单中的「周边生态」
      {
        name: {
          zh: 'G2 官网',
          en: 'G2 website',
        },
        url: 'https://g2.antv.vision',
      },
      {
        name: {
          zh: 'G6 官网',
          en: 'G6 website',
        },
        url: 'https://g6.antv.vision',
      },
    ],
    docs: [
      {
        slug: 'manual/concepts',
        title: {
          zh: '可视化基础概念',
          en: 'Visualization Concepts',
        },
        order: 2,
      },
      {
        slug: 'manual/concepts/geometry',
        title: {
          zh: '几何图形',
          en: 'Geometry',
        },
        order: 2,
      },
      {
        slug: 'api/advanced',
        title: {
          zh: '高级进阶功能',
          en: 'Advanced Chart Features',
        },
        order: 1,
      },
      {
        slug: 'api/shape',
        title: {
          zh: '绘图属性速查',
          en: 'Quick Reference for Plotting Properties',
        },
        order: 2,
      },
    ],
    tutorials: [
      {
        slug: 'manual/about',
        title: {
          zh: '关于',
          en: 'About',
        },
        order: 1,
      },
    ],
    examples: [
      {
        id: 'case',
        title: {
          zh: '场景案例',
          en: 'Show Case',
        },
        icon: 'gallery',
      },
    ],
    playground: {
      devDependencies: {
        typescript: 'latest',
      },
      htmlCodeTemplate: `<!DOCTYPE html>
        <html>
          <head>
            <meta charset='UTF-8'>
            <title>{{title}}</title>
          </head>
          <body>
            <div id='container' />
            <script src='https://gw.alipayobjects.com/os/lib/antv/g2/${version}/dist/g2.min.js'></script>
            <script src='https://gw.alipayobjects.com/os/antv/pkg/_antv.data-set-0.11.1/dist/data-set.js'></script>
            <script>
            <!-- 浏览器引入，请使用全局命名空间 G2，如 new Chart() 改为 new G2.Chart，即可运行。 -->
            {{code}}
            </script>
          </body>
        </html>`,
    },
    announcement: {
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',
      title: {
        zh: '语雀公益计划：大学生认证教育邮箱，即可免费获得语雀会员。语雀，支付宝匠心打造的在线文档平台',
        en: '语雀公益计划：大学生认证教育邮箱，即可免费获得语雀会员。语雀，支付宝匠心打造的在线文档平台',
      },
      link: {
        text: {
          zh: '更多内容',
          en: 'more',
        },
        url: 'https://www.yuque.com/yuque/blog/welfare-edu?source=antv',
      },
    },
    /** 首页技术栈介绍 */
    detail: {
      engine: {
        zh: 'dumi-theme-antv',
        en: 'dumi-theme-antv',
      },
      title: {
        zh: 'dumi-theme-antv·主题包',
        en: 'dumi-theme-antv·Theme Pack',
      },
      description: {
        zh: '基于 dumi2 封装，提供灵活多变的 slots 插槽，抽取大量配置，一秒搭建 AntV 的各个技术栈官网。',
        en: 'Based on the dumi2 package, it provides flexible and changeable slots, extracts a large number of configurations, and builds the official website of each technology stack of AntV in one second.',
      },
      image: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*wo_LToatmbwAAAAAAAAAAABkARQnAQ',
      buttons: [
        {
          text: {
            zh: '示例官网',
            en: 'Example Site',
          },
          link: `https://github.com/antvis/antvis.github.io`,
        },
        {
          text: {
            zh: '迁移手册',
            en: 'Migration Manual',
          },
          link: `https://www.yuque.com/antv/gpzzmb/cyczx0`,
          type: 'primary',
        },
      ],
    },
    /** 新闻公告，优先选择配置的，如果没有配置则使用远程的！ */
    // news: [
    //   {
    //     type: {
    //       zh: '论坛',
    //       en: 'Forum',
    //     },
    //     title: {
    //       zh: 'AntV 芒种日 图新物：GraphInsight 发布',
    //       en: 'AntV Seeds Day Graph New: GraphInsight Released',
    //     },
    //     date: '2022.06.06',
    //     link: 'https://github.com/antvis/GraphInsight',
    //   },
    //   {
    //     type: {
    //       zh: '论坛',
    //       en: 'Forum',
    //     },
    //     title: {
    //       zh: 'SEE Conf 2022 支付宝体验科技大会',
    //       en: 'SEE Conf 2022 Alipay Experience Technology Conference',
    //     },
    //     date: '2022.01.08',
    //     link: 'https://seeconf.antfin.com/',
    //   },
    // ],
    /** 首页特性介绍 */
    features: {
      title: {
        zh: '我们的优势',
        en: 'Our advantage',
      },
      cards: [
        {
          icon: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*4x_KTKyqwJgAAAAAAAAAAABkARQnAQ',
          title: {
            zh: '千变万化，自由组合',
            en: 'The ever-changing, free combination',
          },
          description: {
            zh: '任何图表，都可以基于图形语法灵活绘制，满足你无限的创意',
            en: 'Any chart can be drawn flexibly based on graphic syntax to satisfy your unlimited creativity',
          },
        },
        {
          icon: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*ELYbTIVCgPoAAAAAAAAAAABkARQnAQ',
          title: {
            zh: '专业完备',
            en: 'Professional complete',
          },
          description: {
            zh: '大量产品实践之上，提供绘图引擎、完备图形语法、专业设计规范',
            en: 'On top of a large number of product practices, it provides a drawing engine, a complete graphics grammar, and professional design rules',
          },
        },
        {
          icon: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*_riSQZrgczgAAAAAAAAAAABkARQnAQ',
          title: {
            zh: '生动，可交互',
            en: 'Vivid, interactive',
          },
          description: {
            zh: '强大的交互语法，助力可视分析，让图表栩栩如生',
            en: 'owerful interactive syntax to help visual analysis and make charts come alive',
          },
        },
      ],
    },
    /** 首页案例 */
    cases: [
      {
        logo: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*-dLnTIexOxwAAAAAAAAAAABkARQnAQ',
        title: {
          zh: '精品 Gallery',
          en: 'Boutique Gallery',
        },
        description: {
          zh: '真实的数据可视化案例，我们将它们归纳为一个个故事性的设计模板，让用户达到开箱即用的效果。',
          en: 'Real data visualization cases, we summarize them into story-based design templates, allowing users to achieve out-of-the-box effects.',
        },
        // link: `/examples/gallery`,
        image: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*hDrgRb7ma4EAAAAAAAAAAABkARQnAQ',
      },
    ],
    /** 首页合作公司 */
    companies: [
      {
        name: '阿里云',
        img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*V_xMRIvw2iwAAAAAAAAAAABkARQnAQ',
      },
      {
        name: '支付宝',
        img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*lYDrRZvcvD4AAAAAAAAAAABkARQnAQ',
      },
      {
        name: '天猫',
        img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*BQrxRK6oemMAAAAAAAAAAABkARQnAQ',
      },
      {
        name: '淘宝网',
        img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*1l8-TqUr7UcAAAAAAAAAAABkARQnAQ',
      },
      {
        name: '网上银行',
        img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*ZAKFQJ5Bz4MAAAAAAAAAAABkARQnAQ',
      },
      {
        name: '京东',
        img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*yh-HRr3hCpgAAAAAAAAAAABkARQnAQ',
      },
      {
        name: 'yunos',
        img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*_js7SaNosUwAAAAAAAAAAABkARQnAQ',
      },
      {
        name: '菜鸟',
        img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*TgV-RZDODJIAAAAAAAAAAABkARQnAQ',
      },
    ],
    // 代码编辑器设置
    editor: {
      size: 0.4, // 代码区占比
      playgroundSize: 0.38, // 文档中的代码区占比
    },
    // 死链检查配置
    deadLinkChecker: {
      // 是否检查外部链接
      checkExternalLinks: false,
    },
    // 站点地图配置
    sitemap: {},
  },
  analytics: {
    // google analytics 的 key (GA 4)
    // ga_v2: 'G-abcdefg',
    // 若你在使用 GA v1 旧版本，请使用 `ga` 来配置
    ga: 'ga_old_key',
    // 百度统计的 key
    // baidu: 'baidu_tongji_key',
  },
  // tnpm 安装的目录会导致 webpack 缓存快照 OOM，暂时禁用
  // 只有主题包开发需要用，其他技术栈使用的时候，不需要！
  chainWebpack(memo) {
    memo.delete('cache');
    return memo;
  },
  links: [],
  scripts: [],
});
