## Loading 加载

### 使用指南
在 index.json 中引入组件
```json
  {
    "usingComponents": {
      "zan-loading": "path/to/zanui-weapp/dist/loading/index"
    }
  }
```

在页面上直接使用 zan-loading 标签即可
```html
  <zan-loading type="circle"></zan-loading>
  <zan-loading type="spinner" color="black"></zan-loading>
  <zan-loading type="dot"></zan-loading>
```

### 具体参数
| 名称    | 类型            | 是否必须 | 默认  | 描述              |
| ------- | --------------- | -------- | ----- | ----------------- |
| type | String         | 否       | circle | loading 类型，可支持 circle，spinner，dot |
| color | String         | 否       | 无 | 可选值 black  |
| use | String，Number | 否       | 1 | 选择每种 Loading 类型的样式      |
