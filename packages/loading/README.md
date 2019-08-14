# Loading 加载

### 引入

在`app.json`或`index.json`中引入组件，默认为`ES6`版本，`ES5`引入方式参见[快速上手](#/quickstart)

```json
"usingComponents": {
  "van-loading": "path/to/vant-weapp/dist/loading/index"
}
```


## 代码演示

### Circular

```html
<van-loading />
<van-loading color="#fff" />
```

### Spinner

```html
<van-loading type="spinner" />
<van-loading type="spinner" color="#fff" />
```

### Props

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| color | 颜色 | `String` | `#c9c9c9` |
| type | 类型，可选值为 `spinner` | `String` | `circular` |
| size | 大小 | `String` | `30px` |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
