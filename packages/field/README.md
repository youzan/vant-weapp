## Field 输入框

### 使用指南
在 index.json 中引入组件
```json
{
  "usingComponents": {
    "zan-field": "path/to/zanui-weapp/dist/field/index"
  }
}
```

### 代码演示

#### 基础用法
field 支持多种展示方式，在 `data` 中传入对应的设置即可。
```html
<zan-field
  title="{{ field.title }}"
  placeholder="{{ field.placeholder }}"
  focus="{{ field.focus }}"
  value="{{ field.value }}"
  bind:change="handleFieldChange"
>
</zan-field>
```

```js
Page({
  data: {
    field: {
      focus: true,
      title: '收货人',
      placeholder: '名字',
      value: 'test'
    }
  }
});
```

#### Field 列表
```html
<zan-cell-group>
  <zan-field title="姓名"></zan-field>
  <zan-field title="邮件"></zan-field>
</zan-cell-group>
```

#### 监听事件

field会触发一些事件，当你需要监听这些事件时，可以绑定对应的事件。

```html
<zan-field
  title="{{ field.title }}"
  placeholder="{{ field.placeholder }}"
  focus="{{ field.focus }}"
  value="{{ field.value }}"
  bind:change="handleFieldChange"
  bind:focus="handleFieldFocus"
  bind:blur="handleFieldBlur"
>
</zan-field>
```

```js
Page(extend({}, {
  data: {
    field: {
      focus: true,
      title: '收货人',
      placeholder: '名字',
      value: 'test'
    }
  },

  methods: {
    handleFieldChange(event) {
      console.log(event);
    },

    handleFieldFocus(event) {
      console.log(event);
    },

    handleFieldBlur(event) {
      console.log(event);
    }
  }
}));
```

### API

| 参数       | 说明      | 类型       | 默认值       | 必须      |
|-----------|-----------|-----------|-------------|-------------|
| title | 输入框左侧标题，若传入为空，则不显示标题 | String | - | |
| name | 输入框的名字，作为 form 表单提交时数据的 key | String  | componentId 指定的值 | |
| value | 输入框的内容 | String  | - | |
| type | 输入框的类型，可选值为 input, textarea | String  | input | |
| inputType | 输入框为 input 情况下，输入框的类型，例如：number, text, password | String  | text | |
| placeholder | 输入框为空时占位符 | String  | | |
| maxlength | 最大输入长度，设置为 -1 的时候不限制最大长度 | Number  | 140 | |
| focus | 自动聚焦，拉起键盘 | Boolean  | false | |
| disabled | 输入框是否禁用 | Boolean  | false | |
| mode | 输入框展示样式，可选值为 wrapped, normal | String | normal | |
| right | 输入框内容是否居右显示 | Boolean  | false | |
| error | 是否显示为输入框错误情况下的样式 | Boolean  | false | |
| componentId | 用于区分输入框之间的唯一名称 | String  | - | |

### Event

| 事件名称       | 说明      | 回调参数       |
|-----------|-----------|-----------|
| change | 当绑定值变化时触发的事件 | event对象 |
| focus | 输入框focus | event对象 |
| blur | 输入框blur | event对象 |
