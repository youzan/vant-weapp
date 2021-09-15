# Skeleton 骨架屏

### 介绍

用于在内容加载过程中展示一组占位图形。

### 引入

在`app.json`或`index.json`中引入组件，详细介绍见[快速上手](#/quickstart#yin-ru-zu-jian)。

```json
"usingComponents": {
  "van-skeleton": "@vant/weapp/skeleton/index"
}
```

> Vant Weapp 1.0 版本开始支持此组件，升级方式参见[快速上手](#/quickstart)

## 代码演示

### 基础用法

通过`title`属性显示标题占位图，通过`row`属性配置占位段落行数。

```html
<van-skeleton title row="3" />
```

### 显示头像

通过`avatar`属性显示头像占位图。

```html
<van-skeleton title avatar row="3" />
```

### 展示子组件

将`loading`属性设置成`false`表示内容加载完成，此时会隐藏占位图，并显示`Skeleton`的子组件。

```html
<van-skeleton title avatar row="3" loading="{{ loading }}">
  <view>实际内容</view>
</van-skeleton>
```

```js
Page({
  data: {
    loading: true,
  },
  onReady() {
    this.setData({
      loading: false,
    });
  },
});
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| row | 段落占位图行数 | _number_ | `0` |
| row-width | 段落占位图宽度，可传数组来设置每一行的宽度 | _string \| string[]_ | `100%` |
| title | 是否显示标题占位图 | _boolean_ | `false` |
| title-width | 标题占位图宽度 | _string \| number_ | `40%` |
| avatar | 是否显示头像占位图 | _boolean_ | `false` |
| avatar-size | 头像占位图大小 | _string \| number_ | `32px` |
| avatar-shape | 头像占位图形状，可选值为`square` | _string_ | `round` |
| loading | 是否显示占位图，传`false`时会展示子组件内容 | _boolean_ | `true` |
| animate | 是否开启动画 | _boolean_ | `true` |
