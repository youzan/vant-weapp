## Toptips 顶部提示

### 使用指南
在 app.wxss 中引入组件库所有样式
```css
@import "path/to/zanui-weapp/dist/index.wxss";
```

在需要使用的页面里引入组件库模板和脚本
```html
<import src="path/to/zanui-weapp/dist/toptips/index.wxml" />

<!-- 直接使用 zan-toptips 模板，并且直接传入 zanTopTips -->
<template is="zan-toptips" data="{{ zanTopTips }}"></template>
```
```js
const Toptips = require('path/to/zanui-weapp/dist/toptips/index');

// 在 Page 中混入 Toptips 里面声明的方法
Page(Object.assign({}, Toptips, {
  // ...
}));
```

### 代码演示
在 js 中直接调用 this.showZanTopTips 即可
```js
this.showZanTopTips('toptips的内容');
```
