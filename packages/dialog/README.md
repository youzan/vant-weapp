## Dialog 弹出框

### 使用指南
在 app.wxss 中引入组件库所有样式
```css
@import "path/to/zanui-weapp/dist/index.wxss";
```

在需要使用的页面里引入组件库模板和脚本
```html
<import src="/dist/dialog/index.wxml" />
<!-- 直接使用 zan-dialog 模板，并且直接传入 zanDialog -->
<template is="zan-dialog" data="{{ zanDialog }}"></template>
```
```js
const Dialog = require('path/to/zanui-weapp/dist/dialog/index');

// 在 Page 中混入 Dialog 里面声明的方法
Page(Object.assign({}, Dialog, {
  // ...
}));
```

### 代码演示
#### 基础功能
在 js 中直接调用 this.showZanDialog 即可，可以在 title 或者 content 传入需要展示的内容。

showZanDialog 调用后返回 promise 对象。点击确定后，可以在 resolve 状态中监听到。点击取消后，可以在 reject 状态中监听到。
```js
this.showZanDialog({
  content: '这是一个模态弹窗',
  showCancel: true
}).then(() => {
  console.log('=== dialog ===', 'type: confirm');
}).catch(() => {
  console.log('=== dialog ===', 'type: cancel');
});
```

#### 按钮展示方式
按钮可以通过设置 buttonsShowVertical 来切换按钮纵向展示或者横向并排展示，方便各种场景下使用。
```js
this.showZanDialog({
  content: '这是一个模态弹窗',
  buttonsShowVertical: true,
  showCancel: true
});
```

#### 自定义展示按钮
`dialog` 支持自定义展示按钮。设置 buttons 数组即可实现。自定义按钮的点击后，都会在 resolve 状态中监听到。
```js
this.showZanDialog({
  content: '这是一个模态弹窗',
  buttons: [{
    // 按钮文案
    text: '现金支付',
    // 按钮文字颜色
    color: 'red',
    // 按钮类型，用于在 then 中接受点击事件时，判断是哪一个按钮被点击
    type: 'cash'
  }, {
    text: '微信支付',
    color: '#3CC51F',
    type: 'wechat'
  }, {
    text: '取消',
    type: 'cancel'
  }]
}).then(({ type }) => {
  // type 可以用于判断具体是哪一个按钮被点击
  console.log('=== dialog with custom buttons ===', `type: ${type}`);
});
```

| 参数       | 说明      | 类型       | 默认值       | 必须      |
|-----------|-----------|-----------|-------------|-------------|
| title | 弹窗标题 | String | - | |
| content | 弹窗内容 | String  | - | 必须 |
| buttonsShowVertical | 按钮是否纵向展示 | Boolean  | false | |
| showConfirm | 是否展示确认按钮 | Boolean  | true | |
| confirmText | 确认按钮文案 | String  | 确定 | |
| confirmColor | 确认按钮文字颜色 | String | #3CC51F | |
| showCancel | 是否展示取消按钮 | Boolean  | false | |
| cancelText | 取消按钮文案 | String  | 取消 | |
| cancelColor | 取消按钮文字颜色 | String  | #333 | |
| buttons | 自定义按钮列表，设置以后，以上关于 确认 和 取消 按钮的设置全部不生效。| Array | - | |

buttons 参考格式：
```js
[{
  // 按钮文案
  text: '现金支付',
  // 按钮文字颜色
  color: 'red',
  // 按钮类型，用于在 then 中接受点击事件时，判断是哪一个按钮被点击
  type: 'cash'
}, {
  // 按钮文案
  text: '微信支付',
  // 按钮文字颜色
  color: '#3CC51F',
  // 按钮类型，用于在 then 中接受点击事件时，判断是哪一个按钮被点击
  type: 'wechat'
}, {
  // 按钮文案
  text: '取消',
  // 按钮类型，用于在 then 中接受点击事件时，判断是哪一个按钮被点击
  type: 'cancel'
}]
```

