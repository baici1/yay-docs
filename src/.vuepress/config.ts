import { defineUserConfig } from 'vuepress';
import { searchProPlugin } from 'vuepress-plugin-search-pro';
import { autoCatalogPlugin } from 'vuepress-plugin-auto-catalog';
import { cut } from '@node-rs/jieba';
import theme from './theme.js';

export default defineUserConfig({
  base: '/',

  locales: {
    '/': {
      lang: 'en-US',
      title: 'yay-docs',
      description: 'Loneliness is my future',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: '团子文档',
      description: '孤独是我的未来',
    },
  },

  theme,
  plugins: [
    searchProPlugin({
      // 索引全部内容
      indexContent: true,
      indexLocaleOptions: {
        '/zh/': {
          // 使用 nodejs-jieba 进行分词
          tokenize: (text, fieldName) => (fieldName === 'id' ? [text] : cut(text, true)),
        },
      },
      // 为分类和标签添加索引
      customFields: [
        {
          getter: (page: any) => page.frontmatter.category,
          formatter: {
            '/': 'Category: $content',
            '/zh/': '分类：$content',
          },
        },
        {
          getter: (page: any) => page.frontmatter.tag,
          formatter: {
            '/': 'Tag: $content',
            '/zh/': '标签：$content',
          },
        },
      ],
    }),
    autoCatalogPlugin({
      //不会自动生成的页面路径
      exclude: [],
      frontmatter: (path) => {
        return {
          // frontmatter you want
        };
      },
    }),
  ],
  // Enable it with pwa
  // shouldPrefetch: false,
});
