# Toast 轻提示

### 引入

在`app.json`或`index.json`中引入组件，详细介绍见[快速上手](#/quickstart#yin-ru-zu-jian)

```json
"usingComponents": {
  "van-toast": "path/to/@vant/weapp/dist/toast/index"
}
```

## 代码演示

### 文字提示

```javascript
import Toast from 'path/to/@vant/weapp/dist/toast/toast';

Toast('我是提示文案，建议不超过十五字~');
```

```html
<van-toast id="van-toast" />
```

### 加载提示

```javascript
Toast.loading({
  mask: true,
  message: '加载中...'
});
```

### 成功/失败提示

```javascript
Toast.success('成功文案');
Toast.fail('失败文案');
```

### 高级用法

```javascript
const toast = Toast.loading({
  duration: 0,       // 持续展示 toast
  forbidClick: true, // 禁用背景点击
  message: '倒计时 3 秒',
  loadingType: 'spinner',
  selector: '#custom-selector'
});

let second = 3;
const timer = setInterval(() => {
  second--;
  if (second) {
    toast.setData({
      message: `倒计时 ${second} 秒`
    });
  } else {
    clearInterval(timer);
    Toast.clear();
  }
}, 1000);
```

```html
<van-toast id="custom-selector" />
```

### OnClose回调函数

```javascript
Toast({
  type: 'success',
  message: '提交成功',
  onClose: () => {
    console.log('执行OnClose函数')
  }
});
```

## API

### 方法

| 方法名 | 参数 | 返回值 | 介绍 |
|-----------|-----------|-----------|-------------|
| Toast | `options | message` | toast 实例 | 展示提示 |
| Toast.loading | `options | message` | toast 实例 | 展示加载提示 |
| Toast.success | `options | message` | toast 实例 | 展示成功提示 |
| Toast.fail | `options | message` | toast 实例 | 展示失败提示 |
| Toast.clear | `clearAll` | `void` | 关闭提示 |
| Toast.setDefaultOptions | `options` | `void` | 修改默认配置，对所有 Toast 生效 |
| Toast.resetDefaultOptions | - | `void` | 重置默认配置，对所有 Toast 生效 |

### Options

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| type | 提示类型，可选值为 `loading` `success` `fail` `html` | *string* | `text` | - |
| position | 位置，可选值为 `top` `middle` `bottom` | *string* | `middle` | - |
| message | 内容 | *string* | `''` | - | - |
| mask | 是否显示遮罩层 | *boolean* | `false` | - |
| forbidClick | 是否禁止背景点击 | *boolean* | `false` | - |
| loadingType | 加载图标类型, 可选值为 `spinner` | *string* | `circular` | - |
| zIndex | z-index 层级 | *number* | `1000` | - |
| duration | 展示时长(ms)，值为 0 时，toast 不会消失 | *number* | `2000` | - |
| selector | 自定义选择器 | *string* | `van-toast` | - |
| context | 选择器的选择范围，可以传入自定义组件的 this 作为上下文 | *object* | 当前页面 | - |
| onClose | 关闭时的回调函数 | *Function* | - | - |

### Slot

| 名称 | 说明 |
|-----------|-----------|
| - | 自定义内容 |
