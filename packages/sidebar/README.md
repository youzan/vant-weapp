# Sidebar 侧边导航

### 引入

在`app.json`或`index.json`中引入组件，详细介绍见[快速上手](#/quickstart#yin-ru-zu-jian)

```json
"usingComponents": {
  "van-sidebar": "path/to/@vant/weapp/dist/sidebar/index",
  "van-sidebar-item": "path/to/@vant/weapp/dist/sidebar-item/index"
}
```

> Vant Weapp 1.0 版本开始支持此组件，升级方式参见[快速上手](#/quickstart)

## 代码演示

### 基础用法

通过在`van-sidebar`上设置`activeKey`属性来控制选中项

```html
<van-sidebar active-key="{{ activeKey }}" bind:change="onChange">
  <van-sidebar-item title="标签名称" />
  <van-sidebar-item title="标签名称" />
  <van-sidebar-item title="标签名称" />
</van-sidebar>
```

``` javascript
Page({
  data: {
    activeKey: 0
  },

  onChange(event) {
    wx.showToast({
      icon: 'none',
      title: `切换至第${event.detail}项`
    });
  }
});
```

### 提示信息

设置`dot`属性后，会在右上角展示一个小红点。设置`info`属性后，会在右上角展示相应的徽标

```html
<van-sidebar active-key="{{ activeKey }}">
  <van-sidebar-item title="标签名称" dot />
  <van-sidebar-item title="标签名称" info="5" />
  <van-sidebar-item title="标签名称" info="99+" />
</van-sidebar>
```

## API

### Sidebar Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| activeKey | 选中项的索引 | *string \| number* | `0` | - |

### Sidebar Event

| 事件名 | 说明 | 参数 |
|------|------|------|
| change | 切换徽章时触发 | 当前选中徽章的索引 |

### Sidebar 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |

### SidebarItem Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| title | 内容 | *string* | `''` | - |
| dot | 是否显示右上角小红点 | *boolean* | `false` | - |
| info | 提示消息 | *string \| number* | `''` | - |

### SidebarItem Event

| 事件名 | 说明 | 参数 |
|------|------|------|
| click | 点击徽章时触发 | 当前徽章的索引 |

### SidebarItem 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
