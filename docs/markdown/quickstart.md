# 快速上手

### 背景知识

使用 Vant Weapp 前，请确保你已经学习过微信官方的 [小程序简易教程](https://mp.weixin.qq.com/debug/wxadoc/dev/) 和 [自定义组件介绍](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/)。

## 安装

### 步骤一 通过 npm 安装

需要注意的是 **package.json** 和 **node_modules** 必须在 **miniprogram** 目录下

```bash
# 通过 npm 安装
npm i @vant/weapp -S --production

# 通过 yarn 安装
yarn add @vant/weapp --production

# 安装 0.x 版本
npm i vant-weapp -S --production
```

### 步骤二 构建 npm 包

打开微信开发者工具，点击 **工具 -> 构建 npm**，并勾选 **使用 npm 模块** 选项，构建完成后，即可引入组件

<img style="width: 500px;" src="https://img.yzcdn.cn/public_files/2019/08/15/fa0549210055976cb63798503611ce3d.png" />

### 步骤三 修改 tsconfig.json

如果你使用 typescript 开发小程序，需要在 tsconfig.json 中增加如下配置，防止 npm 构建后 tsc 编译报错

```json
{
  "baseUrl": ".",
  "paths": {
    "@vant/weapp/*": ["./node_modules/@vant/weapp/dist/*"]
  }
  ...
}
```


### 步骤四 修改 app.json

将 app.json 中的 `"style": "v2"` 去除，小程序的[新版基础组件](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#style)强行加上了许多样式，难以去除，不关闭将造成部分组件样式混乱。

### 示例工程

我们提供了一个[示例工程](https://github.com/youzan/vant-demo)，示例工程会帮助你了解如下内容：

- 基于 Vant Weapp 搭建小程序应用
- 样式覆盖方案

## 使用

### 引入组件

以 Button 组件为例，只需要在`app.json`或`index.json`中配置 Button 对应的路径即可。如果你是通过下载源代码的方式使用 @vant/weapp，请将路径修改为项目中 @vant/weapp 所在的目录。



```json
// 通过 npm 安装
// app.json
"usingComponents": {
  "van-button": "@vant/weapp/button"
}
```

```json
// 通过下载源码使用
// app.json
"usingComponents": {
  "van-button": "path/to/@vant/weapp/dist/button"
}
```

### 使用组件

引入组件后，可以在 wxml 中直接使用组件

```xml
<van-button type="primary">按钮</van-button>
```

## 其他

### 在开发者工具中预览示例小程序

```bash

# 将项目克隆到本地
git clone git@github.com:youzan/vant-weapp.git

# 安装项目依赖
cd vant-weapp && npm install

# 执行组件编译
npm run dev

```

接着打开微信开发者工具，导入`example`目录的项目就可以预览示例了。
