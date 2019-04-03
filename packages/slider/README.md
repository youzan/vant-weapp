## Slider 滑块

### 使用指南
在 app.json 或 index.json 中引入组件

es6
```json
"usingComponents": {
  "van-slider": "path/to/vant-weapp/dist/slider/index"
}
```

es5
```json
"usingComponents": {
  "van-slider": "path/to/vant-weapp/lib/slider/index"
}
```

#### 基本用法

```html
<van-slider value="50" bind:change="onChange" />
```

```js
Page({
  onChange(event) {
    wx.showToast({
      icon: 'none',
      title: `当前值：${event.detail}`
    });
  }
});
```

#### 指定选择范围

```html
<van-slider value="50" min="10" max="90" />
```

#### 禁用

```html
<van-slider value="50" disabled />
```

#### 指定步长

```html
<van-slider value="50" step="10" />
```

#### 自定义样式

```html
<van-slider
  value="50"
  bar-height="4px"
  active-color="#f44"
/>
```

#### 自定义按钮

```html
<van-slider
  value="{{ currentValue }}"
  use-button-slot
  bind:drag="onDrag"
>
  <view class="custom-button" slot="button">
    {{ currentValue }}/100
  </view>
</van-slider>
```

```js
Page({
  data: {
    currentValue: 50
  },

  onDrag(event) {
    this.setData({
      currentValue: event.detail.value
    });
  }
});
```

#### 自定义按钮

```html
<van-slider
  value="{{ currentValue }}"
  use-button-slot
  bind:drag="onDrag"
>
  <view class="custom-button" slot="button">
    {{ currentValue }}/100
  </view>
</van-slider>
```

```js
Page({
  data: {
    currentValue: 30
  },

  onDrag(event) {
    this.setData({
      currentValue: event.detail.value
    });
  }
});
```

### API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| value | 当前进度百分比，取值范围为 0-100 | `Number` | `0` |
| disabled | 是否禁用滑块 | `Boolean` | `false` |
| max | 最大值 | `Number` | `100` |
| min | 最小值 | `Number` | `0` |
| step | 步长 | `Number` | `1` |
| bar-height | 进度条高度 | `String` | `2px` |
| active-color | 进度条激活态颜色 | `String` | `#1989fa` |
| inactive-color | 进度条默认颜色 | `String` | `#e5e5e5` |

### Event

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| bind:drag | 拖动进度条时触发 | event.detail.value: 当前进度 |
| bind:change | 进度值改变后触发 | event.detail: 当前进度 |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
