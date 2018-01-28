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
const { Toast, extend } = require('path/to/zanui-weapp/dist/index');

// 在 Page 中混入 Toast 里面声明的方法
Page(extend({}, Toast, {
  // ...
}));
```

### 代码演示
在 js 中直接调用 this.showZanToast 即可
```js
this.showZanToast('toast的内容');

this.showZanToast({
  title: 'toast的内容'
});
```

Toast 支持在文字上展示图标，用法如下
```js
this.showZanToast({
  title: 'toast的内容',
  // icon 仅支持 Icon 组件内提供的
  icon: 'fail'
});
```

Toast 组件扩展了一个 showZanLoading 的方法，快速展示加载中
```js
this.showZanLoading('toast的内容');
```

### 参数说明

#### 方法
| 方法名       | 参数      | 返回值       | 介绍       |
|-----------|-----------|-----------|-------------|
| showZanToast | `title \| options`, `timeout` | - | 展示提示 |
| showZanLoading | `title \| options` | - | 展示加载提示 |
| clearZanToast |  | - | 关闭提示 |

#### options 具体参数如下
| 参数       | 说明      | 类型       | 默认值       | 必须      |
|-----------|-----------|-----------|-------------|-------------|
| title | toast 显示文案 | String | - | |
| icon | toast 显示图标，仅支持 Icon 组件内提供的和 `loading` | String | - | |
| image | toast 显示图标，为图片的链接，传入此值后会覆盖 icon 值 | String | - | |
| timeout | toast 显示时间，小于0则会一直显示，需要手动调用 clearZanToast 清除 | Number | - | |
