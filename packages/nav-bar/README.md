## NavBar 导航栏

### 使用指南

在 app.json 或 index.json 中引入组件

es6
```json
"usingComponents": {
  "van-nav-bar": "path/to/vant-weapp/dist/nav-bar/index"
}
```

es5
```json
"usingComponents": {
  "van-nav-bar": "path/to/vant-weapp/lib/nav-bar/index"
}
```

### 代码演示

#### 基础用法

```html
<van-nav-bar
  title="标题"
  left-text="返回"
  right-text="按钮"
  left-arrow
  bind:click-left="onClickLeft"
  bind:click-right="onClickRight"
/>
```

```js
Page({
  onClickLeft() {
    wx.showToast({ title: '点击返回', icon: 'none' });
  },
  onClickRight() {
    wx.showToast({ title: '点击按钮', icon: 'none' });
  }
});
```

#### 高级用法
通过 slot 定制内容

```html
<van-nav-bar title="标题" left-text="返回" left-arrow>
  <van-icon name="search" slot="right" />
</van-nav-bar>
```


### API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| title | 标题 | `String` | `''` |
| left-text | 左侧文案 | `String` | `''` |
| right-text | 右侧文案 | `String` | `''` |
| left-arrow | 是否显示左侧箭头 | `Boolean` | `false` |
| fixed | 是否固定在顶部 | `Boolean` | `false` |
| border | 是否显示下边框 | `Boolean` | `true` |
| z-index | 元素 z-index | `Number` | `1` |
| safe-area-inset-top | 是否留出顶部安全距离（状态栏高度） | `Boolean` | `true` |

### Slot

| 名称 | 说明 |
|-----------|-----------|
| title | 自定义标题 |
| left | 自定义左侧区域内容 |
| right | 自定义右侧区域内容 |

### Event

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| bind:click-left | 点击左侧按钮时触发 | - |
| bind:click-right | 点击右侧按钮时触发 | - |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
| title-class | 标题样式类 |
