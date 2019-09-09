# Overlay 遮罩层

### 引入
在`app.json`或`index.json`中引入组件，默认为`ES6`版本，`ES5`引入方式参见[快速上手](#/quickstart)

```json
"usingComponents": {
  "van-overlay": "path/to/vant-weapp/dist/overlay/index"
}
```


## 代码演示

### 基础用法

```html
<van-button bind:click="onClickShow">显示遮罩层</van-button>
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

### Props

| Attribute | Description | Type | Default | Version |
|------|------|------|------|------|
| show | 是否展示遮罩层 | *boolean* | `false` | - |
| mask | 是否展示蒙层背景 | *boolean* | `true` | - |
| z-index | z-index 层级 | *string \| number* | `1` | - |
| duration | 动画时长，单位秒 | *string \| number* | `0.3` | - |
| class-name | 自定义类名 | *string* | - | - |

### Events

| 事件名 | 说明 | 回调参数 |
|-----------|-----------|-----------|
| bind:click | 点击时触发 | - |