# Badge 徽章

### 引入
在`app.json`或`index.json`中引入组件，默认为`ES6`版本，`ES5`引入方式参见[快速上手](#/quickstart)

```json
"usingComponents": {
  "van-badge": "path/to/vant-weapp/dist/badge/index",
  "van-badge-group": "path/to/vant-weapp/dist/badge-group/index"
}
```


## 代码演示

### 基础用法

通过在`van-badge-group`上设置`active`属性来控制选中的`badge`

```html
<van-badge-group active="{{ active }}" bind:change="onChange">
  <van-badge title="标签名称" />
  <van-badge title="标签名称" info="8" />
  <van-badge title="标签名称" info="99" />
  <van-badge title="标签名称" info="99+" />
</van-badge-group>
```

``` javascript
Page({
  data: {
    active: 0
  },

  onChange(event) {
    wx.showToast({
      icon: 'none',
      title: `切换至第${event.detail}项`
    });
  }
});
```

### BadgeGroup API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| active | 选中`badge`的索引 | `String | Number` | `0` |

### BadgeGroup Event

| 事件名 | 说明 | 参数 |
|------|------|------|
| change | 切换徽章时触发 | 当前选中徽章的索引 |

### BadgeGroup 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |

### Badge API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| title | 内容 | `String` | `''` |
| info | 提示消息 | `String | Number` | `''` |

### Badge Event

| 事件名 | 说明 | 参数 |
|------|------|------|
| click | 点击徽章时触发 | 当前徽章的索引 |

### Badge 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
