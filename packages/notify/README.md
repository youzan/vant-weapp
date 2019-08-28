# Notify 消息提示

### 引入
在`app.json`或`index.json`中引入组件，默认为`ES6`版本，`ES5`引入方式参见[快速上手](#/quickstart)

```json
"usingComponents": {
  "van-notify": "path/to/vant-weapp/dist/notify/index"
}
```

## 代码演示

### 基础用法

```js
import Notify from 'path/to/vant-weapp/dist/notify/notify';

Notify('通知内容');
```

```html
<!-- 在页面内添加对应的节点 -->
<van-notify id="van-notify" />
```

### 自定义通知

自定义消息通知的颜色和展示时长

```js
Notify({
  message: '自定义颜色',
  color: '#ad0000',
  background: '#ffe1e1'
});

Notify({
  message: '自定义时长',
  duration: 1000
});
```

### 自定义选择器

```js
Notify({
  message: '自定义节点选择器',
  duration: 1000,
  selector: '#custom-selector'
});
```

```html
<!-- 在页面内添加自定义节点 -->
<van-notify id="custom-selector" />
```

### Props

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| message | 展示文案 | *string* | - |
| duration | 持续时间 | *number* | `3000` |
| selector | 自定义节点选择器 | *string* | `van-notify` |
| color | 字体颜色 | *string* | `#fff` | |
| background | 背景色 | *string* | `#f44` |
| context | 选择器的选择范围，可以传入自定义组件的 this 作为上下文 | *object* | 当前页面 |
| safe-area-inset-top | 是否留出顶部安全距离（状态栏高度 + 导航栏高度） | *boolean* | `false` |
