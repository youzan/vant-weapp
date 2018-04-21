## Switch 开关

### 使用指南
在 index.json 中引入组件
```json
{
  "usingComponents": {
    "zan-switch": "/packages/switch/index"
  }
}
```

### 代码演示
=======
```html
<zan-switch
  disabled="{{ disabled }}"
  checked="{{ checked }}"
  loading="{{ loading }}"
  bind:change="handleFieldChange"
></zan-switch>
```

```js
Page({
  data: {
    disabled: false,
    checked: false,
    loading: false
  },

  methods: {
    handleFieldChange(event, data) {
      console.log(event, data);
    }
  }
});
```

### API
| 参数       | 说明      | 类型       | 默认值       | 必须      |
|-----------|-----------|-----------|-------------|-------------|
| loading | switch 是否是 loading 状态 | Boolean  | false | |
| disabled | 是否不可用 | Boolean  | false | |
| checked | 是否打开状态 | Boolean  | false  | 必须 |

### Event

| 事件名称       | 说明      | 回调参数       |
|-----------|-----------|-----------|
| change | 当绑定值变化时触发的事件 | event对象和数据对象（包含loading和checked） |



