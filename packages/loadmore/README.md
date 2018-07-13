## Loadmore 加载

### 使用指南
在 index.json 中引入组件
```json
  {
    ...
    "usingComponents": {
      "zan-loadmore": "../../dist/loadmore/index"
    }
    ...
  }
```

在页面上直接使用 zan-loadmore 标签即可
```html
  <zan-loadmore type="text"></zan-loadmore>
  <zan-loadmore type="loading"></zan-loadmore>
  <zan-loadmore type="text" text="暂无数据"></zan-loadmore>
```

### 具体参数
| 名称    | 类型            | 是否必须 | 默认  | 描述              |
| ------- | --------------- | -------- | ----- | ----------------- |
| type  | String | 是       | loading | 可选`loading`, `text` |
| text  | String | 否       | 暂无数据 | 文案 |
