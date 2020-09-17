<p align="center">
  <img alt="logo" src="https://img.yzcdn.cn/vant/logo.png" width="120" style="margin-bottom: 10px;">
</p>
<h3 align="center">轻量、可靠的小程序 UI 组件库</h3>

<p align="center">
  <img src="https://img.shields.io/npm/v/@vant/weapp.svg?style=for-the-badge" alt="npm version" />
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge&color=#4fc08d" />
  <img src="https://img.shields.io/npm/dt/@vant/weapp.svg?style=for-the-badge&color=#4fc08d" alt="downloads" />
  <img src="https://img.shields.io/npm/dm/@vant/weapp.svg?style=for-the-badge&color=#4fc08d" alt="downloads" />
</p>

<p align="center">
  🔥 <a href="https://vant-contrib.gitee.io/vant-weapp">文档网站</a>
  &nbsp;
  &nbsp;
  🚀 <a href="https://github.com/youzan/vant" target="_blank">Vue 版</a>
</p>

---

### 介绍

Vant 是**有赞前端团队**开源的移动端组件库，于 2016 年开源，已持续维护 4 年时间。Vant 对内承载了有赞所有核心业务，对外服务十多万开发者，是业界主流的移动端组件库之一。

目前 Vant 官方提供了 [Vue 版本](https://vant-contrib.gitee.io/vant)和[微信小程序版本](http://vant-contrib.gitee.io/vant-weapp)，并由社区团队维护 [React 版本](https://github.com/mxdi9i7/vant-react)。

## 预览

扫描下方小程序二维码，体验组件库示例：

<img src="https://img.yzcdn.cn/vant-weapp/qrcode-201808101114.jpg" width="200" height="200" style="margin-top: 10px;" >

## 使用之前

使用 Vant Weapp 前，请确保你已经学习过微信官方的 [小程序简易教程](https://developers.weixin.qq.com/miniprogram/dev/framework/) 和 [自定义组件介绍](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/)。

## 安装

### 方式一. 通过 npm 安装 (推荐)

小程序已经支持使用 npm 安装第三方包，详见 [npm 支持](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html?search-key=npm)

```bash
# 通过 npm 安装
npm i @vant/weapp -S --production

# 通过 yarn 安装
yarn add @vant/weapp --production

# 安装 0.x 版本
npm i vant-weapp -S --production
```

### 方式二. 下载代码

直接通过 git 下载 Vant Weapp 源代码，并将`dist`目录拷贝到自己的项目中
```bash
git clone https://github.com/youzan/vant-weapp.git
```

## 使用组件

以按钮组件为例，只需要在 json 文件中引入按钮对应的自定义组件即可

```json
{
  "usingComponents": {
    "van-button": "/path/to/vant-weapp/dist/button/index"
  }
}
```

接着就可以在 wxml 中直接使用组件

```html
<van-button type="primary">按钮</van-button>
```

## 在开发者工具中预览

```bash
# 安装项目依赖
npm install

# 执行组件编译
npm run dev
```

打开[微信开发者工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html)，把`vant-weapp/example`目录添加进去就可以预览示例了。

PS：关于 `van-area`  Area 省市区选择组件，地区数据初始化可以直接在云开发环境中导入`vant-weapp/example/database_area.JSON`文件使用

## 基础库版本

Vant Weapp 最低支持到小程序基础库 1.9.9 版本

## 微信讨论群

欢迎大家在微信上联系我们，添加下方微信并注明『交流 vant-weapp』即可

<img src="https://img.yzcdn.cn/vant/wechat_20180606.png" width="220" height="292" >

## 加入我们

**有赞前端团队**是由一群年轻、皮实、对技术饱含热情的小伙伴组成的，目前共有 100 多名前端工程师，分布在业务中台、电商、零售、美业、资产、有赞云、赋能平台、增长中心等业务线。

我们热爱分享和开源，崇尚用工程师的方式解决问题，因此造了很多工具来解决我们遇到的问题，目前我们维护的开源产品有：

<img src="https://img.yzcdn.cn/public_files/2019/07/22/f4b70763c55c8710c52c667ecf192c05.jpeg" width="320" height="303">

我们正在寻找更多优秀的小伙伴，一起拓展前端技术的边界，期待你的加入！

- <a target="_blank" href="https://app.mokahr.com/apply/youzan/3750#/jobs/?keyword=%E5%89%8D%E7%AB%AF&_k=tueqds">职位详情</a>（Base: 杭州/深圳）
- <a target="_blank" href="https://tech.youzan.com/tag/front-end/">团队博客</a>
- <a target="_blank" href="https://github.com/youzan">开源项目</a>

## 链接

* [更新日志](https://github.com/youzan/vant-weapp/blob/dev/docs/markdown/changelog.md)
* [意见反馈](https://github.com/youzan/vant-weapp/issues)
* [加入我们](https://job.youzan.com)
* [Vant Vue 版](https://github.com/youzan/vant)

## 开源协议

本项目基于 [MIT](https://zh.wikipedia.org/wiki/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89)协议，请自由地享受和参与开源。

[vant-weapp]: https://github.com/youzan/vant-weapp
[issue]: https://github.com/youzan/vant-weapp/issues/new
[PR]: https://github.com/youzan/vant-weapp/compare
[MIT]: http://opensource.org/licenses/MIT
[小程序简易教程]: https://mp.weixin.qq.com/debug/wxadoc/dev/
[小程序框架介绍]: https://mp.weixin.qq.com/debug/wxadoc/dev/framework/MINA.html
[微信开发者工具]: https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html
