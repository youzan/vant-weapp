/* eslint-disable */
const version = require('../../package.json').version;

module.exports = {
  header: {
    logo: {
      image: 'https://img.yzcdn.cn/public_files/2017/12/18/fd78cf6bb5d12e2a119d0576bedfd230.png',
      title: 'Vant Weapp',
      version,
      href: '#/'
    },
    nav: {
      github: 'https://github.com/youzan/vant'
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
              title: '介绍'
            },
            {
              path: '/quickstart',
              title: '快速上手'
            },
            {
              path: '/changelog',
              title: '更新日志'
            }
          ]
        }
      ]
    },
    {
      name: '组件',
      groups: [
        {
          groupName: '基础组件',
          list: [
            {
              path: '/col',
              title: 'Layout 布局'
            },
            {
              path: '/badge',
              title: 'Badge 徽章'
            },
            {
              path: '/button',
              title: 'Button 按钮'
            },
            {
              path: '/cell',
              title: 'Cell 单元格'
            },
            {
              path: '/icon',
              title: 'Icon 图标'
            },
            {
              path: '/loading',
              title: 'Loading 加载'
            },
            {
              path: '/notice-bar',
              title: 'NoticeBar 通告栏'
            },
            {
              path: '/panel',
              title: 'Panel 面板'
            },
            {
              path: '/popup',
              title: 'Popup 弹出层'
            },
            {
              path: '/steps',
              title: 'Steps 步骤条'
            },
            {
              path: '/tag',
              title: 'Tag 标记'
            }
          ]
        },
        {
          groupName: '表单组件',
          list: [
            {
              path: '/field',
              title: 'Field 输入框'
            },
            {
              path: '/search',
              title: 'Search 搜索'
            },
            {
              path: '/stepper',
              title: 'Stepper 步进器'
            },
            {
              path: '/switch',
              title: 'Switch 开关'
            }
          ]
        },
        {
          groupName: '操作反馈',
          list: [
            {
              path: '/actionsheet',
              title: 'Actionsheet 上拉菜单'
            }
          ]
        },
        {
          groupName: '高阶组件',
          list: [
            {
              path: '/tree-select',
              title: 'TreeSelect 分类选择'
            }
          ]
        },
        {
          groupName: '业务组件',
          list: [
            {
              path: '/card',
              title: 'Card 卡片'
            }
          ]
        }
      ]
    }
  ]
};
