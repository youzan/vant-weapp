## Card 卡片

### 使用指南
在 index.json 中引入组件
```json
{
  "usingComponents": {
    "zan-card": "path/to/zanui-weapp/dist/card/index"
  }
}
```
### 代码演示

#### 基础用法
卡片可以用于左侧图片，右侧描述信息的展示。默认是商品相关内容的展示，需要展示其他内容可以使用自定义slot。

```html
<zan-card
  card-class="test-card"
  thumb="https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg"
  price="999.99"
  title="红烧牛肉【虚拟商品】【有库存】【有sku】"
  num="2"
  desc="3000克 50%"
  status="已发货"
>
</zan-card>
```

#### 使用slot
`zan-card` 由 `zan-card__thumb` 和 `zan-card__detail` 组成。分别负责左侧图片展示和右侧内容区域展示。两部分内容可以使用slot进行替换。

```html
<zan-card
  card-class="test-card"
  useDetailSlot="{{ true }}"
>
  <!-- 右侧详情 -->
  <view slot="detail-slot" class="zan-card__detail">
    我是标题
  </view>
</zan-card>
```

### API
| 参数 | 说明 | 类型 | 默认值 |
|-----|-----|-----|-----|
| card-class | 自定义最外层class | String | -
| thumb | 左侧缩略图 | String | -
| price | 商品价格 | String | -
| title | 商品标题 | String | -
| desc | 商品描述 | String | -
| num | 商品数量 | Number | -
| status | 商品状态 | String | -
| useDetailSlot | 是否使用detail-slot（true时需要添加对应slot） | Boolean | `false`

### 外部样式类
| 类名       | 说明      |
|-----------|-----------|
| card-class | 根节点自定义样式类，通过这个可以改变根节点上的样式 |
| thumb-class | 左侧图片自定义样式类，可以通过这个修改图片的展示大小形式 |
