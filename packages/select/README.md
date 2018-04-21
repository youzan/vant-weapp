## Select 选择

### 使用指南
在 index.json 中引入组件
```json
{
  "usingComponents": {
    "zan-select": "/packages/select/index"
  }
}
```

### 代码演示
```html
<zan-select
  items="{{ items }}"
  checkedValue="{{ checkedValue }}"
  activeColor="{{ activeColor }}"
  bind:change="handleFieldChange"
/>
```
```js
Page({
  data: {
    items: [
      {
        // 当前选项离左侧的距离
        padding: 0,
        // 当前选项的值，在被选中时，会在 handleZanSelectChange 中获取到
        value: '1',
        // 选项文案
        name: '选项一',
      },
      {
        padding: 0,
        value: '2',
        name: '选项二',
      },
    ],
    checkedValue: '选项一',
    activeColor: '#ff4443'
  },

  methods: {
    handleFieldChange(event, data) {
      console.log(event, data);
    }
  }
});
```



#### 具体参数
| 参数       | 说明      | 类型       | 默认值       | 必须      |
|-----------|-----------|-----------|-------------|-------------|
| items | select 显示各个项的配置 | Array | - | |
| checkedValue | 高亮的 item 的 value 值 | String | - | |
| activeColor | Select 高亮颜色 | String | #ff4444 | |
