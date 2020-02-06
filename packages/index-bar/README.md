# IndexBar 索引栏

### 引入

在`app.json`或`index.json`中引入组件，详细介绍见[快速上手](#/quickstart#yin-ru-zu-jian)

```json
"usingComponents": {
  "van-index-bar": "path/to/@vant/weapp/dist/index-bar/index",
  "van-index-anchor": "path/to/@vant/weapp/dist/index-anchor/index"
}
```

> Vant Weapp 1.0 版本开始支持此组件，升级方式参见[快速上手](#/quickstart)

## 代码演示

### 基础用法

点击索引栏时，会自动跳转到对应的`IndexAnchor`锚点位置

```html
<van-index-bar scroll-top="{{ scrollTop }}">
  <view>
    <van-index-anchor index="A" />
    <van-cell title="文本" />
    <van-cell title="文本" />
    <van-cell title="文本" />
  </view>

  <view>
    <van-index-anchor index="B" />
    <van-cell title="文本" />
    <van-cell title="文本" />
    <van-cell title="文本" />
  </view>

  ...
</van-index-bar>
```

```javascript
Page({
  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    });
  }
});
```

### 自定义索引列表

可以通过`index-list`属性自定义展示的索引字符列表，

```html
<van-index-bar
  scroll-top="{{ scrollTop }}"m
  index-list="{{ indexList }}"
>
  <view>
    <van-index-anchor index="1">标题1</van-index-anchor>
    <van-cell title="文本" />
    <van-cell title="文本" />
    <van-cell title="文本" />
  </view>

  <view>
    <van-index-anchor index="2">标题2</van-index-anchor>
    <van-cell title="文本" />
    <van-cell title="文本" />
    <van-cell title="文本" />
  </view>

  ...
</van-index-bar>
```

```javascript
Page({
  data: {
    indexList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },

  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    });
  }
});
```

## API

### IndexBar Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| scroll-top | 当前滚动高度（自定义组件内部感知不到页面滚动，所以依赖接入方传入）| *Number* | 0 | - |
| index-list | 索引字符列表 | *string[] \| number[]* | `A-Z` | - |
| z-index | z-index 层级 | *number* | `1` | - |
| sticky | 是否开启锚点自动吸顶 | *boolean* | `true` | - |
| sticky-offset-top | 锚点自动吸顶时与顶部的距离 | *number* | `0` | - |
| highlight-color | 索引字符高亮颜色 | *string* | `#07c160` | - |

### IndexAnchor Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| use-slot | 是否使用自定义内容的插槽 | *boolean* | `false` | - |
| index | 索引字符 | *string \| number* | - | - |

### IndexBar Events

| 事件名 | 说明 | 回调参数 |
|------|------|------|
| select | 选中字符时触发 | index: 索引字符 |

### IndexAnchor Slots

| 名称 | 说明 |
|------|------|
| - | 锚点位置显示内容，默认为索引字符 |
