## Checkbox 复选框

### 使用指南
在 app.json 或 index.json 中引入组件

es6
```json
"usingComponents": {
  "van-checkbox": "path/to/vant-weapp/dist/checkbox/index",
  "van-checkbox-group": "path/to/vant-weapp/dist/checkbox-group/index"
}
```

es5
```json
"usingComponents": {
  "van-checkbox": "path/to/vant-weapp/lib/checkbox/index",
  "van-checkbox-group": "path/to/vant-weapp/lib/checkbox-group/index"
}
```

### 代码演示

#### 基础用法

通过`value`绑定 checkbox 的勾选状态

```html
<van-checkbox value="{{ checked }}" bind:change="onChange">复选框</van-checkbox>
```

#### 禁用状态

```html
<van-checkbox
  disabled
  value="{{ checked }}"
  bind:change="onChange"
>
  复选框
</van-checkbox>
```

#### 自定义颜色

 ```html
<van-checkbox
  value="{{ checked }}"
  checked-color="#07c160"
  bind:change="onChange"
>
  复选框
</van-checkbox>
```

#### 自定义图标

通过 icon 插槽自定义图标

```html
<van-checkbox use-icon-slot value="{{ checked }}" bind:change="onChange">
  自定义图标
  <image
    slot="icon"
    src="{{ checked ? icon.active : icon.normal }}"
  />
</van-checkbox>
```

```js
Page({
  data: {
    checked: true,
    icon: {
      normal: '//img.yzcdn.cn/icon-normal.png',
      active: '//img.yzcdn.cn/icon-active.png'
    }
  },

  onChange(event) {
    this.setData({
      checked: event.detail
    });
  }
});
```

#### 复选框组

需要与`van-checkbox-group`一起使用，选中值是一个数组，通过`value`绑定在`van-checkbox-group`上，数组中的项即为选中的`Checkbox`的`name`属性设置的值

```html
<van-checkbox-group value="{{ result }}" bind:change="onChange">
  <van-checkbox
    wx:for="{{ list }}"
    wx:key="index"
    name="{{ item }}"
  >
    复选框 {{ item }}
  </van-checkbox>
</van-checkbox-group>
```

```javascript
Page({
  data: {
    list: ['a', 'b', 'c'],
    result: ['a', 'b']
  },

  onChange(event) {
    this.setData({
      result: event.detail
    });
  }
});
```

#### 设置最大可选数

```html
<van-checkbox-group value="{{ result }}" bind:change="onChange" max="2">
  <van-checkbox
    wx:for="{{ list }}"
    wx:key="index"
    name="{{ item }}"
  >
    复选框 {{ item }}
  </van-checkbox>
</van-checkbox-group>
```

#### 搭配单元格组件使用

此时你需要再引入`Cell`和`CellGroup`组件，并通过 checkbox 的 toggle 方法手动触发切换

```html
<van-checkbox-group value="{{ result }}" bind:change="onChange">
  <van-cell-group >
    <van-cell
      wx:for="{{ list }}"
      wx:key="index"
      title="复选框 {{ item }}"
      clickable
      data-name="{{ item }}"
      bind:click="toggle"
    >
      <van-checkbox catch:tap="noop" class="checkboxes-{{ item }}" name="{{ item }}" />
    </van-cell>
  </van-cell-group>
</van-checkbox-group>
```

```js
Page({
  data: {
    list: ['a', 'b', 'c'],
    result: ['a', 'b']
  },

  onChange(event) {
    this.setData({
      result: event.detail
    });
  }

  toggle(event) {
    const { name } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${name}`);
    checkbox.toggle();
  },

  noop() {}
});
```

### Checkbox API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| name | 标识 Checkbox 名称 | `any` | - |
| value | 是否为选中状态 | `Boolean` | `false` |
| disabled | 是否禁用单选框 | `Boolean` | `false` |
| label-disabled | 是否禁用单选框内容点击 | `Boolean` | `false` |
| label-position | 文本位置，可选值为 `left` | `String` | `right` |
| shape | 形状，可选值为 `round` `square` | `String` | `round` |
| use-icon-slot | 是否使用 icon slot | `Boolean` | `false` |
| checked-color | 选中状态颜色 | `String` | `#1989fa` |

### CheckboxGroup API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| name | 在表单内提交时的标识符 | `String` | - |
| value | 所有选中项的 name | `Array` | - |
| disabled | 是否禁用所有单选框 | `Boolean` | `false` |
| max | 设置最大可选数 | `Number` | `0`（无限制） |

### Checkbox Event

| 事件名 | 说明 | 回调参数 |
|-----------|-----------|-----------|
| bind:change | 当绑定值变化时触发的事件 | 当前组件的值 |

### CheckboxGroup Event

| 事件名 | 说明 | 回调参数 |
|-----------|-----------|-----------|
| bind:change | 当绑定值变化时触发的事件 | 当前组件的值 |

### Checkbox Slot

| 名称 | 说明 | slot-scope |
|-----------|-----------|-----------|
| - | 自定义文本 | - |
| icon | 自定义图标 | checked: 是否为选中状态 |

### Checkbox 方法

通过 selectComponent 可以获取到 checkbox 实例并调用实例方法

| 方法名 | 参数 | 返回值 | 介绍 |
|-----------|-----------|-----------|-------------|
| toggle | - | - | 切换选中状态 |
