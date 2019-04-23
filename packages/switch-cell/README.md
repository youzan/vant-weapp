## SwitchCell 开关单元格

### 使用指南
在 app.json 或 index.json 中引入组件

es6
```json
"usingComponents": {
  "van-switch-cell": "path/to/vant-weapp/dist/switch-cell/index"
}
```

es5
```json
"usingComponents": {
  "van-switch-cell": "path/to/vant-weapp/lib/switch-cell/index"
}
```

### 代码演示

#### 基础用法

```html
<van-switch-cell
  title="标题"
  checked="{{ checked }}"
  bind:change="onChange"
/>
```

```javascript
Page({
  data: {
    checked: true
  },

  onChange(event) {
    // 需要手动对 checked 状态进行更新
    this.setData({ checked: event.detail });
  }
});
```

#### 禁用状态
通过`disabled`属性可以将组件设置为禁用状态

```html
<van-switch-cell
  disabled
  title="标题"
  checked="{{ checked }}"
  bind:change="onChange"
/>
```

#### 加载状态
通过`loading`属性可以将组件设置为加载状态

```html
<van-switch-cell
  loading
  title="标题"
  checked="{{ checked }}"
  bind:change="onChange"
/>
```

### API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| name | 在表单内提交时的标识符 | `String` | - |
| checked | 开关状态 | `any` | `false` |
| title | 左侧标题 |  `String` | `''` |
| loading | 是否为加载状态 |  `Boolean` | `false` |
| disabled | 是否为禁用状态 |  `Boolean` | `false` |
| size | 开关尺寸 | `String` | `24px` |
| active-color | 开关打开时的背景色 | `String` | `#1989fa` |
| inactive-color | 开关关闭时的背景色 | `String` | `#fff` |
| active-value | 打开时的值 | `any` | `true` |
| inactive-value | 关闭时的值 | `any` | `false` |

### Event

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| bind:change | 开关状态切换回调 | event.detail: 是否选中开关 |
