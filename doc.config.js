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
  plugins: [require('/Users/jdliu/projects/youzan/zanui-weapp/website/plugins/wxapp-demo')],
  docs: {
    base: 'zanui',
    default: 'icon',
    category: [
      {
        base: 'base',
        label: '基础',
        include: {
          icon: require('/Users/jdliu/projects/youzan/zanui-weapp/packages/icon/README.md'),
          btn: require('/Users/jdliu/projects/youzan/zanui-weapp/packages/btn/README.md'),
          helper: require('/Users/jdliu/projects/youzan/zanui-weapp/packages/helper/README.md')
        }
      },
      {
        base: 'layout',
        label: '布局',
        include: {
          row: require('/Users/jdliu/projects/youzan/zanui-weapp/packages/row/README.md'),
          cell: require('/Users/jdliu/projects/youzan/zanui-weapp/packages/cell/README.md'),
          card: require('/Users/jdliu/projects/youzan/zanui-weapp/packages/card/README.md'),
          panel: require('/Users/jdliu/projects/youzan/zanui-weapp/packages/panel/README.md')
        }
      },
      {
        base: 'form',
        label: '表单',
        include: {
          field: require('/Users/jdliu/projects/youzan/zanui-weapp/packages/field/README.md'),
          switch: require('/Users/jdliu/projects/youzan/zanui-weapp/packages/switch/README.md'),
          select: require('/Users/jdliu/projects/youzan/zanui-weapp/packages/select/README.md'),
          stepper: require('/Users/jdliu/projects/youzan/zanui-weapp/packages/stepper/README.md')
        }
      },
      {
        base: 'view',
        label: '展示',
        include: {
          tag: require('/Users/jdliu/projects/youzan/zanui-weapp/packages/tag/README.md'),
          badge: require('/Users/jdliu/projects/youzan/zanui-weapp/packages/badge/README.md'),
          capsule: require('/Users/jdliu/projects/youzan/zanui-weapp/packages/capsule/README.md'),
          noticebar: require('/Users/jdliu/projects/youzan/zanui-weapp/packages/noticebar/README.md'),
          steps: require('/Users/jdliu/projects/youzan/zanui-weapp/packages/steps/README.md')
        }
      },
      {
        base: 'interactive',
        label: '交互',
        include: {
          toast: require('/Users/jdliu/projects/youzan/zanui-weapp/packages/toast/README.md'),
          popup: require('/Users/jdliu/projects/youzan/zanui-weapp/packages/popup/README.md'),
          dialog: require('/Users/jdliu/projects/youzan/zanui-weapp/packages/dialog/README.md'),
          toptips: require('/Users/jdliu/projects/youzan/zanui-weapp/packages/toptips/README.md'),
          tab: require('/Users/jdliu/projects/youzan/zanui-weapp/packages/tab/README.md'),
          loadmore: require('/Users/jdliu/projects/youzan/zanui-weapp/packages/loadmore/README.md'),
          actionsheet: require('/Users/jdliu/projects/youzan/zanui-weapp/packages/actionsheet/README.md')
        }
      }
    ],
    include: {}
  }
}