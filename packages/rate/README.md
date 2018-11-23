## Rate 评分

### 使用指南
在 app.json 或 index.json 中引入组件
```json
"usingComponents": {
  "van-rate": "path/to/vant-weapp/dist/rate/index"
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

#### 自定义颜色

```html
<van-rate
  value="{{ value }}"
  bind:change="onChange"
  size="{{ 25 }}"
  count="{{ 6 }}"
  color="#2ba"
  void-color="#ceefe8"
/>
```

#### 禁用状态

```html
 <van-rate value="{{ value }}" bind:change="onChange" disabled />
```

### API

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| name | 在表单内提交时的标识符 | `String` | - |
| value | 当前分值 | `Number` | - |
| count | 图标总数 | `Number` | `5` |
| size | 图标大小 (px) | `Number` | `20` |
| color | 选中时的颜色 | `String` | `#ffd21e`  |
| void-color | 未选中时的颜色 | `String` | `#c7c7c7` |
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
