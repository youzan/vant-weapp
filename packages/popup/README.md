## Popup 弹出层

### 使用指南
在 app.json 或 index.json 中引入组件
```json
"usingComponents": {
  "van-popup": "path/to/vant-weapp/dist/popup/index"
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
| duration | 动画时长，单位为毫秒 | `Number` | `300` |
| custom-style | 自定义弹出层样式 | `String` | `` |
| overlay-style | 自定义背景蒙层样式 | `String` | `` |
| close-on-click-overlay | 点击蒙层是否关闭 Popup | `Boolean` | `true` |

### Event

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| bind:close | 蒙层关闭时触发 | - |
| bind:click-overlay | 点击蒙层时触发 | - |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |

### 更新日志

| 版本 | 类型 | 内容 |
|-----------|-----------|-----------|
| 0.0.1 | feature | 新增组件 |
| 0.3.2 | feature | 支持退场动画 |
| 0.3.2 | feature | 新增 z-index 属性 |
| 0.3.3 | feature | 新增 custom-style 属性 |
