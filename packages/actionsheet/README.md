## Actionsheet 行动按钮

### 使用指南
在 app.wxss 中引入组件库所有样式
```css
@import "path/to/zanui-weapp/dist/index.wxss";
```

在需要使用的页面里引入组件库模板和脚本
```html
<import src="/dist/actionsheet/index.wxml" />
<!-- 直接使用 zan-actionsheet 模板，并且直接传入参数配置 -->
<template is="zan-actionsheet" data="{{ ...actionsheet }}"></template>
```
```js
const { Actionsheet, extend } = require('path/to/zanui-weapp/dist/index');

// 在 Page 中混入 Actionsheet 里面声明的方法
Page(extend({}, Actionsheet, {
  data: {
    actionsheet: {
      show: false,
      actions: []
    }
  }
  // ...
}));
```

### 代码演示
#### 基础功能
在 js 中设置传入的 show 为 true，即可展示出 actionsheet。actionsheet 会根据传入的 actions 展示按钮。
```js
this.setData({
  'actionsheet.show': true
})
```

当行动按钮被点击或者弹层被关掉时，都可以在可以在页面中注册 `handleZanActionsheetClick` 和 `handleZanActionsheetCancel` 方法来监听。
```js
Page({
  // 当行动按钮被关闭时，触发该函数
  // componentId 即为在模板中传入的 componentId
  // 用于在一个页面上使用多个 actionsheet 时，进行区分
  handleZanActionsheetCancel({ componentId }) {
  },

  // 当行动按钮中有一个被点击时触发
  // index 代表被点击按钮在传入参数 actions 中的位置
  handleZanActionsheetClick({ componentId, index }) {
  }
});
```

#### `Actionsheet` 支持的具体参数如下
| 参数       | 说明      | 类型       | 默认值       | 必须      |
|-----------|-----------|-----------|-------------|-------------|
| show | 用来表示是否展示行动按钮 | Boolean | false | |
| cancelText | 行动按钮底部取消按钮的文案，不传则不显示取消按钮 | String  | | |
| closeOnClickOverlay | 是否在点击背景时，关闭行动按钮 | Boolean  | false | |
| componentId | 用于区分行动按钮之间的唯一名称 | String  | | |
| actions | 行动按钮的按钮显示配置 | Array  | [] | |

actions 的具体数据结构
```js
// actions 为数组结构传入
[{
  // 按钮文案
  name: '选项1',
  // 按钮描述文案，不传就不显示
  subname: '选项描述语1',
  // 按钮特殊类，可以通过传入这个，为按钮增加特殊样式
  className: 'action-class',
  // 按钮是否显示为 loading
  loading: false,
  // 按钮的微信开放能力
  // 具体支持可参考微信官方文档：https://mp.weixin.qq.com/debug/wxadoc/dev/component/button.html
  openType: 'share'
}]
```

