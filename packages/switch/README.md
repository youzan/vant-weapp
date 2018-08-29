## Switch 开关

### 使用指南
在 index.json 中引入组件
```json
"usingComponents": {
  "van-switch": "path/to/vant-weapp/dist/switch/index"
}
```

### 代码演示

#### 基础用法
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

#### 禁用状态
```html
<van-switch checked="{{ checked }}" disabled />
```

#### 加载状态
```html
<van-switch checked="{{ checked }}" loading  />
```

#### 高级用法
```html
<van-switch
  size="36px"
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

### API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| name | 在表单内提交时的标识符 | `String` | - |
| checked | 开关选中状态 | `Boolean` | `false` |
| loading | 是否为加载状态 | `Boolean` | `false` |
| disabled | 是否为禁用状态 | `Boolean` | `false` |
| size | 开关尺寸 | `String` | `30px` |

### Event

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| bind:change | 开关状态切换回调 | event.detail: 是否选中开关 |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
| node-class | 圆点样式类 |
