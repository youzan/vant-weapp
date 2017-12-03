## Stepper 计数器

### 使用指南
在 app.wxss 中引入组件库所有样式
```css
@import "path/to/zanui-weapp/dist/index.wxss";
```

在需要使用的页面里引入组件库模板和脚本
```html
<import src="path/to/zanui-weapp/dist/stepper/index.wxml" />

<template is="zan-stepper" data="{{ ...stepper, componentId: 'stepper' }}"></template>
```
```js
const Stepper = require('path/to/zanui-weapp/dist/stepper/index');

// 在 Page 中混入 Stepper 里面声明的方法
Page(Object.assign({}, Stepper, {
  // ...
}));
```

### 代码演示
#### 基础功能
`Stepper` 组件通过传入的 stepper 对象控制，内部数据格式如下：
```js
const stepper = {
  // 当前 stepper 数字
  stepper: 1,
  // 最小可到的数字
  min: 1,
  // 最大可到的数字
  max: 1
};
```

当一个 `Stepper` 中，min 超过 max，就会导致组件被置灰

当 stepper 被点击时，可以在页面中注册 handleZanStepperChange 方法来监听
```js
Page(Object.assign({}, Stepper, {
  handleZanStepperChange({ componentId, stepper }) {
    // componentId 即为在模板中传入的 componentId
    // 用于在一个页面上使用多个 stepper 时，进行区分
    // stepper 代表操作后，应该要展示的数字，需要设置到数据对象里，才会更新页面展示
    this.setData({
      stepper
    });
  }
}));
```
