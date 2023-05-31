import { hopeTheme } from 'vuepress-theme-hope';
import { enNavbar, zhNavbar } from './navbar/index.js';
import { enSidebar, zhSidebar } from './sidebar/index.js';

export default hopeTheme({
  hostname: 'https://yay-docs.yangdiy.cn/',

  author: {
    name: '团子',
    url: 'https://github.com/baici1',
  },

  iconAssets: 'iconfont',

  logo: '/avatar.png',

  docsDir: 'docs',

  blog: {
    name: '团子',
    avatar: '/avatar.png',
    roundAvatar: true,
    medias: {
      BiliBili: 'https://space.bilibili.com/177935387',
      Gitee: 'https://gitee.com/yangaoyu',
      GitHub: 'https://github.com/baici1',
    },
  },

  //全屏按钮
  fullscreen: true,

  // 默认为 GitHub. 同时也可以是一个完整的 URL
  repo: 'https://github.com/baici1/yay-docs',
  // 自定义仓库链接文字。默认从 `repo` 中自动推断为
  // "GitHub" / "GitLab" / "Gitee" / "Bitbucket" 其中之一，或是 "Source"。
  repoLabel: 'GitHub',
  // 是否在导航栏内显示仓库链接，默认为 `true`
  repoDisplay: true,
  // 自定义导航栏布局
  // navbarLayout: {
  //   start: ['Brand'],
  //   center: ['Links'],
  //   end: ['Language', 'Repo', 'Outlook', 'Search'],
  // },

  locales: {
    '/': {
      // navbar
      navbar: enNavbar,

      // sidebar
      sidebar: enSidebar,

      footer: 'Default footer',

      displayFooter: true,

      blog: {
        description: 'Loneliness is my future',
        intro: '/intro.html',
      },

      metaLocales: {
        editLink: 'Edit this page on GitHub',
      },
    },

    /**
     * Chinese locale config
     */
    '/zh/': {
      // navbar
      navbar: zhNavbar,

      // sidebar
      sidebar: zhSidebar,

      footer: '默认页脚',

      displayFooter: true,

      blog: {
        description: '孤独是我的未来',
        intro: '/zh/intro.html',
      },

      // page meta
      metaLocales: {
        editLink: '在 GitHub 上编辑此页',
      },
    },
  },

  encrypt: {
    config: {
      '/demo/encrypt.html': ['1234'],
      '/zh/demo/encrypt.html': ['1234'],
    },
  },

  plugins: {
    blog: true,

    comment: {
      // @ts-expect-error: You should generate and use your own comment service
      provider: 'Giscus',
    },

    // all features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ['ts', 'vue'],
      },
      presentation: {
        plugins: ['highlight', 'math', 'search', 'notes', 'zoom'],
      },
      stylize: [
        {
          matcher: 'Recommended',
          replacer: ({ tag }) => {
            if (tag === 'em')
              return {
                tag: 'Badge',
                attrs: { type: 'tip' },
                content: 'Recommended',
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },
    autoCatalog: true,
    // uncomment these if you want a PWA
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cachePic: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  },
});
