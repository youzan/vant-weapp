## Switch 开关

### 使用指南
在 app.wxss 中引入组件库所有样式
```css
@import "path/to/zanui-weapp/dist/index.wxss";
```

在需要使用的页面里引入组件库模板和脚本
```html
<import src="path/to/zanui-weapp/dist/switch/index.wxml" />
```
```js
const Switch = require('path/to/zanui-weapp/dist/switch/index');

// 在 Page 中混入 Switch 里面声明的方法
Page(Object.assign({}, Switch, {
  // ...
}));
```

### 代码演示
在模板中使用 zan-switch 模板，并传入相应数据
```html
<template is="zan-switch" data="{{ loading, disabled, checked, componentId: 'switch1' }}"></template>
```

| 参数       | 说明      | 类型       | 默认值       | 必须      |
|-----------|-----------|-----------|-------------|-------------|
| loading | switch 是否是 loading 状态 | Boolean  | false | |
| disabled | 是否不可用 | Boolean  | false | |
| checked | 是否打开状态 | Boolean  | false  | 必须 |
| componentId | 用于在一个页面上使用多个 switch 时，进行区分 | String  |  | |

当 switch 被点击时，可以在页面中注册 handleZanSwitchChange 方法来监听
```js
Page(Object.assign({}, Tab, {
  handleZanSwitchChange({ componentId, checked }) {
    // componentId 即为在模板中传入的 componentId
    // 用于在一个页面上使用多个 switch 时，进行区分
    // checked 表示 switch 的选中状态
    this.setData({ checked });
  }
}));
```


