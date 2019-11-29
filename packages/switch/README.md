# Switch 开关

### 引入

在`app.json`或`index.json`中引入组件，详细介绍见[快速上手](#/quickstart#yin-ru-zu-jian)

```json
"usingComponents": {
  "van-switch": "path/to/@vant/weapp/dist/switch/index"
}
```

## 代码演示

### 基础用法

```html
<van-switch checked="{{ checked }}" bind:change="onChange" />
```

```javascript
Page({
  data: {
    checked: true
  },

  onChange({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData({ checked: detail });
  }
});
```

### 禁用状态

```html
<van-switch checked="{{ checked }}" disabled />
```

### 加载状态

```html
<van-switch checked="{{ checked }}" loading />
```

### 自定义大小

```html
<van-switch checked="{{ checked }}" size="24px" />
```

### 自定义颜色

```html
<van-switch
  checked="{{ checked }}"
  active-color="#07c160"
  inactive-color="#ee0a24"
/>
```

### 异步控制

```html
<van-switch
  checked="{{ checked }}"
  bind:change="onChange"
/>
```

```js
Page({
  data: {
    checked: true
  },

  onChange({ detail }) {
    wx.showModal({
      title: '提示',
      content: '是否切换开关？',
      success: res => {
        if (res.confirm) {
          this.setData({ checked2: detail });
        }
      }
    });
  }
});
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| name | 在表单内提交时的标识符 | *string* | - | - |
| checked | 开关选中状态 | *any* | `false` | - |
| loading | 是否为加载状态 | *boolean* | `false` | - |
| disabled | 是否为禁用状态 | *boolean* | `false` | - |
| size | 开关尺寸 | *string* | `30px` | - |
| active-color | 打开时的背景色 | *string* | `#1989fa` | - |
| inactive-color | 关闭时的背景色 | *string* | `#fff` | - |
| active-value | 打开时的值 | *any* | `true` | - |
| inactive-value | 关闭时的值 | *any* | `false` | - |

### Events

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| bind:change | 开关状态切换回调 | event.detail: 是否选中开关 |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
| node-class | 圆点样式类 |
