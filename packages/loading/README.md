## Loading 加载

### 属性

| 名称    | 类型            | 是否必须 | 默认  | 描述              |
| ------- | --------------- | -------- | ----- | ----------------- |
| type | String         | 否       | circle | loading 类型，可支持 circle，spinner，dot |
| color | String         | 否       | 无 | 可选值 black  |
| use | String，Number | 否       | 1 | 选择每种 Loading 类型的样式      |

### 代码演示

```json
  {
    ...
    "usingComponents": {
      "zan-loading": "../../dist/loading/index"
    }
    ...
  }
```

```html
  <zan-loading type="circle"></zan-loading>
  <zan-loading type="spinner" color="black"></zan-loading>
  <zan-loading type="dot"></zan-loading>
```
