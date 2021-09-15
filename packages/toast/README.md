# Toast 轻提示

### 介绍

在页面中间弹出黑色半透明提示，用于消息通知、加载提示、操作结果提示等场景。

### 引入

在`app.json`或`index.json`中引入组件，详细介绍见[快速上手](#/quickstart#yin-ru-zu-jian)。

```json
"usingComponents": {
  "van-toast": "@vant/weapp/toast/index"
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

使用 `Toast.loading` 方法展示加载提示，通过 `forbidClick` 属性可以禁用背景点击，通过 `loadingType` 属性可以自定义加载图标类型。

```javascript
Toast.loading({
  message: '加载中...',
  forbidClick: true,
});

// 自定义加载图标
Toast.loading({
  message: '加载中...',
  forbidClick: true,
  loadingType: 'spinner',
});
```

### 成功/失败提示

```javascript
Toast.success('成功文案');
Toast.fail('失败文案');
```

### 动态更新提示

```javascript
const toast = Toast.loading({
  duration: 0, // 持续展示 toast
  forbidClick: true,
  message: '倒计时 3 秒',
  selector: '#custom-selector',
});

let second = 3;
const timer = setInterval(() => {
  second--;
  if (second) {
    toast.setData({
      message: `倒计时 ${second} 秒`,
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

### OnClose 回调函数

```javascript
Toast({
  type: 'success',
  message: '提交成功',
  onClose: () => {
    console.log('执行OnClose函数');
  },
});
```

## API

### 方法

| 方法名 | 参数 | 返回值 | 介绍 |
| --- | --- | --- | --- |
| Toast | `options \| message` | toast 实例 | 展示提示 |
| Toast.loading | `options \| message` | toast 实例 | 展示加载提示 |
| Toast.success | `options \| message` | toast 实例 | 展示成功提示 |
| Toast.fail | `options \| message` | toast 实例 | 展示失败提示 |
| Toast.clear | `clearAll` | `void` | 关闭提示 |
| Toast.setDefaultOptions | `options` | `void` | 修改默认配置，对所有 Toast 生效 |
| Toast.resetDefaultOptions | - | `void` | 重置默认配置，对所有 Toast 生效 |

### Options

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 提示类型，可选值为 `loading` `success` `fail` `html` | _string_ | `text` |
| position | 位置，可选值为 `top` `middle` `bottom` | _string_ | `middle` |
| message | 内容 | _string_ | `''` |
| mask | 是否显示遮罩层 | _boolean_ | `false` |
| forbidClick | 是否禁止背景点击 | _boolean_ | `false` |
| loadingType | 加载图标类型, 可选值为 `spinner` | _string_ | `circular` |
| zIndex | z-index 层级 | _number_ | `1000` |
| duration | 展示时长(ms)，值为 0 时，toast 不会消失 | _number_ | `2000` |
| selector | 自定义选择器 | _string_ | `van-toast` |
| context | 选择器的选择范围，可以传入自定义组件的 this 作为上下文 | _object_ | 当前页面 |
| onClose | 关闭时的回调函数 | _Function_ | - |

### Slot

| 名称 | 说明       |
| ---- | ---------- |
| -    | 自定义内容 |
