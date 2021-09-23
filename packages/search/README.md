# Search 搜索

### 介绍

用于搜索场景的输入框组件。

### 引入

在`app.json`或`index.json`中引入组件，详细介绍见[快速上手](#/quickstart#yin-ru-zu-jian)。

```json
"usingComponents": {
  "van-search": "@vant/weapp/search/index"
}
```

## 代码演示

### 基础用法

`van-search` 中，value 用于控制搜索框中的文字。background 可以自定义搜索框外部背景色。

```html
<van-search value="{{ value }}" placeholder="请输入搜索关键词" />
```

### 事件监听

`van-search` 提供了 search 和 cancel 事件。search 事件在用户点击键盘上的搜索按钮触发。cancel 事件在用户点击搜索框右侧取消按钮时触发。

```html
<van-search
  value="{{ value }}"
  placeholder="请输入搜索关键词"
  show-action
  bind:search="onSearch"
  bind:cancel="onCancel"
/>
```

### 搜索框内容对齐

通过 `input-align` 属性可以设置搜索框内容的对齐方式。

```html
<van-search
  value="{{ value }}"
  input-align="center"
  placeholder="请输入搜索关键词"
/>
```

### 禁用搜索框

通过 `disabled` 属性可以将组件设置为禁用状态。

```html
<van-search disabled value="{{ value }}" placeholder="请输入搜索关键词" />
```

### 自定义背景色

通过`background`属性可以设置搜索框外部的背景色，通过`shape`属性设置搜索框的形状，可选值为`round`。

```html
<van-search
  value="{{ value }}"
  shape="round"
  background="#4fc08d"
  placeholder="请输入搜索关键词"
/>
```

### 自定义按钮

`van-search` 支持自定义右侧取消按钮，使用名字为 action 的 slot，并设置 use-action-slot 为 true 即可。

```html
<van-search
  value="{{ value }}"
  label="地址"
  placeholder="请输入搜索关键词"
  use-action-slot
  bind:change="onChange"
  bind:search="onSearch"
>
  <view slot="action" bind:tap="onClick">搜索</view>
</van-search>
```

```javascript
Page({
  data: {
    value: '',
  },
  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },
  onSearch() {
    Toast('搜索' + this.data.value);
  },
  onClick() {
    Toast('搜索' + this.data.value);
  },
});
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 在表单内提交时的标识符 | _string_ | - |
| label | 搜索框左侧文本 | _string_ | - |
| shape | 形状，可选值为 `round` | _string_ | `square` |
| value | 当前输入的值 | _string \| number_ | - |
| background | 搜索框背景色 | _string_ | `#f2f2f2` |
| show-action | 是否在搜索框右侧显示取消按钮 | _boolean_ | `false` |
| action-text `v1.0.0` | 取消按钮文字 | _string_ | `取消` |
| focus | 获取焦点 | _boolean_ | `false` |
| error | 是否将输入内容标红 | _boolean_ | `false` |
| disabled | 是否禁用输入框 | _boolean_ | `false` |
| readonly | 是否只读 | _boolean_ | `false` |
| clearable | 是否启用清除控件 | _boolean_ | `true` |
| clear-trigger `v1.8.4` | 显示清除图标的时机，`always` 表示输入框不为空时展示，<br>`focus` 表示输入框聚焦且不为空时展示 | _string_ | `focus` |
| clear-icon `v1.8.4` | 清除[图标名称](#/icon)或图片链接 | _string_ | `clear` |
| maxlength | 最大输入长度，设置为 -1 的时候不限制最大长度 | _number_ | `-1` |
| use-action-slot | 是否使用 action slot | _boolean_ | `false` |
| placeholder | 输入框为空时占位符 | _string_ | - |
| placeholder-style | 指定占位符的样式 | _string_ | - |
| input-align | 输入框内容对齐方式，可选值为 `center` `right` | _string_ | `left` |
| use-left-icon-slot | 是否使用输入框左侧图标 slot | _boolean_ | `false` |
| use-right-icon-slot | 是否使用输入框右侧图标 slot | _boolean_ | `false` |
| left-icon | 输入框左侧图标名称或图片链接，可选值见 Icon 组件（如果设置了 use-left-icon-slot，则该属性无效） | _string_ | `search` |
| right-icon | 输入框右侧图标名称或图片链接，可选值见 Icon 组件（如果设置了 use-right-icon-slot，则该属性无效） | _string_ | - |

### Events

| 事件名           | 说明               | 参数                     |
| ---------------- | ------------------ | ------------------------ |
| bind:search      | 确定搜索时触发     | event.detail: 当前输入值 |
| bind:change      | 输入内容变化时触发 | event.detail: 当前输入值 |
| bind:cancel      | 取消搜索搜索时触发 | -                        |
| bind:focus       | 输入框聚焦时触发   | -                        |
| bind:blur        | 输入框失焦时触发   | -                        |
| bind:clear       | 点击清空控件时触发 | -                        |
| bind:click-input | 点击搜索区域时触发 | -                        |

### Slot

| 名称 | 说明 |
| --- | --- |
| action | 自定义搜索框右侧按钮，需要在`use-action-slot`为 true 时才会显示 |
| label | 自定义搜索框左侧文本 |
| left-icon | 自定义输入框左侧图标，需要在`use-left-icon-slot`为 true 时才会显示 |
| right-icon | 自定义输入框右侧图标，需要在`use-right-icon-slot`为 true 时才会显示 |

### 外部样式类

| 类名         | 说明           |
| ------------ | -------------- |
| custom-class | 根节点样式类   |
| field-class  | 搜索框样式类   |
| input-class  | 输入框样式类   |
| cancel-class | 取消按钮样式类 |
