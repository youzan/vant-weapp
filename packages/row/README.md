## Layout 布局

### 使用指南
在 index.json 中引入组件
```json
{
  "usingComponents": {
    "van-row": "path/to/vant-weapp/dist/row/index",
    "van-col": "path/to/vant-weapp/dist/col/index"
  }
}
```

### 代码演示
Layout 组件提供了24列栅格，设置 col 属性可以设置元素所占宽度

```html
<van-row>
  <van-col col="8" col-class="custom-van-col">span: 8</van-col>
  <van-col col="8" col-class="custom-van-col">span: 8</van-col>
  <van-col col="8" col-class="custom-van-col">span: 8</van-col>
</van-row>
```

Layout 提供了 offset 功能。设置 offset 属性可以设置列的偏移宽度，计算方式与 span 相同
```html
<van-row row-class="custom-van-row">
  <van-col col="4" col-class="custom-van-col">span: 4</van-col>
  <van-col col="10" offset="4" col-class="custom-van-col">offset: 4, span: 10</van-col>
</van-row>
<van-row>
  <van-col col="12" offset="12" col-class="custom-van-col">offset: 12, span: 12</van-col>
</van-row>
```

### API
#### Row
| 参数 | 说明 | 类型 | 默认值 |
|-----|-----|-----|-----|
| row-class | 自定义row class | String | -

#### Col
| 参数 | 说明 | 类型 | 默认值 |
|-----|-----|-----|-----|
| col-class | 自定义col class | String | -
| col | 元素所占宽度 | Number | `0`
| offset | 元素偏移宽度 | Number | `0`

