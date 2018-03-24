## Tab 标签

### 使用指南
在 index.json 中引入组件
```json
{
  "usingComponents": {
    "zan-tab": "path/to/zanui-weapp/dist/icon/index"
  }
}
// 在 Page 中声明 Tab 依赖的展示数据
Page({
  data: {
    list: [{
      id: 'xxx',
      title: 'xxx'
    }],
    selectedId: 'xxx',
    ...
  }
})
```

### 代码演示
可以在任意位置上使用 zan-tab 标签。传入对应的数据即可。
```html
<zan-tab
  scroll="{{ scroll }}"
  list="{{ list }}"
  selected-id="{{ selectedId }}"
  height="{{ height }}"
  fixed="{{ fixed }}"
  bindtabchange="handleTabChange"
/>
```

| 参数       | 说明      | 类型       | 默认值       | 必须      |
|-----------|-----------|-----------|-------------|-------------|
| tab.scroll | 是否开启 tab 左右滑动模式 | Boolean | - | |
| tab.list | 可选项列表 | Array | - | |
| tab.selectedId | 选中id | - | - | |
| tab.height | tab高度 | Number | - | |
| tab.fixed | 是否固定位置 | Boolean | - | |
| componentId | 用于区分页面多个 tab 组件 | String | - | |


tab 组件中，tab.list 数据格式如下
```js
[{
  // tab 项 id
  id: 'all',
  // tab 项展示文案
  title: '全部'
}, {
  id: 'topay',
  title: '待付款'
}, {
  id: 'tosend',
  title: '待发货'
}, {
  id: 'send',
  title: '待收货'
}, {
  id: 'sign',
  title: '已完成'
}]
```

可以监听 bindtabchange 事件回调，在页面注册回调函数
```js
Page({
  customCallback(selectedId) {
    // selectId 表示被选中 tab 项的 id
  }
}));
```
