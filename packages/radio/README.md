## Radio 单选框

### 使用指南

在 app.json 或 index.json 中引入组件

es6
```json
"usingComponents": {
  "van-radio": "path/to/vant-weapp/dist/radio/index",
  "van-radio-group": "path/to/vant-weapp/dist/radio-group/index"
}
```

es5
```json
"usingComponents": {
  "van-radio": "path/to/vant-weapp/lib/radio/index",
  "van-radio-group": "path/to/vant-weapp/lib/radio-group/index"
}
```

### 代码演示

#### 基础用法

通过`value`绑定值当前选中项的 name

```html
<van-radio-group value="{{ radio }}" bind:change="onChange">
  <van-radio name="1">单选框 1</van-radio>
  <van-radio name="2">单选框 2</van-radio>
</van-radio-group>
```

#### 禁用状态

通过`disabled`属性禁止选项切换，在`van-radio`上设置`diabled`可以禁用单个选项

```html
<van-radio-group value="{{ radio }}" bind:change="onChange" disabled>
  <van-radio name="1">单选框 1</van-radio>
  <van-radio name="2">单选框 2</van-radio>
</van-radio-group>
```

#### 自定义颜色

 ```html
<van-radio checked-color="#07c160">复选框</van-radio>
```

#### 与 Cell 组件一起使用

此时你需要再引入`Cell`和`CellGroup`组件。

```html
<van-radio-group value="{{ radio }}" bind:change="onChange">
  <van-cell-group>
    <van-cell title="单选框 1" clickable data-name="1" bind:click="onClick">
      <van-radio name="1" />
    </van-cell>
    <van-cell title="单选框 2" clickable data-name="2" bind:click="onClick">
      <van-radio name="2" />
    </van-cell>
  </van-cell-group>
</van-radio-group>
```

### Radio API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| name | 标识 Radio 名称 | `any` | - |
| value | 当前选中项的 name | `any` | - |
| disabled | 是否为禁用状态 | `Boolean` | `false` |
| label-disabled | 是否禁用文本内容点击 | `Boolean` | `false` |
| label-position | 文本位置，可选值为 `left` | `String` | `right` |
| checked-color | 选中状态颜色 | `String` | `#1989fa` |

### Radio Event

| 事件名 | 说明 | 回调参数 |
|-----------|-----------|-----------|
| bind:change | 当绑定值变化时触发的事件 | 当前选中项的 name |

### Radio 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
| icon-class | 图标样式类 |
| label-class | 描述信息样式类 |

### RadioGroup API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| name | 在表单内提交时的标识符 | `String` | - |
| value | 当前选中项的 name | `any` | - |
| disabled | 是否禁用所有单选框 | `Boolean` | `false` |

### RadioGroup Event

| 事件名 | 说明 | 回调参数 |
|-----------|-----------|-----------|
| bind:change | 当绑定值变化时触发的事件 | 当前选中项的 name |

### RadioGroup 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
