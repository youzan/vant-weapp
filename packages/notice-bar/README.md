## NoticeBar 通告栏

### 使用指南

在 app.json 或 index.json 中引入组件

es6
```json
"usingComponents": {
  "van-notice-bar": "path/to/vant-weapp/dist/notice-bar/index"
}
```

es5
```json
"usingComponents": {
  "van-notice-bar": "path/to/vant-weapp/lib/notice-bar/index"
}
```


### 代码演示

#### 基础用法

```html
<van-notice-bar
  left-icon="https://img.yzcdn.cn/1.png"
  text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
/>
```

#### 禁用滚动
文字内容多于一行时，可通过`scrollable`参数控制是否开启滚动

```html
<van-notice-bar
  scrollable="false"
  text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
/>
```

#### 通告栏模式
默认模式为空，支持`closeable`和`link`。

```html
<!-- closeable 模式，在右侧显示关闭按钮 -->
<van-notice-bar
  mode="closeable"
  text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
/>

<!-- link 模式，在右侧显示链接箭头 -->
<van-notice-bar
  mode="link"
  text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
/>
```

### API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| mode | 通告栏模式，可选值为 `closeable` `link` | `String` | `''` |
| delay | 动画延迟时间 (s) | `Number` | `1` |
| speed | 滚动速率 (px/s) | `Number` | `50` |
| scrollable | 是否在长度溢出时滚动播放 | `Boolean` | `true` |
| left-icon | 左侧图标图片 URL | `String` | - |
| color | 文本颜色 | `String` | `#ed6a0c` |
| backgroundColor | 滚动条背景 | `String` | `#fffbe8` |
| open-type | 微信开放能力 | `String` | `navigate` |

### Event

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| bind:click | 点击事件回调 | - |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
