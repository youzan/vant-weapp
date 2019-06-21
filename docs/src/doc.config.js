/* eslint-disable */
import packageJson from '../../package.json';
import components from '../../example/config';
const { version } = packageJson;

export const github = 'https://github.com/youzan/vant-weapp';

export default {
  header: {
    logo: {
      version,
      image: 'https://img.yzcdn.cn/vant/logo.png',
      title: 'Vant Weapp',
      href: '#/'
    },
    nav: {}
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
