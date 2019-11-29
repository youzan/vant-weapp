# Collapse 折叠面板

### 引入
在`app.json`或`index.json`中引入组件，详细介绍见[快速上手](#/quickstart#yin-ru-zu-jian)

```json
"usingComponents": {
  "van-collapse": "path/to/@vant/weapp/dist/collapse/index",
  "van-collapse-item": "path/to/@vant/weapp/dist/collapse-item/index"
}
```

## 代码演示

### 基础用法

通过`value`控制展开的面板列表，`activeNames`为数组格式

```html
<van-collapse value="{{ activeNames }}" bind:change="onChange">
  <van-collapse-item title="有赞微商城" name="1">
    提供多样店铺模板，快速搭建网上商城
  </van-collapse-item>
  <van-collapse-item title="有赞零售" name="2">
    网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失
  </van-collapse-item>
  <van-collapse-item title="有赞美业" name="3" disabled>
    线上拓客，随时预约，贴心顺手的开单收银
  </van-collapse-item>
</van-collapse>
```

``` javascript
Page({
  data: {
    activeNames: ['1']
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  }
});
```

### 手风琴

通过`accordion`可以设置为手风琴模式，最多展开一个面板，此时`activeName`为字符串格式

```html
<van-collapse value="{{ activeName }}" bind:change="onChange" accordion>
  <van-collapse-item title="有赞微商城" name="1">
    提供多样店铺模板，快速搭建网上商城
  </van-collapse-item>
  <van-collapse-item title="有赞零售" name="2">
    网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失
  </van-collapse-item>
  <van-collapse-item title="有赞美业" name="3">
    线上拓客，随时预约，贴心顺手的开单收银
  </van-collapse-item>
</van-collapse>
```

``` javascript
Page({
  data: {
    activeName: '1'
  },
  onChange(event) {
    this.setData({
      activeName: event.detail
    });
  }
});
```

### 自定义标题内容

```html
<van-collapse value="{{ activeNames }}" bind:change="onChange">
  <van-collapse-item name="1">
    <view slot="title">有赞微商城<van-icon name="question-o" /></view>
    提供多样店铺模板，快速搭建网上商城
  </van-collapse-item>
  <van-collapse-item title="有赞零售" name="2" icon="shop-o">
    网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失
  </van-collapse-item>
</van-collapse>
```

``` javascript
Page({
  data: {
    activeNames: ['1']
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  }
});
```

## API

### Collapse Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| value | 当前展开面板的 name | 非手风琴模式：*(string \| number)[]*<br>手风琴模式：*string \| number* | - | - |
| accordion | 是否开启手风琴模式 | *boolean* | `false` | - |
| border | 是否显示外边框 | *boolean* | `true` | - |

### Collapse Event

| 事件名 | 说明 | 参数 |
|------|------|------|
| change | 切换面板时触发 | activeNames: *string \| Array* |

### CollapseItem Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|------|
| name | 唯一标识符，默认为索引值 | *string \| number* | `index` | - |
| title | 标题栏左侧内容 | *string \| number* | - | - |
| icon | 标题栏左侧图标名称或图片链接，可选值见 [Icon 组件](#/icon) | *string* | - | - |
| value | 标题栏右侧内容 | *string \| number* | - | - |
| label | 标题栏描述信息 | *string* | - | - |
| border | 是否显示内边框 | *boolean* | `true` | - |
| is-link | 是否展示标题栏右侧箭头并开启点击反馈 | *boolean* | `true` | - |
| clickable | 是否开启点击反馈 | *boolean* | `false` | - |
| disabled | 是否禁用面板 | *boolean* | `false` | - |

### CollapseItem Slot

| 名称 | 说明 |
|------|------|
| - | 面板内容 |
| value | 自定义显示内容 |
| icon | 自定义`icon` |
| title | 自定义`title` |
| right-icon | 自定义右侧按钮，默认是`arrow` |

### Collapse 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |

### CollapseItem 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
| content-class | 内容样式类 |
