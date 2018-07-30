<p>
    <a href="https://github.com/youzan/"><img alt="logo" width="36px" src="https://img.yzcdn.cn/public_files/2017/02/09/e84aa8cbbf7852688c86218c1f3bbf17.png" alt="youzan">
    </a>
</p>
<p align="center">
    <img alt="logo" src="https://img.yzcdn.cn/public_files/2017/12/18/fd78cf6bb5d12e2a119d0576bedfd230.png" width="120" style="margin-bottom: 10px;">
</p>
<p align="center">轻量、可靠的小程序 UI 组件库</p>


## 概述
[vant-weapp](https://youzan.github.io/vant-weapp)是有赞移动端组件库 Vant 的小程序版本，基于相同的视觉规范，为用户提供更加统一的使用感受。

扫描下方小程序二维码，体验组件库示例：

![vant-weapp 演示](https://img.yzcdn.cn/public_files/2017/10/30/554dd940eb1a269d4ac9133e78ae321f.jpg?imageView2/2/w/300/h/300)

## 文档

[https://youzan.github.io/vant-weapp](https://youzan.github.io/vant-weapp)

## 下载

``` bash
git clone https://github.com/youzan/vant-weapp.git
```

## 预览

1. 在 vant-weapp 根目录下运行

``` bash
# 安装项目依赖
npm install
# 执行组件编译
npm run dev
```

2. 打开[微信开发者工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html)，'本地小程序项目 - 添加项目'，把 vant-weapp/example 目录添加进去就可以预览示例了。

![](https://img.yzcdn.cn/public_files/2017/02/08/a5e6445075826183659742cc6946c477.png)

## 使用

1. 使用 [vant-weapp] 前请确保已经学习过微信官方的 [小程序简易教程] 和 [小程序框架介绍]。
2. 然后用 [Bower] 将 [vant-weapp] 添加到你的项目中使用。
3. 你也可以 fork 出一份你自己的 [vant-weapp]，这样可以获得更稳定的代码和更方便的进行个性定制。

我们推荐在你的`app.wxss`直接引入`vant-weapp/dist/index.wxss`。

详细使用文档，请参考 [快速上手](https://youzan.github.io/vant-weapp)

### 组件分类介绍
根据功能的不同，可以将组件大致的分为2类：

#### 1. 正常引用

如按钮组件，只需要在页面中引入按钮自定义组件即可
```json
{
    "usingComponents": {
        "van-button": "/path/to/vant-weapp/dist/button/index"
    }
}
```
```html
<!-- example/button/index.html -->

<van-button>按钮</van-button>
```

![](https://img.yzcdn.cn/public_files/2017/02/08/1b1e39ed3dc6b63519a68ba1e2650cfc.png)


#### 2. API类组件

如 Toast 组件，需要先在页面上引入自定义组件。之后在逻辑运行时，直接调用方法即可展示
```json
{
    "usingComponents": {
        "van-toast": "/path/to/vant-weapp/dist/toast/index"
    }
}
```
```html
<van-toast id="van-toast-test"></van-toast>
```

将对应的 Toast 的函数引入页面，就可以直接调用来展示 Toast 了

```js
// example/toast/index.js

const Toast = require('/path/to/vant-weapp/dist/toast/toast');

Page({
  showToast() {
    Toast({
        selector: '#van-toast-test',
        message: 'toast内容'
    });
  }
});

```

![](https://img.yzcdn.cn/public_files/2017/02/08/ada80798c88df08060ce96964384e88e.png)

更多示例可以在项目的`example`目录中查看

## 旧版组件库
组件库现在已经全部升级至自定义组件，如果项目暂时无法切换到自定义组件的形式，可以将使用的版本号设置为低于 3.0.0。同时，旧的代码会在分支 old_code 上保留一段时间。

建议新使用的用户，直接以自定义组件形式接入

## 微信讨论群

欢迎大家在微信上联系我们，添加下方微信并注明『交流 vant-weapp』即可

<img src="https://img.yzcdn.cn/vant/wechat_20180606.png" width="220" height="292" >

## 开源协议
本项目基于 [MIT](https://zh.wikipedia.org/wiki/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89)协议，请自由地享受和参与开源。

## 贡献

如果你有好的意见或建议，欢迎给我们提 [issue] 或 [PR]，为优化 [vant-weapp] 贡献力量

[vant-weapp]: https://github.com/youzan/vant-weapp
[issue]: https://github.com/youzan/vant-weapp/issues/new
[PR]: https://github.com/youzan/vant-weapp/compare
[MIT]: http://opensource.org/licenses/MIT
[小程序简易教程]: https://mp.weixin.qq.com/debug/wxadoc/dev/
[小程序框架介绍]: https://mp.weixin.qq.com/debug/wxadoc/dev/framework/MINA.html
