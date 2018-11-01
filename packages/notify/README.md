## Notify 消息提示

### 使用指南
在 app.json 或 index.json 中引入组件
```json
{
  "usingComponents": {
    "van-notify": "path/to/vant-weapp/dist/notify/index"
  }
}
```

### 代码演示

### 基础用法

```js
import Notify from 'path/to/vant-weapp/dist/notify/notify';

Notify('通知内容')
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

### 更新日志

| 版本 | 类型 | 内容 |
|-----------|-----------|-----------|
| 0.0.1 | feature | 新增组件 |
