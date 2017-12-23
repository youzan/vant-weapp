## Loadmore 加载

### 使用指南
在 app.wxss 中引入组件库所有样式
```css
@import "path/to/zanui-weapp/dist/index.wxss";
```

在需要使用的页面里引入组件库模板
```html
<import src="path/to/zanui-weapp/dist/loadmore/index.wxml" />

<!-- 直接使用 zan-loadmore 模板，并且直接传入设置值 -->
<template is="zan-loadmore" data="{{ loading: true }}"></template>
```

### 代码演示
`loadmore` 支持三种状态，loading, nodata, nomore。传入指定的值即可显示
```html
<!-- 加载更多 -->
<template is="zan-loadmore" data="{{ loading: true }}"></template>
<!-- 没有可以显示的数据 -->
<template is="zan-loadmore" data="{{ nodata: true }}"></template>
<!-- 没有更多的数据了 -->
<template is="zan-loadmore" data="{{ nomore: true }}"></template>
```
