# 快速上手

### 背景知识

使用 Vant Weapp 前，请确保你已经学习过微信官方的 [小程序简易教程](https://mp.weixin.qq.com/debug/wxadoc/dev/) 和 [自定义组件介绍](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/)。

## 安装

### 步骤一 通过 npm 安装

```bash
# 通过 npm 安装
npm i vant-weapp -S --production

# 通过 yarn 安装
yarn add vant-weapp --production
```

### 步骤二 构建 npm 包

打开微信开发者工具，点击 **工具 -> 构建 npm**，并勾选 **使用 npm 模块** 选项，构建完成后，即可引入组件

<img style="width: 500px;" src="https://img.yzcdn.cn/public_files/2019/08/15/fa0549210055976cb63798503611ce3d.png" />

## 使用

### 引入组件

以 Button 组件为例，只需要在`app.json`或`index.json`中配置 Button 对应的路径即可。如果你是通过下载源代码的方式使用 vant-weapp，请将路径修改为项目中 vant-weapp 所在的目录。

```json
// app.json
"usingComponents": {
  "van-button": "vant-weapp/button"
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
# 安装项目依赖
npm install

# 执行组件编译
npm run dev
  
```

接着打开微信开发者工具，导入`example`目录的项目就可以预览示例了。
