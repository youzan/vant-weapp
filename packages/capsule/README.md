## Capsule 胶囊

### 使用指南
在 app.wxss 中引入组件库所有样式
```css
@import "path/to/zanui-weapp/dist/index.wxss";
```

在需要使用的模板里引入组件库模板
```html
<import src="path/to/zanui-weapp/dist/capsule/index.wxml" />
```

### 代码演示

#### 基础用法
可以用 leftText 和 rightText 控制左右文案
```html
<template is="capsule" data="{{ leftText: '1折', rightText: '限购一份'}}" />
```

#### 使用不同类型胶囊
按钮支持额外的三种类型 primary, danger, warn
```html
<template is="capsule" data="{{ leftText: '1折', rightText: '限购一份', type: 'danger' }}" />
```

#### 自定义颜色
通过 color 熟悉，可以自定义显示的颜色
```html
<template is="capsule" data="{{ leftText: '1折', rightText: '限购一份', color: '#38f' }}" />
```
