## Select 选择

### 使用指南
在 index.json 中引入组件
```json
{
  "usingComponents": {
    "zan-select": "path/to/zanui-weapp/dist/select/index"
  }
}
```

### 代码演示
```html
<zan-select
  items="{{ items }}"
  checkedValue="{{ checkedValue }}"
  activeColor="{{ activeColor }}"
  bind:change="handleSelectChange"
/>
```
```js
Page({
  data: {
    items: [
      {
        value: '1',
        // 选项文案
        name: '选项一',
      },
      {
        value: '2',
        name: '选项二',
      },
    ],
    checkedValue: '1',
    activeColor: '#ff4443'
  },

  methods: {
    handleSelectChange({ detail }) {
      console.log(detail);
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

items 具体格式如下
```js
{
  items: [
    {
      // 选项选中时，代表的选中值。会以此作为唯一值，判断是否选中
      value: '1',
      // 选项的文字描述
      name: '选项一',
    },
    {
      value: '2',
      name: '选项二',
    },
  ]
}
```
