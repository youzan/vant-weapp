## Loadmore 加载

### 使用指南
在 index.json 中引入组件
```json
  {
    ...
    "usingComponents": {
      "van-loadmore": "../../dist/loadmore/index"
    }
    ...
  }
```

在页面上直接使用 van-loadmore 标签即可
```html
  <van-loadmore type="text"></van-loadmore>
  <van-loadmore type="loading"></van-loadmore>
  <van-loadmore type="text" text="暂无数据"></van-loadmore>
```

### 具体参数
| 名称    | 类型            | 是否必须 | 默认  | 描述              |
| ------- | --------------- | -------- | ----- | ----------------- |
| type  | String | 是       | loading | 可选`loading`, `text` |
| text  | String | 否       | 暂无数据 | 文案 |
