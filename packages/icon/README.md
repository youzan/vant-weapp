# Icon 图标

### 引入

在`app.json`或`index.json`中引入组件，默认为`ES6`版本，`ES5`引入方式参见[快速上手](#/quickstart)

```json
"usingComponents": {
  "van-icon": "path/to/vant-weapp/dist/icon/index"
}
```

## 代码演示

### 基础用法

`Icon`的`name`属性支持传入图标名称或图片链接

```html
<van-icon name="close" />
<van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
```

### 显示徽标

 ```html
<van-icon name="chat" info="9" />
<van-icon name="chat" info="99+" />
```

### Props

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| name | 图标名称或图片链接 | `String` | - |
| info | 图标右上角文字提示 | `String | Number` | - |
| color | 图标颜色 | `String` | `inherit` |
| size | 图标大小，如 `20px`，`2em` | `String` | `inherit` |
| custom-style | 自定义样式 | `String` | - |
| class-prefix | 类名前缀 | `String` | `van-icon` |

### Events

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| bind:click | 点击图标时触发 | - |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
