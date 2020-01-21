# Search 搜索

### 引入

在`app.json`或`index.json`中引入组件，详细介绍见[快速上手](#/quickstart#yin-ru-zu-jian)

```json
"usingComponents": {
  "van-search": "path/to/@vant/weapp/dist/search/index"
}
```

## 代码演示

### 基础用法

`van-search` 中，value 用于控制搜索框中的文字。background 可以自定义搜索框外部背景色。

```html
<van-search value="{{ value }}" placeholder="请输入搜索关键词" />
```

### 监听对应事件

`van-search` 提供了 search 和 cancel 事件。search 事件在用户点击键盘上的搜索按钮触发。cancel 事件在用户点击搜索框右侧取消按钮时触发

```html
<van-search
  value="{{ value }}"
  placeholder="请输入搜索关键词"
  show-action
  bind:search="onSearch"
  bind:cancel="onCancel"
/>
```

### 自定义背景色

通过 `background` 属性可以自定义组件背景色

```html
<van-search placeholder="Placeholder" value="{{ value }}" background="#c8c9cc"/>
```

### 禁用搜索框

通过 `disabled` 属性可以将组件设置为禁用状态

```html
<van-search placeholder="请输入搜索关键词" value="{{ value }}" disabled/>
```

### 搜索框内容对齐

通过 `input-align` 属性可以设置搜索框内容的对齐方式

```html
<van-search placeholder="Placeholder" value="{{ value }}" input-align="center"/>
```

### 自定义行动按钮

`van-search` 支持自定义右侧取消按钮，使用名字为 action 的 slot，并设置 use-action-slot 为 true 即可。

```html
<van-search
  value="{{ value }}"
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
    value: ''
  },

  onChange(e) {
    this.setData({
      value: e.detail
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

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| name | 在表单内提交时的标识符 | *string* | - | - |
| label | 搜索框左侧文本 | *string* | - | - |
| shape | 形状，可选值为 `round` | *string* | `square` | - |
| value | 当前输入的值 | *string \| number* | - | - |
| background | 搜索框背景色 | *string* | `#f2f2f2` | - |
| show-action | 是否在搜索框右侧显示取消按钮 | *boolean* | `false` | - |
| action-text | 取消按钮文字 | *boolean* | `取消` | 1.0.0 |
| focus | 获取焦点 | *boolean* | `false` | - |
| error | 是否将输入内容标红 | *boolean* | `false` | - |
| disabled | 是否禁用输入框 | *boolean* | `false` | - |
| readonly | 是否只读 | *boolean* | `false` | - |
| clearable | 是否启用清除控件 | *boolean* | `true` | - |
| maxlength | 最大输入长度，设置为 -1 的时候不限制最大长度 | *number* | `-1` | - |
| use-action-slot | 是否使用 action slot | *boolean* | `false` | - |
| placeholder | 输入框为空时占位符 | *string* | - | - |
| placeholder-style | 指定占位符的样式 | *string* | - | - |
| input-align | 输入框内容对齐方式，可选值为 `center` `right` | *string* | `left` | - |
| use-left-icon-slot | 是否使用输入框左侧图标 slot | *boolean* | `false` | - |
| use-right-icon-slot | 是否使用输入框右侧图标 slot | *boolean* | `false` | - |
| left-icon | 输入框左侧图标名称或图片链接，可选值见 Icon 组件（如果设置了use-left-icon-slot，则该属性无效） | *string* | `search` | - |
| right-icon | 输入框右侧图标名称或图片链接，可选值见 Icon 组件（如果设置了use-right-icon-slot，则该属性无效） | *string* | - | - |

### Events

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| bind:search | 确定搜索时触发 | event.detail: 当前输入值 |
| bind:change | 输入内容变化时触发 | event.detail: 当前输入值 |
| bind:cancel | 取消搜索搜索时触发 | - |
| bind:focus | 输入框聚焦时触发 | - |
| bind:blur | 输入框失焦时触发 | - |
| bind:clear | 点击清空控件时触发 | - |

### Slot

| 名称 | 说明 |
|-----------|-----------|
| action | 自定义搜索框右侧按钮，需要在`use-action-slot`为 true 时才会显示 |
| label | 自定义搜索框左侧文本 |
| left-icon | 自定义输入框左侧图标，需要在`use-left-icon-slot`为 true 时才会显示  |
| right-icon | 自定义输入框右侧图标，需要在`use-right-icon-slot`为 true 时才会显示  |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
| field-class | 搜索框样式类 |
| input-class | 输入框样式类 |
| cancel-class | 取消按钮样式类 |
