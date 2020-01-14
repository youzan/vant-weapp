# Icon 图标

### 介绍

基于字体的图标集，可以通过 Icon 组件使用，也可以在其他组件中通过`icon`属性引用

### 引入

在`app.json`或`index.json`中引入组件，详细介绍见[快速上手](#/quickstart#yin-ru-zu-jian)

```json
"usingComponents": {
  "van-icon": "path/to/@vant/weapp/dist/icon/index"
}
```

## 代码演示

### 基础用法

`Icon`的`name`属性支持传入图标名称或图片链接

```html
<van-icon name="close" />
<van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
```

### 提示信息

设置`dot`属性后，会在图标右上角展示一个小红点。设置`info`属性后，会在图标右上角展示相应的徽标

```html
<van-icon name="chat" dot />
<van-icon name="chat" info="9" />
<van-icon name="chat" info="99+" />
```

### 图标颜色

设置`color`属性来控制图标颜色

```html
<van-icon name="chat" color="red" />
```

### 图标大小

设置`size`属性来控制图标大小

```html
<van-icon name="chat" size="50px" />
```

## 常见问题

### 开发者工具上提示 Faild to load font 是什么情况？

这个是开发者工具本身的问题，可以忽略，具体可以查看[微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/font/wx.loadFontFace.html)注意第5条

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| name | 图标名称或图片链接 | *string* | - | - |
| dot | 是否显示图标右上角小红点 | *boolean* | `false` | - |
| info | 图标右上角文字提示 | *string \| number* | - | - |
| color | 图标颜色 | *string* | `inherit` | - |
| size | 图标大小，如 `20px`，`2em`，默认单位为`px` | *string \| number* | `inherit` | - |
| custom-style | 自定义样式 | *string* | - | - |
| class-prefix | 类名前缀 | *string* | `van-icon` | - |

### Events

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| bind:click | 点击图标时触发 | - |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
