## TreeSelect 分类选择

### 使用指南

在 app.json 或 index.json 中引入组件

es6
```json
"usingComponents": {
  "van-tree-select": "path/to/vant-weapp/dist/tree-select/index"
}
```

es5
```json
"usingComponents": {
  "van-tree-select": "path/to/vant-weapp/lib/tree-select/index"
}
```

### 代码演示
可以在任意位置上使用 van-tree-select 标签。传入对应的数据即可。
```html
<van-tree-select
  items="{{ items }}"
  main-active-index="{{ mainActiveIndex }}"
  active-id="{{ activeId }}"
  bind:click-nav="onClickNav"
  bind:click-item="onClickItem"
/>
```

```javascript
Page({
  data: {
    // ...
  },

  onClickNav({ detail = {} }) {
    this.setData({
      mainActiveIndex: detail.index || 0
    });
  },

  onClickItem({ detail = {} }) {
    this.setData({
      activeId: detail.id
    });
  }
});
```

### API

| 参数       | 说明      | 类型       | 默认值       | 必须      |
|-----------|-----------|-----------|-------------|-------------|
| items | 分类显示所需的数据，具体数据结构可看 数据结构	 | Array | [] | |
| main-active-index | 左侧导航高亮的索引	 | Number | 0 | |
| active-id	 | 右侧选择项，高亮的数据id	 | String | Number	 | 0 | |

### Event

| 事件名 | 说明 | 回调参数 |
|-----------|-----------|-----------|
| bind:click-nav | 左侧导航点击时，触发的事件 | event.detail.index：被点击的导航的索引 |
| bind:click-item | 右侧选择项被点击时，会触发的事件 | event.detail: 该点击项的数据 |

### 数据格式
#### items 分类显示所需数据的数据结构
`items` 整体为一个数组，数组内包含一系列描述分类的对象

每个分类里，text 表示当前分类的名称。children 表示分类里的可选项，为数组结构，id 被用来唯一标识每个选项

```javascript
[
  {
    // 导航名称
    text: '所有城市',
    // 禁用选项
    disabled: false,
    // 该导航下所有的可选项
    children: [
      {
        // 名称
        text: '温州',
        // id，作为匹配选中状态的标识
        id: 1,
        // 禁用选项
        disabled: true
      },
      {
        text: '杭州',
        id: 2
      }
    ]
  }
]
```

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| main-item-class | 左侧选项样式类 |
| content-item-class | 右侧选项样式类 |
| main-active-class | 左侧选项选中样式类 |
| content-active-class | 右侧选项选中样式类 |
| main-disabled-class | 左侧选项禁用样式类 |
| content-disabled-class | 右侧选项禁用样式类 |
