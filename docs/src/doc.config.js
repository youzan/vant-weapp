/* eslint-disable */
import packageJson from '../../package.json';
import components from '../../example/config';
const { version } = packageJson;

export const github = 'https://github.com/youzan/vant-weapp';

export const versions = [version, '0.x'];

export default {
  header: {
    logo: {
      image: 'https://img.yzcdn.cn/vant/logo.png',
      title: 'Vant Weapp',
      href: '#/'
    },
    nav: {
      logoLink: [
        {
          image: 'https://img.yzcdn.cn/vant/vant-o.svg',
          url: '/vant'
        },
        {
          image: 'https://img.yzcdn.cn/vant/logo/github.svg',
          url: github
        }
      ]
    }
  },
  nav: [
    {
      name: '开发指南',
      groups: [
        {
          list: [
            {
              path: '/intro',
              title: '介绍',
              md: true
            },
            {
              path: '/quickstart',
              title: '快速上手',
              md: true
            },
            {
              path: '/changelog',
              title: '更新日志',
              md: true
            },
            {
              path: '/common',
              title: '内置样式'
            },
            {
              path: '/custom-style',
              title: '样式覆盖',
              md: true
            },
            {
              path: '/theme',
              title: '定制主题',
              md: true
            }
          ]
        }
      ]
    },
    {
      name: '组件',
      groups: components
    }
  ]
};
