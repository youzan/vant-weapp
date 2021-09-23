# Card 商品卡片

### 介绍

商品卡片，用于展示商品的图片、价格等信息。

### 引入

在`app.json`或`index.json`中引入组件，详细介绍见[快速上手](#/quickstart#yin-ru-zu-jian)。

```json
"usingComponents": {
  "van-card": "@vant/weapp/card/index"
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

可以通过插槽添加定制内容。

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

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| thumb | 左侧图片 | _string_ | - |
| thumb-mode | 左侧图片裁剪、缩放的模式，可选值参考小程序 image 组件 mode 属性值 | _string_ | `aspectFit` |
| title | 标题 | _string_ | - |
| desc | 描述 | _string_ | - |
| tag | 标签 | _string_ | - |
| num | 商品数量 | _string \| number_ | - |
| price | 商品价格 | _string \| number_ | - |
| origin-price | 商品划线原价 | _string \| number_ | - |
| centered | 内容是否垂直居中 | _string_ | `false` |
| currency | 货币符号 | _string_ | `¥` |
| thumb-link | 点击左侧图片后跳转的链接地址 | _string_ | - |
| link-type | 链接跳转类型，可选值为 `redirectTo` `switchTab` `reLaunch` | _string_ | `navigateTo` |
| lazy-load | 是否开启图片懒加载 | _boolean_ | `false` |

### Slot

| 名称         | 说明                                                 |
| ------------ | ---------------------------------------------------- |
| title        | 自定义标题栏，如果设置了`title`属性则不生效          |
| desc         | 自定义描述栏，如果设置了`desc`属性则不生效           |
| num          | 自定义数量                                           |
| price        | 自定义价格                                           |
| origin-price | 自定义商品原价，如果设置了`origin-price`属性则不生效 |
| price-top    | 自定义价格上方区域                                   |
| bottom       | 自定义价格下方区域                                   |
| thumb        | 自定义图片，如果设置了`thumb`属性则不生效            |
| tag          | 自定义图片角标，如果设置了`tag`属性则不生效          |
| tags         | 自定义描述下方标签区域                               |
| footer       | 自定义右下角内容                                     |

### 外部样式类

| 类名               | 说明           |
| ------------------ | -------------- |
| custom-class       | 根节点样式类   |
| thumb-class        | 左侧图片样式类 |
| title-class        | 标题样式类     |
| price-class        | 价格样式类     |
| origin-price-class | 划线原价样式类 |
| desc-class         | 描述样式类     |
| num-class          | 数量样式类     |
