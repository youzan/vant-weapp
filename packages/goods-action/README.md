## GoodsAction 商品导航

### 使用指南
在 app.json 或 index.json 中引入组件

es6
```json
"usingComponents": {
  "van-goods-action": "path/to/vant-weapp/dist/goods-action/index",
  "van-goods-action-icon": "path/to/vant-weapp/dist/goods-action-icon/index",
  "van-goods-action-button": "path/to/vant-weapp/dist/goods-action-button/index"
}
```

es5
```json
"usingComponents": {
  "van-goods-action": "path/to/vant-weapp/lib/goods-action/index",
  "van-goods-action-icon": "path/to/vant-weapp/lib/goods-action-icon/index",
  "van-goods-action-button": "path/to/vant-weapp/lib/goods-action-button/index"
}
```

### 代码演示

#### 基础用法

```html
<van-goods-action>
  <van-goods-action-icon
    icon="chat-o"
    text="客服"
    bind:click="onClickIcon"
  />
  <van-goods-action-icon
    icon="cart-o"
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
  <van-goods-action-icon icon="chat-o" text="客服" />
  <van-goods-action-icon icon="cart-o" text="购物车" info="5" />
  <van-goods-action-icon icon="shop-o" text="店铺" />
  <van-goods-action-button text="加入购物车" type="warning" />
  <van-goods-action-button text="立即购买" />
</van-goods-action>
```

### GoodsAction API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| safe-area-inset-bottom | 是否为iPhoneX留出底部安全距离 | `Boolean` | `true` |

### GoodsActionIcon API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| text | 按钮文字 | `String` | - |
| icon | 图标类型，可选值见`icon`组件 | `String` | - |
| info | 图标右上角提示信息 | `String | Number` | - |
| url | 跳转链接 | `String` | - |
| link-type | 链接跳转类型，可选值为 `redirectTo` `switchTab` `reLaunch` | `String` | `navigateTo` |
| id | 标识符 | `String` | - |
| disabled | 是否禁用按钮 | `Boolean` | `false` |
| loading | 是否显示为加载状态 | `Boolean` | `false` |
| open-type | 微信开放能力，具体支持可参考 [微信官方文档](https://mp.weixin.qq.com/debug/wxadoc/dev/component/button.html) | `String` | - |
| app-parameter | 打开 APP 时，向 APP 传递的参数 | `String` | - |
| lang | 指定返回用户信息的语言，zh_CN 简体中文，<br>zh_TW 繁体中文，en 英文 | `String` | `en` |
| session-from | 会话来源 | `String` | - |
| send-message-title | 会话内消息卡片标题 | `String` | 当前标题 |
| send-message-path | 会话内消息卡片点击跳转小程序路径 | `String` | 当前分享路径 |
| send-message-img | sendMessageImg | `String` | 截图 |
| show-message-card | 显示会话内消息卡片 | `String` | `false` |

### GoodsActionButton API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| text | 按钮文字 | `String` | - |
| url | 跳转链接 | `String` | - |
| link-type | 链接跳转类型，可选值为 `redirectTo` `switchTab` `reLaunch` | `String` | `navigateTo` |
| id | 标识符 | `String` | - |
| type | 按钮类型，可选值为 `primary` `warning` `danger` | `String` | `default` |
| size | 按钮尺寸，可选值为 `normal` `large` `small` `mini` | `String` | `normal` |
| disabled | 是否禁用按钮 | `Boolean` | `false` |
| loading | 是否显示为加载状态 | `Boolean` | `false` |
| open-type | 微信开放能力，具体支持可参考 [微信官方文档](https://mp.weixin.qq.com/debug/wxadoc/dev/component/button.html) | `String` | - |
| app-parameter | 打开 APP 时，向 APP 传递的参数 | `String` | - |
| lang | 指定返回用户信息的语言，zh_CN 简体中文，<br>zh_TW 繁体中文，en 英文 | `String` | `en` |
| session-from | 会话来源 | `String` | - |
| send-message-title | 会话内消息卡片标题 | `String` | 当前标题 |
| send-message-path | 会话内消息卡片点击跳转小程序路径 | `String` | 当前分享路径 |
| send-message-img | sendMessageImg | `String` | 截图 |
| show-message-card | 显示会话内消息卡片 | `String` | `false` |

### Event

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| click | 按钮点击事件回调 | - |

### GoodsActionIcon 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| icon-class | 图标样式类 |
| text-class | 文字样式类 |

### GoodsActionButton 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |

### 更新日志

| 版本 | 类型 | 内容 |
|-----------|-----------|-----------|
| 0.4.0 | feature | 新增组件 |
