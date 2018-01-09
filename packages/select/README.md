## Select 选择

### 使用指南
在 app.wxss 中引入组件库所有样式
```css
@import "path/to/zanui-weapp/dist/index.wxss";
```

在需要使用的页面里引入组件库模板和脚本
```html
<import src="path/to/zanui-weapp/dist/select/index.wxml" />

<template is="zan-select" data="{{ items, checkedValue: checked.base, componentId: 'base' }}" ></template>
```
```js
const { extend, Select } = require('path/to/zanui-weapp/dist/index');

// 在 Page 中混入 Select 里面声明的方法
Page(extend({}, Select, {
  // ...
}));
```

### 代码演示
#### 基础功能
`Select` 组件通过传入的 items 对象控制显示，用 checkedValue 确认显示的高亮项目
```html
<template is="zan-select" data="{{ items, checkedValue: checked.base, componentId: 'base' }}" ></template>
```

当 Select 被点击时，可以在页面中注册 handleZanTabChange 方法来监听
```js
Page(extend({}, Select, {
  handleZanSelectChange({ componentId, value }) {
    // componentId 即为在模板中传入的 componentId
    // 用于在一个页面上使用多个 Select 时，进行区分
    // value 表示被选中项的 value
  }
}));
```

#### 具体参数
| 参数       | 说明      | 类型       | 默认值       | 必须      |
|-----------|-----------|-----------|-------------|-------------|
| items | select 显示各个项的配置 | Array | - | |
| checkedValue | 高亮的 item 的 value 值 | String | - | |
| name | Select 的名字，作为 form 表单提交时数据的 key | String | - | |
| activeColor | Select 高亮颜色 | String | #ff4444 | |
| componentId | 用于区分页面多个 Select 组件 | String | - | |

items 参数格式
```js
[
  {
    // 当前选项离左侧的距离
    padding: 0,
    // 当前选项的值，在被选中时，会在 handleZanSelectChange 中获取到
    value: '1',
    // 选项文案
    name: '选项一',
  },
  {
    padding: 0,
    value: '2',
    name: '选项二',
  },
]
```
