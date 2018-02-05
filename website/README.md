# doc-web-cli

一个简单易用的网页文档生成工具

> A Vue.js project

## Build Setup

``` bash
# 安装
npm install doc-web-cli -g
# 初始化配置文档
doc-web init 

# 自动提取项目中的 markdown 文件
doc-web doc --config=your-config-path --out=your-website-path --docs=your-docs-path

# 生成网站
doc-web build --config=your-config-path --out=your-website-path --docs=your-docs-path
```
## 配置

- command
  - init
  - doc
  - build

- config

  {
    UI: [
      自定义的UI库会其他库
    ],
    header: {
      logo: {
        image: 'https://img.yzcdn.cn/public_files/2017/12/18/fd78cf6bb5d12e2a119d0576bedfd230.png',
        title: 'ZanUI',
        href: 'http://www.youzanyun.com/zanui'
      },
      nav: {
        lang: {
          text: 'En',
          from: 'zh-CN',
          to: 'en-US'
        },
        github: 'https://github.com/youzan/vant'
      }
    },
    footer: {
      github: 'https://github.com/youzan/vant',
      nav: {
        'React 组件库': 'https://www.youzanyun.com/zanui/zent',
        小程序组件库: 'https://github.com/youzan/zanui-weapp',
        意见反馈: 'https://github.com/youzan/vant/issues',
        开发指南: 'https://github.com/youzan/vant/blob/dev/.github/CONTRIBUTING.zh-CN.md',
        加入我们: 'https://job.youzan.com'
      }
    },
    docs: {
      base: 'zanui',
      category: [{
        base: 'base',
        label: '基础',
        include: {
          badge: import('../../packages/badge/README.md')
        }
      }],
      include: {
        badge: import('../../packages/badge/README.md')
      }
    }
    /**
    lang: {
      'zn-ch': {
        docs: {
          base: 'zanui',
          category: [{
            base: 'base',
            label: '基础',
            include: {
              badge: import('../../packages/badge/README.md')
            }
          }],
          include: {
            badge: import('../../packages/badge/README.md')
          }
        }
      }
    }
    */
  }
