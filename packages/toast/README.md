## Toast 轻提示

### 使用指南
在 app.wxss 中引入组件库所有样式
```css
@import "path/to/zanui-weapp/dist/index.wxss";
```

在需要使用的页面里引入组件库模板和脚本
```html
<import src="path/to/zanui-weapp/dist/toast/index.wxml" />

<!-- 直接使用 zan-toast 模板，并且直接传入 zanToast -->
<template is="zan-toast" data="{{ zanToast }}"></template>
```
```js
const Toast = require('path/to/zanui-weapp/dist/toast/index');

// 在 Page 中混入 Toast 里面声明的方法
Page(Object.assign({}, Toast, {
  // ...
}));
```

### 代码演示
在 js 中直接调用 this.showZanToast 即可
```js
this.showZanToast('toast的内容');
```
