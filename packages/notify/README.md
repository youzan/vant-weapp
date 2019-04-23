## Notify 消息提示

### 使用指南
在 app.json 或 index.json 中引入组件

es6
```json
"usingComponents": {
  "van-notify": "path/to/vant-weapp/dist/notify/index"
}
```

es5
```json
"usingComponents": {
  "van-notify": "path/to/vant-weapp/lib/notify/index"
}
```

### 代码演示

### 基础用法

```js
import Notify from 'path/to/vant-weapp/dist/notify/notify';
// es5
var Notify = require('path/to/vant-weapp/lib/notify/notify');

Notify('通知内容');
```

```html
<van-notify id="van-notify" />
```

### 自定义配置

```js
Notify({
  text: '通知内容',
  duration: 1000,
  selector: '#custom-selector',
  backgroundColor: '#1989fa'
});
```

```html
<van-notify id="custom-selector" />
```

### API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| text | 展示文案 | `String` | - |
| duration | 持续时间 | `Number` | `3000` |
| selector | 自定义选择器 | `String` | `van-notify` |
| color | 字体颜色 | `String` | `#fff` | |
| backgroundColor | 背景色 | `String` | `#f44` |
| context | 选择器的选择范围，可以传入自定义组件的 this 作为上下文 | `Object` | 当前页面 |
| safe-area-inset-top | 是否留出顶部安全距离（状态栏高度 + 导航栏高度） | `Boolean` | `false` |
