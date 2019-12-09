# Tabbar 标签栏

### 引入

在`app.json`或`index.json`中引入组件，详细介绍见[快速上手](#/quickstart#yin-ru-zu-jian)

```json
"usingComponents": {
  "van-tabbar": "path/to/@vant/weapp/dist/tabbar/index",
  "van-tabbar-item": "path/to/@vant/weapp/dist/tabbar-item/index"
}
```

## 代码演示

### 基础用法

```html
<van-tabbar active="{{ active }}" bind:change="onChange">
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
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({ active: event.detail });
  }
});
```

### 通过名称匹配

在标签指定`name`属性的情况下，`v-model`的值为当前标签的`name`

```html
<van-tabbar active="{{ active }}" bind:change="onChange">
  <van-tabbar-item name="home" icon="home-o">标签</van-tabbar-item>
  <van-tabbar-item name="search" icon="search">标签</van-tabbar-item>
  <van-tabbar-item name="friends" icon="friends-o">标签</van-tabbar-item>
  <van-tabbar-item name="setting" icon="setting-o">标签</van-tabbar-item>
</van-tabbar>
```

```javascript
Page({
  data: {
    active: 'home'
  },
  onChange(event) {
    this.setData({ active: event.detail });
  }
});
```

### 显示徽标

```html
<van-tabbar active="{{ active }}" bind:change="onChange">
  <van-tabbar-item icon="home-o">标签</van-tabbar-item>
  <van-tabbar-item icon="search" dot>标签</van-tabbar-item>
  <van-tabbar-item icon="friends-o" info="5">标签</van-tabbar-item>
  <van-tabbar-item icon="setting-o" info="20">标签</van-tabbar-item>
</van-tabbar>
```

### 自定义图标

可以通过 slot 自定义图标，其中 icon slot 代表未选中状态下的图标，icon-active slot 代表选中状态下的图标

```html
<van-tabbar active="{{ active }}" bind:change="onChange">
  <van-tabbar-item info="3">
    <image
      slot="icon"
      src="{{ icon.normal }}"
      mode="aspectFit"
      style="width: 30px; height: 18px;"
    />
    <image
      slot="icon-active"
      src="{{ icon.active }}"
      mode="aspectFit"
      style="width: 30px; height: 18px;"
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
      normal: 'https://img.yzcdn.cn/vant/user-inactive.png',
      active: 'https://img.yzcdn.cn/vant/user-active.png'
    }
  },
  onChange(event) {
    this.setData({ active: event.detail });
  }
});
```

### 自定义颜色

```html
<van-tabbar
  active="{{ active }}"
  active-color="#07c160"
  inactive-color="#000"
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
  onChange(event) {
    this.setData({ active: event.detail });
  }
});
```


### 切换标签事件

```html
<van-tabbar
  active="{{ active }}"
  bind:change="onChange"
>
  <van-tabbar-item icon="home-o">标签1</van-tabbar-item>
  <van-tabbar-item icon="search">标签2</van-tabbar-item>
  <van-tabbar-item icon="friends-o">标签3</van-tabbar-item>
  <van-tabbar-item icon="setting-o">标签4</van-tabbar-item>
</van-tabbar>
```

```javascript
Page({
  data: {
    active: 0,
  },
  onClick(event) {
    wx.showToast({
      title: `点击标签 ${event.detail + 1}`,
      icon: 'none'
    });
  }
});
```


### 结合自定义 tabBar

请参考 [微信官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/custom-tabbar.html) 与 [代码片段](https://developers.weixin.qq.com/s/FjLU4mmp7r9s)

## API

### Tabbar Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-----------|
| active | 当前选中标签的索引 | *number* | - | - |
| fixed | 是否固定在底部 | *boolean* | `true` | - |
| border | 是否展示外边框 | *boolean* | `true` | - |
| z-index | 元素 z-index | *number* | `1` | - |
| active-color | 选中标签的颜色 | *string* | `#1989fa` | - |
| inactive-color | 未选中标签的颜色 | *string* | `#7d7e80` | - |
| safe-area-inset-bottom | 是否为 iPhoneX 留出底部安全距离 | *boolean* | `true` | - |

### Tabbar Event

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| bind:change | 切换标签时触发 | event.detail: 当前选中标签的名称或索引值 |

### TabbarItem Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-----------|-----------|
| name | 标签名称，作为匹配的标识符 | *string \| number* | 当前标签的索引值 | - |
| icon | 图标名称或图片链接，可选值见 [Icon 组件](#/icon) | *string* | - | - |
| dot | 是否显示小红点 | *boolean* | - | - |
| info | 图标右上角提示信息 | *string \| number* | - | - |

### TabbarItem Slot

| 名称 | 说明 |
|-----------|-----------|
| icon | 未选中时的图标 |
| icon-active | 选中时的图标 |
