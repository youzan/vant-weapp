<p>
<a href="https://github.com/youzan/"><img alt="有赞logo" width="36px" src="https://img.yzcdn.cn/public_files/2017/02/09/e84aa8cbbf7852688c86218c1f3bbf17.png" alt="youzan">
</p></a>
<p align="center">
    <img alt="项目logo" src="https://img.yzcdn.cn/public_files/2017/02/06/ee0ebced79a80457d77ce71c7d414c74.png">
</p>
<p align="center">高颜值、好用、易扩展的小程序 UI 库</p>


## 概述
[ZanUI-WeApp]是有赞移动 Web UI 规范 `ZanUI` 的小程序现实版本，结合了微信的视觉规范，为用户提供更加统一的使用感受。

现已包含 badge、btn、card、cell、dialog、icon、label、noticebar、panel、popup、switch、tab、toast、toptips 等组件或元素。具体可以扫描下方小程序二维码，体验组件库示例 Demo

![ZanUI-WeApp 演示](https://img.yzcdn.cn/public_files/2017/10/30/554dd940eb1a269d4ac9133e78ae321f.jpg?imageView2/2/w/300/h/300)

更多背景介绍，请移步 [我们写的介绍文章](http://tech.youzan.com/zanui-weapp/)。

## 下载
``` bash
git clone https://github.com/youzan/zanui-weapp.git
```

## 预览
1. 在 zanui-weapp 根目录下运行
``` bash
# 安装项目依赖
npm install
# 执行组件编译
npm run dev
```
2. 打开[微信web开发者工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html)，'本地小程序项目 - 添加项目'，把 zanui-weapp/example 目录添加进去就可以预览示例demo了。

![](https://img.yzcdn.cn/public_files/2017/02/08/a5e6445075826183659742cc6946c477.png)

## 使用

1. 使用 [ZanUI-WeApp] 前请确保已经学习过微信官方的 [小程序简易教程] 和 [小程序框架介绍]。
2. 然后用 [Bower] 将 [ZanUI-WeApp] 添加到你的项目中使用。
3. 你也可以 fork 出一份你自己的 [ZanUI-WeApp]，这样可以获得更稳定的代码和更方便的进行个性定制。

我们推荐在你的`app.wxss`直接引入`zanui-weapp/dist/index.wxss`。

#### 具体组件文档
* [Badge - 徽章](./packages/badge/README.md)
* [Button - 按钮](./packages/btn/README.md)
* [Capsule - 胶囊](./packages/capsule/README.md)
* [Card - 卡片](./packages/card/README.md)
* [Cell - 单元格](./packages/cell/README.md)
* [Helper - 基础样式](./packages/helper/README.md)
* [Icon - 图标](./packages/icon/README.md)
* [Layout - 布局](./packages/row/README.md)
* [Loadmore - 加载](./packages/loadmore/README.md)
* [Noticebar - 通告栏](./packages/noticebar/README.md)
* [Panel - 面板](./packages/panel/README.md)
* [Popup - 弹出层](./packages/popup/README.md)
* [Stepper - 计数器](./packages/stepper/README.md)
* [Select - 选择](./packages/select/README.md)
* [Steps - 步骤条](./packages/steps/README.md)
* [Switch - 开关](./packages/switch/README.md)
* [Tab - 标签](./packages/tab/README.md)
* [Field - 输入框](./packages/field/README.md)
* [Dialog - 弹出框](./packages/dialog/README.md)
* [Tag - 标签](./packages/tag/README.md)
* [Toast - 轻提示](./packages/toast/README.md)
* [Toptips - 顶部提示](./packages/toptips/README.md)

根据功能的不同，可以将组件大致的分为4类：

#### 1. 简单组件

如按钮组件，只要按照wxml结构写就好了

~~~html
<!-- example/btn/index.html -->

<view class="zan-btn">按钮</view>
~~~

![](https://img.yzcdn.cn/public_files/2017/02/08/1b1e39ed3dc6b63519a68ba1e2650cfc.png)

#### 2. 复杂组件

如加载更多组件，需要先引入定义好的模版，然后给模版传递数据

~~~html
<!-- example/loadmore/index.html -->

<!-- 引入组件模版 -->
<import src="path/to/zanui-weapp/dist/loadmore/index.wxml" />

<!-- 加载中 -->
<template is="zan-loadmore" data="{{loading: true}}" />

<!-- 一条数据都没有 -->
<template is="zan-loadmore" data="{{nodata: true}}" />

<!-- 没有更多数据了 -->
<template is="zan-loadmore" data="{{nomore: true}}" />
~~~

![](https://img.yzcdn.cn/public_files/2017/02/08/b96fdc7971577b32915604c5b2c1a3bb.png)

#### 3. 带事件回调的组件

如数量选择组件，需要先引入模版，然后给模版传递数据

~~~html
<!-- example/stepper/index.html -->

<import src="path/to/zanui-weapp/dist/stepper/index.wxml" />

<template is="zan-stepper" data="{{ ...stepper, componentId: 'customId' }}" />
~~~

然后通过`Zan.Stepper`把相关回调注入到页面中

~~~js
// example/stepper/index.js

var Zan = require('path/to/zanui-weapp/dist/index');

Page(Object.assign({}, Zan.Stepper, {
  data: {
    stepper: {
      stepper: 10,
      min: 1,
      max: 20
    },
  },

  handleZanStepperChange(e) {
    // 如果页面有多个Stepper组件，则通过唯一componentId进行索引
    var compoenntId = e.componentId;
    var stepper = e.stepper;

    this.setData({
      'stepper.stepper': stepper
    });
  }
}));
~~~

![](https://img.yzcdn.cn/public_files/2017/02/08/b791dfef150b01a7ce1e9aa9e60e0038.png)

#### 4. API类组件

如Toast组件，需要先引入模版，并在页面上使用。

> 注意`zanToast`这个数据也是通过`Zan.Toast`注入到页面的

~~~html
<!-- example/toast/index.html -->

<import src="path/to/zanui-weapp/dist/toast/index.wxml" />

<view bindtap="showToast">显示toast</view>

<template is="zan-toast" data="{{ zanToast }}"></template>
~~~

将API注入到页面后，就可以通过`this`来直接调用相应的API了

~~~js
<!-- example/toast/index.js -->

var Zan = require('path/to/zanui-weapp/dist/index');

Page(Object.assign({}, Zan.Toast, {
  showToast() {
    this.showZanToast('toast的内容');
  }
}));

~~~

![](https://img.yzcdn.cn/public_files/2017/02/08/ada80798c88df08060ce96964384e88e.png)

更多示例可以在项目的`example`目录中查看

## 开源协议
本项目基于 [MIT](https://zh.wikipedia.org/wiki/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89)协议，请自由地享受和参与开源。

## 贡献

如果你有好的意见或建议，欢迎给我们提 [issue] 或 [PR]，为优化 [ZanUI-Weapp] 贡献力量

[ZanUI-WeApp]: https://github.com/youzan/zanui-weapp
[issue]: https://github.com/youzan/zanui-weapp/issues/new
[PR]: https://github.com/youzan/zanui-weapp/compare
[ZanUI WeApp]: https://github.com/youzan/zanui-weapp
[MIT]: http://opensource.org/licenses/MIT
[Bower]: https://bower.io/
[小程序简易教程]: https://mp.weixin.qq.com/debug/wxadoc/dev/
[小程序框架介绍]: https://mp.weixin.qq.com/debug/wxadoc/dev/framework/MINA.html
