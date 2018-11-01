## Search 搜索

### 使用指南
在 app.json 或 index.json 中引入组件
```json
"usingComponents": {
  "van-search": "/packages/search/index"
}
```

#### 基础用法
value 用于控制搜索框中的文字

```html
<van-search value="{{ value }}" placeholder="请输入搜索关键词" />
```

#### 监听对应事件
Search 提供了 search 和 cancel 事件。search 事件在用户点击键盘上的搜索按钮触发。cancel 事件在用户点击搜索框右侧取消按钮时触发

```html
<van-search
  value="{{ value }}"
  placeholder="请输入搜索关键词"
  show-action
  bind:search="onSearch"
  bind:cancel="onCancel"
/>
```

#### 自定义行动按钮

Search 支持自定义右侧取消按钮，使用名字为 action 的 slot 即可。

```html
<van-search
  value="{{ value }}"
  placeholder="请输入搜索关键词"
  use-action-slot
  bind:search="onSearch"
>
  <view slot="action" bind:tap="onSearch">搜索</view>
</van-search>
```

### API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| name | 在表单内提交时的标识符 | `String` | - |
| value | 当前输入的值 | `String | Number` | - |
| background | 搜索框背景色 | `String` | `#f2f2f2` |
| show-action | 是否在搜索框右侧显示取消按钮 | `Boolean` | `false` |
| focus | 获取焦点 | `Boolean` | `false` |
| error | 是否将输入内容标红 | `Boolean` | `false` |
| disabled | 是否禁用输入框 | `Boolean` | `false` |
| readonly | 是否只读 | `Boolean` | `false` |
| maxlength | 最大输入长度，设置为 -1 的时候不限制最大长度 | `Number` | `-1` |
| use-action-slot | 是否使用 action slot | `Boolean` | `false` |
| placeholder | 输入框为空时占位符 | `String` | - |
| placeholder-style | 指定 placeholder 的样式 | `String` | - |
| input-align | 输入框内容对齐方式，可选值为 `center` `right` | `String` | `left` |

### Event

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| bind:search | 确定搜索时触发 | event.detail: 当前输入值 |
| bind:change | 输入内容变化时触发 | event.detail: 当前输入值 |
| bind:cancel | 取消搜索搜索时触发 | - |
| bind:focus | 输入框聚焦时触发 | - |
| bind:blur | 输入框失焦时触发 | - |

### Slot

| 名称 | 说明 |
|-----------|-----------|
| action | 自定义搜索框右侧按钮，需要在`showAction`为 true 时才会显示 |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
| cancel-class | 取消按钮样式类 |

### 更新日志

| 版本 | 类型 | 内容 |
|-----------|-----------|-----------|
| 0.0.1 | feature | 新增组件 |
| 0.2.1 | feature | 支持在原生 form 组件内使用 |
| 0.2.1 | bugfix | 修复 focus 属性不生效的问题 |
| 0.3.4 | bugfix | 修复无法获取到输入值的问题 |
