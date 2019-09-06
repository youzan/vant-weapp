# Sticky 粘性布局

### 引入
在`app.json`或`index.json`中引入组件，默认为`ES6`版本，`ES5`引入方式参见[快速上手](#/quickstart)

```json
"usingComponents": {
  "van-sticky": "path/to/vant-weapp/dist/sticky/index"
}
```


## 代码演示

### 基础用法

将内容包裹在`Sticky`组件内即可

```html
<van-sticky>
  <van-button type="primary">基础用法</van-button>
</van-sticky>
```

### 吸顶距离

通过`offset-top`属性可以设置组件在吸顶时与顶部的距离

```html
<van-sticky offset-top="{{ 30 }}">
  <van-button type="info">吸顶距离</van-button>
</van-sticky>
```

### Props

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| offset-top | 吸顶时与顶部的距离，单位`px` | *number* | `0` |
| z-index | 吸顶时的 z-index | *number* | `99` |

### Events

| 事件名 | 说明 | 回调参数 |
|-----------|-----------|-----------|
| scroll | 滚动时触发 | { scrollTop: 距离顶部位置, isFixed: 是否吸顶 } |
