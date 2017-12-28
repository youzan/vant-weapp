## Tab 标签

### 使用指南
在 app.wxss 中引入组件库所有样式
```css
@import "path/to/zanui-weapp/dist/index.wxss";
```

在需要使用的页面里引入组件库模板和脚本
```html
<import src="path/to/zanui-weapp/dist/tab/index.wxml" />
```
```js
const { extend, Tab } = require('path/to/zanui-weapp/dist/index');

// 在 Page 中混入 Tab 里面声明的方法
Page(extend({}, Tab, {
  // ...
}));
```

### 代码演示
在模板中使用 zan-tab 模板，并传入相应数据
```html
<template is="zan-tab" data="{{ tab: { list, selectedId, scroll, height }, componentId: 'tab1' }}"></template>
```

| 参数       | 说明      | 类型       | 默认值       | 必须      |
|-----------|-----------|-----------|-------------|-------------|
| tab | tab 配置对象 | Object | - | |
| tab.scroll | 是否开启 tab 左右滑动模式 | Boolean | - | |
| tab.list | 可选项列表 | Array | - | |
| tab.selectedId | 选中id | - | - | |
| tab.height | tab高度 | Number | - | |
| componentId | 用于区分页面多个 tab 组件 | String | - | |


tab 组件中，tab.list 数据格式如下
```js
[{
  // tab 项 id
  id: 'all',
  // tab 项展示文案
  title: '全部'
}, {
  id: 'topay',
  title: '待付款'
}, {
  id: 'tosend',
  title: '待发货'
}, {
  id: 'send',
  title: '待收货'
}, {
  id: 'sign',
  title: '已完成'
}]
```

当 tab 被点击时，可以在页面中注册 handleZanTabChange 方法来监听
```js
Page(extend({}, Tab, {
  handleZanTabChange({ componentId, selectedId }) {
    // componentId 即为在模板中传入的 componentId
    // 用于在一个页面上使用多个 tab 时，进行区分
    // selectId 表示被选中 tab 项的 id
  }
}));
```
