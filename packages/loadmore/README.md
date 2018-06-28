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
  <zan-loadmore nomore="true"></zan-loadmore>
  <zan-loadmore loading="true"></zan-loadmore>
  <zan-loadmore nodata="true" nodata-str="暂无数据"></zan-loadmore>
```

### 具体参数
| 名称    | 类型            | 是否必须 | 默认  | 描述              |
| ------- | --------------- | -------- | ----- | ----------------- |
| nomore  | Boolean | 否       | false | 没有更多数据 |
| loading | Boolean | 否       | true | 加载中 |
| nodata  | Boolean | 否       | false | 暂无数据  |
| nodataStr | String | 否       | '' |  暂无数据的文案  |
