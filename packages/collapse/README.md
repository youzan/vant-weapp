# Collapse 折叠面板

### 介绍

将一组内容放置在多个折叠面板中，点击面板的标题可以展开或收缩其内容。

### 引入

在`app.json`或`index.json`中引入组件，详细介绍见[快速上手](#/quickstart#yin-ru-zu-jian)。

```json
"usingComponents": {
  "van-collapse": "@vant/weapp/collapse/index",
  "van-collapse-item": "@vant/weapp/collapse-item/index"
}
```

## 代码演示

### 基础用法

通过`value`控制展开的面板列表，`activeNames`为数组格式。

```html
<van-collapse value="{{ activeNames }}" bind:change="onChange">
  <van-collapse-item title="标题1" name="1">
    代码是写出来给人看的，附带能在机器上运行
  </van-collapse-item>
  <van-collapse-item title="标题2" name="2">
    代码是写出来给人看的，附带能在机器上运行
  </van-collapse-item>
  <van-collapse-item title="标题3" name="3" disabled>
    代码是写出来给人看的，附带能在机器上运行
  </van-collapse-item>
</van-collapse>
```

```javascript
Page({
  data: {
    activeNames: ['1'],
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
});
```

### 手风琴

通过`accordion`可以设置为手风琴模式，最多展开一个面板，此时`activeName`为字符串格式。

```html
<van-collapse accordion value="{{ activeName }}" bind:change="onChange">
  <van-collapse-item title="标题1" name="1">
    代码是写出来给人看的，附带能在机器上运行
  </van-collapse-item>
  <van-collapse-item title="标题2" name="2">
    代码是写出来给人看的，附带能在机器上运行
  </van-collapse-item>
  <van-collapse-item title="标题3" name="3">
    代码是写出来给人看的，附带能在机器上运行
  </van-collapse-item>
</van-collapse>
```

```javascript
Page({
  data: {
    activeName: '1',
  },
  onChange(event) {
    this.setData({
      activeName: event.detail,
    });
  },
});
```

### 事件监听

`van-collapse` 提供了 `change`, `open` 和 `close` 事件。`change` 事件在面板切换时触发，`open` 事件在面板展开时触发，`close` 事件在面板关闭时触发。

```html
<van-collapse
  value="{{ activeNames }}"
  bind:change="onChange"
  bind:open="onOpen"
  bind:close="onClose"
>
  <van-collapse-item title="标题1" name="1">
    代码是写出来给人看的，附带能在机器上运行
  </van-collapse-item>
  <van-collapse-item title="标题2" name="2">
    代码是写出来给人看的，附带能在机器上运行
  </van-collapse-item>
  <van-collapse-item title="标题3" name="3">
    代码是写出来给人看的，附带能在机器上运行
  </van-collapse-item>
</van-collapse>
```

```javascript
Page({
  data: {
    activeNames: ['1'],
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  onOpen(event) {
    Toast(`展开: ${event.detail}`);
  },
  onClose(event) {
    Toast(`关闭: ${event.detail}`);
  },
});
```

### 自定义标题内容

```html
<van-collapse value="{{ activeNames }}" bind:change="onChange">
  <van-collapse-item name="1">
    <view slot="title">标题1<van-icon name="question-o" /></view>
    代码是写出来给人看的，附带能在机器上运行
  </van-collapse-item>
  <van-collapse-item title="标题2" name="2" icon="shop-o">
    代码是写出来给人看的，附带能在机器上运行
  </van-collapse-item>
</van-collapse>
```

```javascript
Page({
  data: {
    activeNames: ['1'],
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
});
```

## API

### Collapse Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前展开面板的 name | 非手风琴模式：_(string \| number)[]_<br>手风琴模式：_string \| number_ | - |
| accordion | 是否开启手风琴模式 | _boolean_ | `false` |
| border | 是否显示外边框 | _boolean_ | `true` |

### Collapse Event

| 事件名 | 说明           | 参数                            |
| ------ | -------------- | ------------------------------- |
| change | 切换面板时触发 | activeNames: _string \| Array_  |
| open   | 展开面板时触发 | currentName: _string \| number_ |
| close  | 关闭面板时触发 | currentName: _string \| number_ |

### CollapseItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 唯一标识符，默认为索引值 | _string \| number_ | `index` |
| title | 标题栏左侧内容 | _string \| number_ | - |
| size | 标题栏大小，可选值为`large` | _string_ | - |
| icon | 标题栏左侧图标名称或图片链接，可选值见 [Icon 组件](#/icon) | _string_ | - |
| value | 标题栏右侧内容 | _string \| number_ | - |
| label | 标题栏描述信息 | _string_ | - |
| border | 是否显示内边框 | _boolean_ | `true` |
| is-link | 是否展示标题栏右侧箭头并开启点击反馈 | _boolean_ | `true` |
| clickable | 是否开启点击反馈 | _boolean_ | `false` |
| disabled | 是否禁用面板 | _boolean_ | `false` |

### CollapseItem Slot

| 名称       | 说明                          |
| ---------- | ----------------------------- |
| -          | 面板内容                      |
| value      | 自定义显示内容                |
| icon       | 自定义`icon`                  |
| title      | 自定义`title`                 |
| right-icon | 自定义右侧按钮，默认是`arrow` |

### Collapse 外部样式类

| 类名         | 说明         |
| ------------ | ------------ |
| custom-class | 根节点样式类 |

### CollapseItem 外部样式类

| 类名          | 说明         |
| ------------- | ------------ |
| custom-class  | 根节点样式类 |
| content-class | 内容样式类   |
