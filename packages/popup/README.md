# Popup 弹出层

### 介绍

弹出层容器，用于展示弹窗、信息提示等内容，支持多个弹出层叠加展示

### 引入

在`app.json`或`index.json`中引入组件，详细介绍见[快速上手](#/quickstart#yin-ru-zu-jian)

```json
"usingComponents": {
  "van-popup": "path/to/@vant/weapp/dist/popup/index"
}
```

## 代码演示

### 基础用法

通过`show`属性控制弹出层是否展示

```html
<van-cell title="展示弹出层" is-link bind:click="showPopup" />

<van-popup show="{{ show }}" bind:close="onClose">内容</van-popup>
```

```javascript
Page({
  data: {
    show: false
  },

  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  }
});
```

### 弹出位置

通过`position`属性设置弹出位置，默认居中弹出，可以设置为`top`、`bottom`、`left`、`right`

```html
<van-popup
  show="{{ show }}"
  position="top"
  custom-style="height: 20%;"
  bind:close="onClose"
/>
```

### 关闭图标

设置`closeable`属性后，会在弹出层的右上角显示关闭图标，并且可以通过`close-icon`属性自定义图标，使用`close-icon-position`属性可以自定义图标位置

```html
<van-popup
  show="{{ show }}"
  closeable
  position="bottom"
  custom-style="height: 20%"
  bind:close="onClose"
/>

<!-- 自定义图标 -->
<van-popup
  show="{{ show }}"
  closeable
  close-icon="close"
  position="bottom"
  custom-style="height: 20%"
  bind:close="onClose"
/>

<!-- 图标位置 -->
<van-popup
  show="{{ show }}"
  closeable
  close-icon-position="top-left"
  position="bottom"
  custom-style="height: 20%"
  bind:close="onClose"
/>
```

### 圆角弹窗

设置`round`属性后，弹窗会根据弹出位置添加不同的圆角样式

```html
<van-popup
  show="{{ show }}"
  round
  position="bottom"
  custom-style="height: 20%"
  bind:close="onClose"
/>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| show | 是否显示弹出层 | *boolean* | `false` | - |
| z-index | z-index 层级 | *number* | `100` | - |
| overlay | 是否显示遮罩层 | *boolean* | `true` | - |
| position | 弹出位置，可选值为 `top` `bottom` `right` `left` | *string* | `center` | - |
| duration | 动画时长，单位为毫秒 | *number \| object* | `300` | - |
| round | 是否显示圆角 | *boolean* | `false` | - |
| custom-style | 自定义弹出层样式 | *string* | `` | - |
| overlay-style | 自定义遮罩层样式 | *string* | `` | - |
| close-on-click-overlay | 是否在点击遮罩层后关闭 | *boolean* | `true` | - |
| closeable | 是否显示关闭图标 | *boolean* | `false` | - |
| close-icon | 关闭图标名称或图片链接 | *string* | `cross` | - |
| safe-area-inset-bottom | 是否为 iPhoneX 留出底部安全距离 | *boolean* | `true` | - |
| safe-area-inset-top | 是否留出顶部安全距离（状态栏高度） | *boolean* | `false` | - |

### Events

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| bind:close | 关闭弹出层时触发 | - |
| bind:click-overlay | 点击遮罩层时触发 | - |
| bind:before-enter | 进入前触发 | - |
| bind:enter | 进入中触发 | - |
| bind:after-enter | 进入后触发 | - |
| bind:before-leave | 离开前触发 | - |
| bind:leave | 离开中触发 | - |
| bind:after-leave | 离开后触发 | - |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
