## Tab 标签页

### 使用指南
在 app.json 或 index.json 中引入组件
```json
"usingComponents": {
  "van-tab": "path/to/vant-weapp/dist/tab/index",
  "van-tabs": "path/to/vant-weapp/dist/tabs/index"
}
```

### 代码演示

#### 基础用法

默认情况下启用第一个标签，可以通过`active`设定当前激活的标签索引，在回调参数的`event.detail`中可以取得被点击标签的标题和索引

```html
<van-tabs active="{{ active }}" bind:change="onChange">
  <van-tab title="标签 1">内容 1</van-tab>
  <van-tab title="标签 2">内容 2</van-tab>
  <van-tab title="标签 3">内容 3</van-tab>
  <van-tab title="标签 4">内容 4</van-tab>
</van-tabs>
```

```js
Page({
  data: {
    active: 1
  },

  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.index + 1}`,
      icon: 'none'
    });
  }
});
```

#### 横向滚动

多于 4 个标签时，Tab 可以横向滚动

```html
<van-tabs active="{{ active }}">
  <van-tab title="标签 1">内容 1</van-tab>
  <van-tab title="标签 2">内容 2</van-tab>
  <van-tab title="标签 3">内容 3</van-tab>
  <van-tab title="标签 4">内容 4</van-tab>
  <van-tab title="标签 5">内容 5</van-tab>
  <van-tab title="标签 6">内容 6</van-tab>
</van-tabs>
```

#### 禁用标签

设置`disabled`属性即可禁用标签。如果需要监听禁用标签的点击事件，可以在`van-tabs`上监听`disabled`事件

```html
<van-tabs bind:disabled="onClickDisabled">
  <van-tab title="标签 1">内容 1</van-tab>
  <van-tab title="标签 2" disabled>内容 2</van-tab>
  <van-tab title="标签 3">内容 3</van-tab>
</van-tabs>
```

```javascript
Page({
  onClickDisabled(event) {
    wx.showToast({
      title: `标签 ${event.detail.index + 1} 已被禁用`,
      icon: 'none'
    });
  }
});
```

#### 样式风格

`Tab`支持两种样式风格：`line`和`card`，默认为`line`样式，可以通过`type`属性修改样式风格

```html
<van-tabs type="card">
  <van-tab title="标签 1">内容 1</van-tab>
  <van-tab title="标签 2">内容 2</van-tab>
  <van-tab title="标签 3">内容 3</van-tab>
</van-tabs>
```

#### 点击事件

可以在`van-tabs`上绑定`click`事件，在回调参数的`event.detail`中可以取得被点击标签的标题和索引

```html
<van-tabs bind:click="onClick">
  <van-tab title="标签 1">内容 1</van-tab>
  <van-tab title="标签 2">内容 2</van-tab>
</van-tabs>
```

```javascript
Page({
  onClick(event) {
    wx.showToast({
      title: `点击标签 ${event.detail.index + 1}`,
      icon: 'none'
    });
  }
});
```

### Tabs API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| active | 当前激活标签的索引 | `Number` | `0` |
| color | 标签颜色 | `String` | `#f44` |
| z-index | z-index 层级 | `Number` | `1` |
| type | 样式风格，可选值为`card` | `String` | `line` |
| border | 是否展示外边框，仅在`line`风格下生效 | `Boolean` | `true` |
| duration | 动画时间 (单位秒)  | `Number` | `0.2` |
| line-width | 底部条宽度 (px) | `Number` | 与当前标签等宽 |
| swipe-threshold | 滚动阈值，设置标签数量超过多少个可滚动 | `Number` | `4` |

### Tab API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| title | 标题 | `String` | - |
| disabled | 是否禁用标签 | `Boolean` | `false` |

### Tab Slot

| 名称 | 说明 |
|-----------|-----------|
| - | 标签页内容 |

### Tabs Event

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| bind:click | 点击标签时触发 | index：标签索引，title：标题 |
| bind:change | 当前激活的标签改变时触发 | index：标签索引，title：标题 |
| bind:disabled | 点击被禁用的标签时触发 | index：标签索引，title：标题 |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |

### 更新日志

| 版本 | 类型 | 内容 |
|-----------|-----------|-----------|
| 0.3.0 | feature | 新增组件 |
| 0.3.2 | bugfix | 修复部分情况下代码报错的问题 |
| 0.3.2 | bugfix | 修复 color 属性会改变未激活标签的颜色的问题 |
| 0.3.3 | feature | 新增 border 属性 |
| 0.3.3 | feature | 支持传入外部样式类 |
| 0.3.5 | bugfix | 修复 active 属性默认值错误的问题 |
| 0.3.7 | feature | 新增 z-index 属性 |
