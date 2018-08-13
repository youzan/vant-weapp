## Card 卡片

### 使用指南

在 index.json 中引入组件
```json
"usingComponents": {
  "van-card": "path/to/vant-weapp/dist/card/index"
}
```

### 代码演示

#### 基础用法

```html
<van-card
  title="标题"
  desc="描述"
  num="2"
  price="2.00"
  thumb="{{ imageURL }}"
/>
```

#### 高级用法
可以通过具名`slot`添加定制内容

```html
<van-card
  title="标题"
  desc="描述"  
  num="2"
  price="2.00"
  thumb="{{ imageURL }}"
>
  <view slot="footer">
    <van-button size="mini">按钮</van-button>
    <van-button size="mini">按钮</van-button>
  </view>
</van-card>
```

### API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| thumb | 左侧图片 | `String` | - |
| title | 标题 | `String` | - |
| desc | 描述 | `String` | - |
| num | 商品数量 | `String | Number` | - |
| price | 商品价格 | `String | Number` | - |
| centered | 内容是否垂直居中 | `String` | `false` |
| currency | 货币符号 |  `String` | `¥` |

### Slot

| 名称 | 说明 |
|-----------|-----------|
| title | 自定义标题栏，如果设置了`title`或`price`属性则不生效 |
| desc | 自定义描述栏，如果设置了`desc`或`num`属性则不生效 |
| thumb | 自定义 thumb，如果设置了`thumb`属性则不生效 |
| footer | 自定义 footer |
| tags | 自定义 tags |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
| thumb-class | 左侧图片样式类 |
| title-class | 标题样式类 |
| price-class | 价格样式类 |
| desc-class | 描述样式类 |
| num-class | 数量样式类 |
