# Overlay 遮罩层

### 介绍

创建一个遮罩层，用于强调特定的页面元素，并阻止用户进行其他操作

### 引入

在`app.json`或`index.json`中引入组件，详细介绍见[快速上手](#/quickstart#yin-ru-zu-jian)

```json
"usingComponents": {
  "van-overlay": "path/to/@vant/weapp/dist/overlay/index"
}
```

## 代码演示

### 基础用法

```html
<van-button type="primary" bind:click="onClickShow">显示遮罩层</van-button>
<van-overlay show="{{ show }}" bind:click="onClickHide"/>
```

```js
Page({
  data: {
    show: false
  },

  onClickShow() {
    this.setData({ show: true });
  },

  onClickHide() {
    this.setData({ show: false });
  }
});
```

### 嵌入内容

通过默认插槽可以在遮罩层上嵌入任意内容

```html
<van-button type="primary" bind:click="onClickShow">嵌入内容</van-button>
<van-overlay show="{{ show }}" bind:click="onClickHide">
  <view class="wrapper">
    <view class="block" catch:tap="noop" />
  </view>
</van-overlay>
```

```js
Page({
  data: {
    show: false
  },

  onClickShow() {
    this.setData({ show: true });
  },

  onClickHide() {
    this.setData({ show: false });
  },

  noop() {}
});
```

```css
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
```

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| show | 是否展示遮罩层 | *boolean* | `false` | - |
| z-index | z-index 层级 | *string \| number* | `1` | - |
| duration | 动画时长，单位秒 | *string \| number* | `0.3` | - |
| class-name | 自定义类名 | *string* | - | - |
| custom-style | 自定义样式 | *string* | - | - |

### Events

| 事件名 | 说明 | 回调参数 |
|-----------|-----------|-----------|
| bind:click | 点击时触发 | - |

### Slots

| 名称 | 说明 |
|------|------|
| - | 默认插槽，用于在遮罩层上方嵌入内容 |

