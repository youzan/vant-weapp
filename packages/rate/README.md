# Rate 评分

### 引入

在`app.json`或`index.json`中引入组件，详细介绍见[快速上手](#/quickstart#yin-ru-zu-jian)

```json
"usingComponents": {
  "van-rate": "path/to/@vant/weapp/dist/rate/index"
}
```
## 代码演示

### 基础用法

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

### 自定义图标

 ```html
<van-rate
  value="{{ value }}"
  icon="like"
  void-icon="like-o"
  bind:change="onChange"
/>
```

### 自定义样式

```html
<van-rate
  value="{{ value }}"
  size="{{ 25 }}"
  color="#ee0a24"
  void-color="#eee"
  void-icon="star"
  bind:change="onChange"
/>
```

### 半星

```html
<van-rate
  value="{{ value }}"
  size="{{ 25 }}"
  allow-half
  color="#ee0a24"
  void-color="#eee"
  void-icon="star"
  bind:change="onChange"
/>
```

### 自定义数量

```html
<van-rate
  value="{{ value }}"
  count="{{ 6 }}"
  bind:change="onChange"
/>
```

### 禁用状态

```html
<van-rate
  disabled
  value="{{ value }}"
  bind:change="onChange"
/>
```

### 只读状态

```html
<van-rate
  readonly
  value="{{ value }}"
  bind:change="onChange"
/>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| name | 在表单内提交时的标识符 | *string* | - | - |
| value | 当前分值 | *number* | - | - |
| count | 图标总数 | *number* | `5` | - |
| size | 图标大小，默认单位为 `px` | *string \| number* | `20px` | - |
| gutter | 图标间距，默认单位为 `px` | *string \| number* | `4px` |
| color | 选中时的颜色 | *string* | `#ffd21e` | - |
| void-color | 未选中时的颜色 | *string* | `#c7c7c7` | - |
| icon | 选中时的图标名称或图片链接，可选值见 [Icon 组件](#/icon) | *string* | `star` | - |
| void-icon | 未选中时的图标名称或图片链接，可选值见 [Icon 组件](#/icon) | *string* | `star-o` | - |
| allow-half | 是否允许半选 | *boolean* | `false` | - |
| readonly | 是否为只读状态 | *boolean* | `false` | - |
| disabled | 是否禁用评分 | *boolean* | `false` | - |
| disabled-color | 禁用时的颜色 | *string* | `#bdbdbd` | - |
| touchable | 是否可以通过滑动手势选择评分 | *boolean* | `true` | - |

### Events

| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| change | 当前分值变化时触发的事件 | event.detail:当前分值 |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
| icon-class | 图标样式类 |
