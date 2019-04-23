## Tabbar 标签栏

### 使用指南
在 app.json 或 index.json 中引入组件

es6
```json
"usingComponents": {
  "van-tabbar": "path/to/vant-weapp/dist/tabbar/index",
  "van-tabbar-item": "path/to/vant-weapp/dist/tabbar-item/index"
}
```

es6
```json
"usingComponents": {
  "van-tabbar": "path/to/vant-weapp/lib/tabbar/index",
  "van-tabbar-item": "path/to/vant-weapp/lib/tabbar-item/index"
}
```

### 代码演示

#### 基础用法

```html
<van-tabbar active="{{ active }}" bind:change="onChange">
  <van-tabbar-item icon="home-o">标签</van-tabbar-item>
  <van-tabbar-item icon="search" dot>标签</van-tabbar-item>
  <van-tabbar-item icon="friends-o" info="5">标签</van-tabbar-item>
  <van-tabbar-item icon="setting-o" info="20">标签</van-tabbar-item>
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
  <van-tabbar-item info="3">
    <image
      slot="icon"
      src="{{ icon.normal }}"
      mode="aspectFit"
    />
    <image
      slot="icon-active"
      src="{{ icon.active }}"
      mode="aspectFit"
    />
    自定义
  </van-tabbar-item>
  <van-tabbar-item icon="search">标签</van-tabbar-item>
  <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
</van-tabbar>
```

```javascript
Page({
  data: {
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

#### 自定义颜色

```html
<van-tabbar
  active="{{ active }}"
  active-color="#07c160"
  bind:change="onChange"
>
  <van-tabbar-item icon="home-o">标签</van-tabbar-item>
  <van-tabbar-item icon="search">标签</van-tabbar-item>
  <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
  <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
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

### Tabbar API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| active | 当前选中标签的索引 | `Number` | - |
| active-color | 选中标签的颜色 | `String` | `#1989fa` |
| fixed | 是否固定在底部 | `Boolean` | `true` |
| z-index | 元素 z-index | `Number` | `1` |
| safe-area-inset-bottom | 是否为iPhoneX留出底部安全距离 | `Boolean` | `true` |

### Tabbar Event

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| bind:change | 切换标签时触发 | event.detail: 当前选中标签的索引 |

### TabbarItem API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-----------|
| icon | 图标名称或图片链接，可选值见 Icon 组件 | `String` | - |
| dot | 是否显示小红点 | `Boolean` | - |
| info | 图标右上角提示信息 | `String | Number` | - |

### TabbarItem Slot

| 名称 | 说明 |
|-----------|-----------|
| icon | 未选中时的图标 |
| icon-active | 选中时的图标 |
