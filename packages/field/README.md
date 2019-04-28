## Field 输入框

### 使用指南
在 app.json 或 index.json 中引入组件

es6
```json
"usingComponents": {
  "van-field": "path/to/vant-weapp/dist/field/index"
}
```

es5
```json
"usingComponents": {
  "van-field": "path/to/vant-weapp/lib/field/index"
}
```

### 代码演示

#### 基础用法

```html
<van-cell-group>
  <van-field
    value="{{ value }}"
    placeholder="请输入用户名"
    border="{{ false }}"
    bind:change="onChange"
  />
</van-cell-group>
```

```js
Page({
  data: {
    value: ''
  },

  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  }
});
```

#### 自定义类型
根据`type`属性定义不同类型的输入框

```html
<van-cell-group>
  <van-field
    value="{{ username }}"
    required
    clearable
    label="用户名"
    icon="question-o"
    placeholder="请输入用户名"
    bind:click-icon="onClickIcon"
  />

  <van-field
    value="{{ password }}"
    type="password"
    label="密码"
    placeholder="请输入密码"
    required
    border="{{ false }}"
  />
</van-cell-group>
```

#### 禁用输入框

```html
<van-cell-group>
  <van-field
    value="输入框已禁用"
    label="用户名"
    left-icon="contact"
    disabled
    border="{{ false }}"
  />
</van-cell-group>
```

#### 错误提示
通过`error`或者`error-message`属性增加对应的错误提示

```html
<van-cell-group>
  <van-field
    value="{{ username }}"
    label="用户名"
    placeholder="请输入用户名"
    error
  />
  <van-field
    value="{{ phone }}"
    label="手机号"
    placeholder="请输入手机号"
    error-message="手机号格式错误"
    border="{{ false }}"
  />
</van-cell-group>
```

#### 高度自适应
对于 textarea，可以通过`autosize`属性设置高度自适应

```html
<van-cell-group>
  <van-field
    value="{{ message }}"
    label="留言"
    type="textarea"
    placeholder="请输入留言"
    autosize
    border="{{ false }}"
  />
</van-cell-group>
```

#### 插入按钮
通过 button slot 可以在输入框尾部插入按钮

```html
<van-cell-group>
  <van-field
    value="{{ sms }}"
    center
    clearable
    label="短信验证码"
    placeholder="请输入短信验证码"
    border="{{ false }}"
    use-button-slot
  >
    <van-button slot="button" size="small" type="primary">发送验证码</van-button>
  </van-field>
</van-cell-group>
```

### API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| name | 在表单内提交时的标识符 | `String` | - |
| label | 输入框左侧文本 | `String` | - |
| size | 单元格大小，可选值为 `large` | `String` | - |
| value | 当前输入的值 | `String | Number` | - |
| type | 可设置为任意原生类型, 如 `number` `idcard` `textarea` `digit` | `String` | `text` |
| fixed | 如果 type 为 `textarea` 且在一个 `position:fixed` 的区域，需要显示指定属性 fixed 为 true | `Boolean` | `false` |
| focus | 获取焦点 | `Boolean` | `false` |
| border | 是否显示内边框 | `Boolean` | `true` |
| disabled | 是否禁用输入框 | `Boolean` | `false` |
| readonly | 是否只读 | `Boolean` | `false` |
| clearable | 是否启用清除控件 | `Boolean` | `false` |
| required | 是否显示表单必填星号 | `Boolean` | `false` |
| password | 是否是密码类型 | `Boolean` | `false` |
| title-width | 标题宽度 | `String` | `90px` |
| maxlength | 最大输入长度，设置为 -1 的时候不限制最大长度 | `Number` | `-1` |
| placeholder | 输入框为空时占位符 | `String` | - |
| placeholder-style | 指定 placeholder 的样式 | `String` | - |
| is-link | 是否展示右侧箭头并开启点击反馈 | `Boolean` | `false` |
| error | 是否将输入内容标红 | `Boolean` | `false` |
| error-message | 底部错误提示文案，为空时不展示 | `String` | `''` |
| error-message-align | 底部错误提示文案对齐方式，可选值为 `center` `right` | `String` | `''` |
| input-align | 输入框内容对齐方式，可选值为 `center` `right` | `String` | `left` |
| autosize | 自适应内容高度，只对 textarea 有效 | `Boolean` | `false` |
| right-icon | 输入框尾部图标名称或图片链接，可选值见 Icon 组件 | `String` | - |
| left-icon | 输入框左侧图标名称或图片链接，可选值见 Icon 组件 | `String` | - |
| confirm-type | 设置键盘右下角按钮的文字，仅在 type='text' 时生效 | `String` | `done` |
| confirm-hold | 点击键盘右下角按钮时是否保持键盘不收起，在 type='textarea' 时无效 | `Boolean` | `false` |
| cursor-spacing | 输入框聚焦时底部与键盘的距离 | `Number` | `50` |
| adjust-position | 键盘弹起时，是否自动上推页面 | `Boolean` | `true` |
| show-confirm-bar | 是否显示键盘上方带有”完成“按钮那一栏，只对 textarea 有效 | `Boolean` | `true` |

### Event

| 事件 | 说明 | 回调参数 |
|-----------|-----------|-----------|
| bind:input | 输入内容时触发 | value: 当前输入值 |
| bind:change | 输入内容时触发 | value: 当前输入值 |
| bind:confirm | 点击完成按钮时触发 | value: 当前输入值 |
| bind:click-icon | 点击尾部图标时触发 | - |
| bind:focus | 输入框聚焦时触发 | event.detail.value: 当前输入值; <br>event.detail.height: 键盘高度(在基础库 1.9.90 起支持) |
| bind:blur | 输入框失焦时触发 | event.detail.value: 当前输入值; <br>event.detail.cursor: 游标位置(如果 `type` 不为 `textarea`，值为 `0`) |
| bind:clear | 点击清空控件时触发 | - |

### Slot

| 名称 | 说明 |
|-----------|-----------|
| label | 自定义输入框标签，如果设置了`label`属性则不生效 |
| left-icon | 自定义输入框头部图标 |
| right-icon | 自定义输入框尾部图标 |
| button | 自定义输入框尾部按钮 |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| input-class | 输入框样式类 |
| right-icon-class | 右侧图标样式类 |
