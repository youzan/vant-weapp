## Slider 滑块

### 使用指南
在 app.json 或 index.json 中引入组件
```json
"usingComponents": {
  "van-slider": "/packages/slider/index"
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
<van-slider value="50" step="10" bar-height="4px" />
```

### API

| 参数       | 说明      | 类型       | 默认值       |
|-----------|-----------|-----------|-------------|
| value | 当前进度百分比，取值范围为 0-100 | `Number` | `0` |
| disabled | 是否禁用滑块 | `Boolean` | `false` |
| max | 最大值 | `Number` | `100` |
| min | 最小值 | `Number` | `0` |
| step | 步长 | `Number` | `1` |
| bar-height | 进度条高度 | `String` | `2px` |

### Event

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| bind:change | 进度值改变后触发 | event.detail: 当前进度 |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |

### 更新日志

| 版本 | 类型 | 内容 |
|-----------|-----------|-----------|
| 0.2.0 | feature | 新增组件 |
