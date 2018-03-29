## Loadmore 加载

### 属性

| 名称    | 类型            | 是否必须 | 默认  | 描述              |
| ------- | --------------- | -------- | ----- | ----------------- |
| loading | Boolean         | 否       | false | 组件 loading 状态 |
| no-more | Boolean         | 否       | false | 数据加载完成状态  |
| no-data | Boolean、String | 否       | false | 数据为空状态      |

### 代码演示

```json
  {
    ...
    "usingComponents": {
      "zan-load-more": "../../dist/loadmore/index"
    }
    ...
  }
```

```html
  <!-- 加载更多 -->
  <zan-load-more loading></zan-load-more>
  <!-- 没有可以显示的数据 -->
  <zan-load-more no-data></zan-load-more>
  <!-- 没有更多的数据了 -->
  <zan-load-more no-more></zan-load-more>
```
