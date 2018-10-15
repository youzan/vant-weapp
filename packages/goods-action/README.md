## goodsAction 商品页行动点

### 使用指南
在 index.json 中引入组件
```json
"usingComponents": {
  "van-goods-action": "path/to/vant-weapp/dist/goods-action/index",
  "van-goods-action-icon": "path/to/vant-weapp/dist/goods-action-icon/index",
  "van-goods-action-button": "path/to/vant-weapp/dist/goods-action-button/index"
}
```

### 代码演示

#### 基础用法

```html
<van-goods-action>
  <van-goods-action-icon
    icon="chat"
    text="客服"
    bind:click="onClickIcon"
  />
  <van-goods-action-icon
    icon="cart"
    text="购物车"
    bind:click="onClickIcon"
  />
  <van-goods-action-button
    text="加入购物车"
    type="warning"
    bind:click="onClickButton"
  />
  <van-goods-action-button
    text="立即购买"
    bind:click="onClickButton"
  />
</van-goods-action>
```

```javascript
Page({
  onClickIcon() {
    Toast('点击图标');
  },

  onClickButton() {
    Toast('点击按钮');
  }
});
```

#### 图标提示

通过`info`属性在图标右上角增加相应的提示

```html
<van-goods-action>
  <van-goods-action-icon icon="chat" text="客服" />
  <van-goods-action-icon icon="cart" text="购物车" info="5" />
  <van-goods-action-icon icon="shop" text="店铺" />
  <van-goods-action-button text="加入购物车" type="warning" />
  <van-goods-action-button text="立即购买" />
</van-goods-action>
```

### GoodsActionIcon API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| text | 按钮文字 | `String` | - |
| icon | 图标类型，可选值见`icon`组件 | `String` | - |
| info | 图标右上角提示信息 | `String | Number` | - |
| url | 跳转链接 | `String` | - |
| link-type | 链接跳转类型，可选值为 `redirectTo` `switchTab` `reLaunch` | `String` | `navigateTo` |

### GoodsActionButton API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| text | 按钮文字 | `String` | - |
| type | 按钮类型 | `String` | `danger` |
| url | 跳转链接 | `String` | - |
| link-type | 链接跳转类型，可选值为 `redirectTo` `switchTab` `reLaunch` | `String` | `navigateTo` |

### Event

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| click | 按钮点击事件回调 | - |

### 更新日志

| 版本 | 类型 | 内容 |
|-----------|-----------|-----------|
| 0.4.0 | feature | 新增组件 |
