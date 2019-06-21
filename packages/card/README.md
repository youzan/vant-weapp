# Card 商品卡片

### 引入

在`app.json`或`index.json`中引入组件，默认为`ES6`版本，`ES5`引入方式参见[快速上手](#/quickstart)

```json
"usingComponents": {
  "van-card": "path/to/vant-weapp/dist/card/index"
}
```


## 代码演示

### 基础用法

```html
<van-card
  num="2"
  price="2.00"
  desc="描述信息"
  title="商品标题"
  thumb="{{ imageURL }}"
/>
```

### 高级用法

可以通过插槽添加定制内容

```html
<van-card
  num="2"
  tag="标签"
  price="10.00"
  desc="描述信息"
  title="商品标题"
  thumb="{{ imageURL }}"
>
  <view slot="footer">
    <van-button size="mini">按钮</van-button>
    <van-button size="mini">按钮</van-button>
  </view>
</van-card>
```

### Props

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| thumb | 左侧图片 | `String` | - |
| thumb-mode | 左侧图片裁剪、缩放的模式，可选值参考小程序 image 组件 mode 属性值 | `String` | `aspectFit` |
| title | 标题 | `String` | - |
| desc | 描述 | `String` | - |
| tag | 标签 | `String` | - |
| num | 商品数量 | `String | Number` | - |
| price | 商品价格 | `String | Number` | - |
| origin-price | 商品划线原价 | `String | Number` | - |
| centered | 内容是否垂直居中 | `String` | `false` |
| currency | 货币符号 |  `String` | `¥` |
| thumb-link | 点击左侧图片后的跳转链接 | `String` | - |
| link-type | 链接跳转类型，可选值为 `redirectTo` `switchTab` `reLaunch` | `String` | `navigateTo` |
| lazy-load | 是否开启图片懒加载 | `Boolean` | `false` |

### Slot

| 名称 | 说明 |
|-----------|-----------|
| title | 自定义标题栏，如果设置了`title`属性则不生效 |
| desc | 自定义描述栏，如果设置了`desc`属性则不生效 |
| thumb | 自定义 thumb，如果设置了`thumb`属性则不生效 |
| bottom | 自定义价格下方区域 |
| footer | 自定义 footer |
| tags | 自定义 tags |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
| thumb-class | 左侧图片样式类 |
| title-class | 标题样式类 |
| price-class | 价格样式类 |
| origin-price-class | 划线原价样式类 |
| desc-class | 描述样式类 |
| num-class | 数量样式类 |
