# TreeSelect 分类选择

### 介绍

用于从一组相关联的数据集合中进行选择。

### 引入

在`app.json`或`index.json`中引入组件，详细介绍见[快速上手](#/quickstart#yin-ru-zu-jian)。

```json
"usingComponents": {
  "van-tree-select": "@vant/weapp/tree-select/index"
}
```

## 代码演示

### 单选模式

可以在任意位置上使用 van-tree-select 标签。传入对应的数据即可。此组件支持单选或多选，具体行为完全基于事件 click-item 的实现逻辑如何为属性 active-id 赋值，当 active-id 为数组时即为多选状态。

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
    mainActiveIndex: 0,
    activeId: null,
  },

  onClickNav({ detail = {} }) {
    this.setData({
      mainActiveIndex: detail.index || 0,
    });
  },

  onClickItem({ detail = {} }) {
    const activeId = this.data.activeId === detail.id ? null : detail.id;

    this.setData({ activeId });
  },
});
```

### 多选模式

```html
<van-tree-select
  items="{{ items }}"
  main-active-index="{{ mainActiveIndex }}"
  active-id="{{ activeId }}"
  max="{{ max }}"
  bind:click-nav="onClickNav"
  bind:click-item="onClickItem"
/>
```

```javascript
Page({
  data: {
    mainActiveIndex: 0,
    activeId: [],
    max: 2,
  },

  onClickNav({ detail = {} }) {
    this.setData({
      mainActiveIndex: detail.index || 0,
    });
  },

  onClickItem({ detail = {} }) {
    const { activeId } = this.data;

    const index = activeId.indexOf(detail.id);
    if (index > -1) {
      activeId.splice(index, 1);
    } else {
      activeId.push(detail.id);
    }

    this.setData({ activeId });
  },
});
```

### 自定义内容

```html
<van-tree-select
  items="{{ items }}"
  height="55vw"
  main-active-index="{{ mainActiveIndex }}"
  active-id="{{ activeId }}"
  bind:click-nav="onClickNav"
  bind:click-item="onClickItem"
>
  <image src="https://img.yzcdn.cn/vant/apple-1.jpg" slot="content" />
</van-tree-select>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 分类显示所需的数据 | _Array_ | `[]` |
| height | 高度，默认单位为`px` | _number \| string_ | `300` |
| main-active-index | 左侧选中项的索引 | _number_ | `0` |
| active-id | 右侧选中项的 id，支持传入数组 | _string \| number \| Array_ | `0` |
| max | 右侧项最大选中个数 | _number_ | _Infinity_ |
| selected-icon `v1.5.0` | 自定义右侧栏选中状态的图标 | _string_ | `success` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| bind:click-nav | 左侧导航点击时，触发的事件 | event.detail.index：被点击的导航的索引 |
| bind:click-item | 右侧选择项被点击时，会触发的事件 | event.detail: 该点击项的数据 |

### Slots

| 名称    | 说明                                             |
| ------- | ------------------------------------------------ |
| content | 自定义右侧区域内容，如果存在 items，则插入在顶部 |

### items 数据结构

`items` 整体为一个数组，数组内包含一系列描述分类的对象。每个分类里，text 表示当前分类的名称。children 表示分类里的可选项，为数组结构，id 被用来唯一标识每个选项。

```javascript
[
  {
    // 导航名称
    text: '所有城市',
    // 导航名称右上角徽标，1.5.0 版本开始支持
    badge: 3,
    // 是否在导航名称右上角显示小红点，1.5.0 版本开始支持
    dot: true,
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
        disabled: true,
      },
      {
        text: '杭州',
        id: 2,
      },
    ],
  },
];
```

### 外部样式类

| 类名                   | 说明               |
| ---------------------- | ------------------ |
| main-item-class        | 左侧选项样式类     |
| content-item-class     | 右侧选项样式类     |
| main-active-class      | 左侧选项选中样式类 |
| content-active-class   | 右侧选项选中样式类 |
| main-disabled-class    | 左侧选项禁用样式类 |
| content-disabled-class | 右侧选项禁用样式类 |
