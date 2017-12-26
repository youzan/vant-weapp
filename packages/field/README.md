## Field 输入框

### 使用指南
在 app.wxss 中引入组件库所有样式
```css
@import "path/to/zanui-weapp/dist/index.wxss";
```

在需要使用的页面里引入组件库模板和脚本
```html
<import src="path/to/zanui-weapp/dist/field/index.wxml" />

<!-- 直接使用 zan-field 模板，并且直接传入设置值 -->
<template is="zan-field" data="{{ value }}"></template>
```
```js
const { Field, extend } = require('path/to/zanui-weapp/dist/index');

// 在 Page 中混入 Field 里面声明的方法
Page(extend({}, Field, {
  // ...
}));
```

### 代码演示
field 支持多种展示方式，在 `data` 中传入对应的设置即可。
```html
<template is="zan-field" data="{{ title: '收货人', type: 'input', placeholder: '名字', value }}"></template>
```

当 field 触发输入事件时，可以在页面中注册 handleZanFieldChange 方法来监听
```js
Page(extend({}, Field, {
  // 输入框内容更改时触发
  handleZanFieldChange({ componentId, detail }) {
    /*
     * componentId 即为在模板中传入的 componentId
     * 用于在一个页面上使用多个 tab 时，进行区分
     * detail 即输入框中的内容
     */
    /*
     * 处理函数可以直接 return 一个字符串，将替换输入框的内容。
     */
  },
  // 输入框聚焦时触发
  handleZanFieldFocus({ componentId, detail }) {},
  // 输入框失焦时触发
  handleZanFieldBlur({ componentId, detail }) {},
}));
```

`Field` 支持传入参数如下

| 参数       | 说明      | 类型       | 默认值       | 必须      |
|-----------|-----------|-----------|-------------|-------------|
| title | 输入框左侧标题，若传入为空，则不显示标题 | String | - | |
| name | 输入框的名字，作为 form 表单提交时数据的 key | String  | componentId 指定的值 | |
| value | 输入框的内容 | String  | - | |
| type | 输入框的类型，可选值为 input, textarea | String  | input | |
| inputType | 输入框为 input 情况下，输入框的类型，例如：number, text, password | String  | text | |
| placeholder | 输入框为空时占位符 | String  | | |
| mode | 输入框展示样式，可选值为 wrapped, normal | String | normal | |
| right | 输入框内容是否居右显示 | Boolean  | false | |
| error | 是否显示为输入框错误情况下的样式 | Boolean  | false | |
| componentId | 用于区分输入框之间的唯一名称 | String  | - | |
