## Tabbar 标签栏

### 使用指南
在 app.json 或 index.json 中引入组件
```json
"usingComponents": {
  "van-tabbar": "/packages/tabbar/index",
  "van-tabbar-item": "/packages/tabbar-item/index"
}
```

### 代码演示

#### 基础用法


```html
<van-tabbar active="{{ active }}" bind:change="onChange">
  <van-tabbar-item icon="shop">标签</van-tabbar-item>
  <van-tabbar-item icon="chat" dot>标签</van-tabbar-item>
  <van-tabbar-item icon="records" info="5">标签</van-tabbar-item>
  <van-tabbar-item icon="gold-coin" info="20">标签</van-tabbar-item>
</van-tabbar>
```

```javascript
Page({
  data: {
    active: 0
  },
  // event.detail 的值为当前选中项的索引
  onChange(event) {
    console.log(event.detail);
  }
});
```


#### 自定义图标

可以通过 slot 自定义图标，其中 icon slot 代表未选中状态下的图标，icon-active slot 代表选中状态下的图标

```html
<van-tabbar active="{{ active }}" bind:change="onChange">
  <van-tabbar-item>
    <span>自定义</span>
    <image slot="icon" src="{{ icon.normal }}" class="icon" mode="aspectFit" />
    <image slot="icon-active" src="{{ icon.active }}" mode="aspectFit" />
  </van-tabbar-item>
  <van-tabbar-item icon="chat">标签</van-tabbar-item>
  <van-tabbar-item icon="records">标签</van-tabbar-item>
</van-tabbar>
```

```javascript
Page({
  data() {
    active: 0,
    icon: {
      normal: '//img.yzcdn.cn/icon-normal.png',
      active: '//img.yzcdn.cn/icon-active.png'
    }
  },
  onChange(event) {
    console.log(event.detail);
  }
});
```

### Tabbar API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| active | 当前选中标签的索引 | `Number` | - |
| fixed | 是否固定在底部 | `Boolean` | `true` |
| z-index | 元素 z-index | `Number` | `1` |

### Tabbar Event

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| bind:change | 切换标签时触发 | event.detail: 当前选中标签的索引 |

### TabbarItem API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-----------|
| icon | 图标名称 (可选值见 Icon 组件) | `String` | - |
| dot | 是否显示小红点 | `Boolean` | - |
| info | 图标右上角提示信息 | `String | Number` | - |

### TabbarItem Slot

| 名称 | 说明 |
|-----------|-----------|
| icon | 未选中时的图标 |
| icon-active | 选中时的图标 |

### 更新日志

| 版本 | 类型 | 内容 |
|-----------|-----------|-----------|
| 0.1.1 | feature | 新增组件 |
| 0.2.1 | bugfix | 修复 z-index 不生效的问题 |
