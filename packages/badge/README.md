## Badge 徽章

### 使用指南
在 app.json 或 index.json 中引入组件

es6
```json
"usingComponents": {
  "van-badge": "path/to/vant-weapp/dist/badge/index",
  "van-badge-group": "path/to/vant-weapp/dist/badge-group/index"
}
```

es5
```json
"usingComponents": {
  "van-badge": "path/to/vant-weapp/lib/badge/index",
  "van-badge-group": "path/to/vant-weapp/lib/badge-group/index"
}
```

### 代码演示

#### 基础用法

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

### Badge API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| title | 内容 | `String` | `''` |
| info | 提示消息 | `String | Number` | `''` |

### BadgeGroup 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |

### Badge 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |

### 更新日志

| 版本 | 类型 | 内容 |
|-----------|-----------|-----------|
| 0.0.1 | feature | 新增组件 |
| 0.3.2 | bugfix | 修复 active 属性不生效的问题 |
