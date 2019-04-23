## 快速上手

### 使用之前

使用 Vant Weapp 前，请确保你已经学习过微信官方的 [小程序简易教程](https://mp.weixin.qq.com/debug/wxadoc/dev/) 和 [自定义组件介绍](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/)。

### 安装

#### 方式一. 通过 npm 安装 (推荐)

小程序已经支持使用 npm 安装第三方包，详见 [npm 支持](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html?search-key=npm)

```bash
# npm
npm i vant-weapp -S --production

# yarn
yarn add vant-weapp --production
```

#### 方式二. 下载代码

直接通过 git 下载 Vant Weapp 源代码，并将`dist`或`lib`目录拷贝到自己的项目中
```bash
git clone https://github.com/youzan/vant-weapp.git
```

### 使用组件

以按钮组件为例，只需要在 json 文件中引入按钮对应的自定义组件即可

某些小程序框架会要求关闭`ES6转ES5`选项，可以引入`lib`目录内es5版本的组件

es6
```json
"usingComponents": {
  "van-button": "/path/to/vant-weapp/dist/button/index"
}
```

es5
```json
"usingComponents": {
  "van-button": "/path/to/vant-weapp/lib/button/index"
}
```

接着就可以在 wxml 中直接使用组件

```xml
<van-button type="primary">按钮</van-button>
```

### 在开发者工具中预览示例小程序

```bash
# 安装项目依赖
npm install

# 执行组件编译
npm run dev
```

打开[微信开发者工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html)，导入`example`目录的项目就可以预览示例了。
