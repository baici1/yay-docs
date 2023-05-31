import { navbar } from 'vuepress-theme-hope';

export const enNavbar = navbar([
  '/',
  // 配置语言相关文章
  {
    text: 'language',
    icon: 'discover',
    prefix: '/language',
    children: [
      { text: 'Go', icon: 'discover', link: '/Go' },
      { text: 'Python', icon: 'discover', link: '/Python' },
    ],
  },
  {
    text: 'cs',
    icon: 'discover',
    prefix: '/cs/',
    children: [
      { text: 'Network', icon: 'discover', link: '/Network/README.md' },
      { text: 'Database', icon: 'discover', link: '/Database/README.md' },
    ],
  },
  {
    text: 'project',
    icon: 'discover',
    prefix: '/project/',
    children: [{ text: 'tools', icon: 'discover', link: '/tools/README.md' }],
  },
]);
