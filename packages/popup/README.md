## Popup 弹出层

### 使用指南
在 app.json 或 index.json 中引入组件

es6
```json
"usingComponents": {
  "van-popup": "path/to/vant-weapp/dist/popup/index"
}
```

es5
```json
"usingComponents": {
  "van-popup": "path/to/vant-weapp/lib/popup/index"
}
```

### 代码演示

#### 基础用法
`popup`默认从中间弹出

```html
<van-popup show="{{ show }}" bind:close="onClose">内容</van-popup>
```

```javascript
Page({
  data: {
    show: false
  },

  onClose() {
    this.setData({ show: false });
  }
});
```

#### 弹出位置
通过`position`属性设置 Popup 弹出位置

```html
<van-popup
  show="{{ show }}"
  position="top"
  overlay="{{ false }}"
  bind:close="onClose"
>
  内容
</van-popup>
```

### API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| show | 是否显示弹出层 | `Boolean` | `false` |
| z-index | z-index 层级 | `Number` | `100` |
| overlay | 是否显示背景蒙层 | `Boolean` | `true` |
| position | 可选值为 `top` `bottom` `right` `left` | `String` | - |
| duration | 动画时长，单位为毫秒 | `Number | Object` | `300` |
| custom-style | 自定义弹出层样式 | `String` | `` |
| overlay-style | 自定义背景蒙层样式 | `String` | `` |
| close-on-click-overlay | 点击蒙层是否关闭 Popup | `Boolean` | `true` |
| safe-area-inset-bottom | 是否为iPhoneX留出底部安全距离 | `Boolean` | `true` |
| safe-area-inset-top | 是否留出顶部安全距离（状态栏高度 + 导航栏高度） | `Boolean` | `false` |

### Event

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| bind:close | 蒙层关闭时触发 | - |
| bind:click-overlay | 点击蒙层时触发 | - |
| bind:transitionEnd | 蒙层关闭后触发 | - |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
