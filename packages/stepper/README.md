## Stepper 步进器

### 使用指南

在 app.json 或 index.json 中引入组件

es6
```json
"usingComponents": {
  "van-stepper": "path/to/vant-weapp/dist/stepper/index"
}
```

es5
```json
"usingComponents": {
  "van-stepper": "path/to/vant-weapp/lib/stepper/index"
}
```

### 代码演示

#### 基础用法

```html
<van-stepper value="{{ 1 }}" bind:change="onChange" />
```

#### 禁用状态

通过设置`disabled`属性来禁用 stepper

```html
<van-stepper value="{{ 1 }}" disabled bind:change="onChange" />
```

#### 高级用法

默认是每次加减为1，可以对组件设置`step`、`min`、`max`属性

```html
<van-stepper
  value="{{ value }}"
  integer
  min="5"
  max="40"
  step="2"
  bind:change="onChange"
/>
```

### API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| name | 在表单内提交时的标识符 | `String` | - |
| value | 输入值 | `String | Number` | 最小值 |
| min | 最小值 | `String | Number` | `1` |
| max | 最大值 | `String | Number` | - |
| step | 步数 | `String | Number` | `1` |
| integer | 是否只允许输入整数 | `Boolean` | `false` |
| disabled | 是否禁用 | `Boolean` | `false` |
| disable-input | 是否禁用输入框 | `Boolean` | `false` |
| async-change | 异步变更，为 `true` 时input值不变化，仅触发事件 | `Boolean` | `false` |
| input-width | 输入框宽度，须指定单位 | `String` | `30px` |

### Event

| 事件名 | 说明 | 回调参数 |
|-----------|-----------|-----------|
| bind:change | 当绑定值变化时触发的事件 | event.detail: 当前输入的值 |
| bind:overlimit | 点击不可用的按钮时触发 | - |
| bind:plus | 点击增加按钮时触发 | - |
| bind:minus | 点击减少按钮时触发 | - |
| bind:focus | 输入框聚焦时触发 | - |
| bind:blur | 输入框失焦时触发 | - |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
| input-class | 输入框样式类 |
| plus-class | 加号按钮样式类 |
| minus-class | 减号按钮样式类 |

### 更新日志

| 版本 | 类型 | 内容 |
|-----------|-----------|-----------|
| 0.0.1 | feature | 新增组件 |
| 0.2.1 | feature | 支持在原生 form 组件内使用 |
| 0.3.8 | bugfix | 修复 disabled 状态下仍然可以点击的问题 |
