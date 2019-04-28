## Rate 评分

### 使用指南
在 app.json 或 index.json 中引入组件

es6
```json
"usingComponents": {
  "van-rate": "path/to/vant-weapp/dist/rate/index"
}
```

es5
```json
"usingComponents": {
  "van-rate": "path/to/vant-weapp/lib/rate/index"
}
```

### 代码演示

#### 基础用法

```html
<van-rate value="{{ value }}" bind:change="onChange" />
```

```javascript
Page({
  data: {
    value: 3
  },

  onChange(event) {
    this.setData({
      value: event.detail
    });
  }
});
```

#### 自定义图标

 ```html
<van-rate
  value="{{ value }}"
  icon="like"
  void-icon="like-o"
  bind:change="onChange"
/>
```

#### 自定义样式

```html
<van-rate
  value="{{ value }}"
  size="{{ 25 }}"
  color="#f44"
  void-color="#eee"
  void-icon="star"
  bind:change="onChange"
/>
```

#### 自定义数量

```html
<van-rate
  value="{{ value }}"
  count="{{ 6 }}"
  bind:change="onChange"
/>
```

#### 禁用状态

```html
<van-rate
  disabled
  value="{{ value }}"
  bind:change="onChange"
/>
```

#### 只读状态

```html
<van-rate
  readonly
  value="{{ value }}"
  bind:change="onChange"
/>
```

### API

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| name | 在表单内提交时的标识符 | `String` | - |
| value | 当前分值 | `Number` | - |
| count | 图标总数 | `Number` | `5` |
| size | 图标大小 (px) | `Number` | `20` |
| color | 选中时的颜色 | `String` | `#ffd21e` |
| void-color | 未选中时的颜色 | `String` | `#c7c7c7` |
| icon | 选中时的图标名称或图片链接，可选值见 Icon 组件 | `String` | `star` |
| void-icon | 未选中时的图标名称或图片链接，可选值见 Icon 组件 | `String` | `star-o` |
| readonly | 是否为只读状态 | `Boolean` | `false` |
| disabled | 是否禁用评分 | `Boolean` | `false` |
| disabled-color | 禁用时的颜色 | `String` | `#bdbdbd` |

### Event

| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| change | 当前分值变化时触发的事件 | 当前分值 |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
| icon-class | 图标样式类 |
