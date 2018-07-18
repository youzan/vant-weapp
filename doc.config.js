/* eslint-disable */
module.exports = {
  header: {
    logo: {
      image: 'https://img.yzcdn.cn/public_files/2017/12/18/fd78cf6bb5d12e2a119d0576bedfd230.png',
      title: 'ZanUI 小程序',
      href: 'http://www.youzanyun.com/zanui'
    },
    nav: {
      lang: {
        text: 'En',
        from: 'zh-CN',
        to: 'en-US'
      },
      github: 'https://github.com/youzan/zanui-weapp'
    }
  },
  footer: {
    github: 'https://github.com/youzan/zanui-weapp',
    nav: {
      'React 组件库': 'https://www.youzanyun.com/zanui/zent',
      'Vue 组件库': 'https://www.youzanyun.com/zanui/vant',
      意见反馈: 'https://github.com/youzan/zanui-weapp/issues',
      开发指南: 'https://github.com/youzan/zanui-weapp/blob/dev/.github/CONTRIBUTING.zh-CN.md',
      加入我们: 'https://job.youzan.com'
    }
  },
  plugins: [require('./website/plugins/wxapp-demo.js')],
  docs: {
    base: 'zanui',
    default: 'icon',
    category: [
      {
        base: 'base',
        label: '基础',
        include: {
          icon: require('./packages/icon/README.md'),
          btn: require('./packages/btn/README.md'),
          helper: require('./packages/helper/README.md'),
          loading: require('./packages/loading/README.md')
        }
      },
      {
        base: 'layout',
        label: '布局',
        include: {
          row: require('./packages/row/README.md'),
          cell: require('./packages/cell/README.md'),
          card: require('./packages/card/README.md'),
          panel: require('./packages/panel/README.md')
        }
      },
      {
        base: 'form',
        label: '表单',
        include: {
          checkbox: require('./packages/checkbox/README.md'),
          datetime_picker: require('./packages/datetime-picker/README.md'),
          field: require('./packages/field/README.md'),
          radio: require('./packages/radio/README.md'),
          search: require('./packages/search/README.md'),
          select: require('./packages/select/README.md'),
          stepper: require('./packages/stepper/README.md'),
          switch: require('./packages/switch/README.md')
        }
      },
      {
        base: 'view',
        label: '展示',
        include: {
          tag: require('./packages/tag/README.md'),
          badge: require('./packages/badge/README.md'),
          capsule: require('./packages/capsule/README.md'),
          noticebar: require('./packages/noticebar/README.md'),
          steps: require('./packages/steps/README.md')
        }
      },
      {
        base: 'interactive',
        label: '交互',
        include: {
          actionsheet: require('./packages/actionsheet/README.md'),
          dialog: require('./packages/dialog/README.md'),
          popup: require('./packages/popup/README.md'),
          tab: require('./packages/tab/README.md'),
          toast: require('./packages/toast/README.md'),
          toptips: require('./packages/toptips/README.md'),
          loadmore: require('./packages/loadmore/README.md')
        }
      },
      {
        base: 'complexComponent',
        label: '高阶组件',
        include: { tree_select: require('./packages/tree-select/README.md') }
      }
    ],
    include: {}
  }
}