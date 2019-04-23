## Button 按钮

### 使用指南
在 json 文件中配置button组件

es6
```json
"usingComponents": {
  "van-button": "path/to/vant-weapp/dist/button/index"
}
```

es5
```json
"usingComponents": {
  "van-button": "path/to/vant-weapp/lib/button/index"
}
```

### 代码演示

#### 按钮类型

支持`default`、`primary`、`info`、`warning`、`danger`五种类型，默认为`default`

```html
<van-button type="default">默认按钮</van-button>
<van-button type="primary">主要按钮</van-button>
<van-button type="info">信息按钮</van-button>
<van-button type="warning">警告按钮</van-button>
<van-button type="danger">危险按钮</van-button>
```

#### 朴素按钮

通过`plain`属性将按钮设置为朴素按钮，朴素按钮的文字为按钮颜色，背景为白色

```html
<van-button plain type="primary">朴素按钮</van-button>
<van-button plain type="danger">朴素按钮</van-button>
```

#### 细边框

设置`hairline`属性可以开启 0.5px 边框，基于伪类实现

```html
<van-button plain hairline type="primary">细边框按钮</van-button>
<van-button plain hairline type="danger">细边框按钮</van-button>
```

#### 禁用状态

通过`disabled`属性来禁用按钮，此时按钮不可点击

```html
<van-button disabled type="primary">禁用状态</van-button>
<van-button disabled type="danger">禁用状态</van-button>
```

#### 加载状态

```html
<van-button loading type="primary" />
<van-button loading type="danger" loading-text="加载中..." />
```

#### 按钮形状

```html
<van-button square type="primary">方形按钮</van-button>
<van-button round type="danger">圆形按钮</van-button>
```

#### 按钮尺寸
支持`large`、`normal`、`small`、`mini`四种尺寸，默认为`normal`

```html
<van-button size="large">大号按钮</van-button>
<van-button size="normal">普通按钮</van-button>
<van-button size="small">小型按钮</van-button>
<van-button size="mini">迷你按钮</van-button>
```

### API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| id | 标识符 | `String` | - |
| type | 按钮类型，可选值为 `primary` `info` `warning` `danger` | `String` | `default` |
| size | 按钮尺寸，可选值为 `normal` `large` `small` `mini` | `String` | `normal` |
| plain | 是否为朴素按钮 | `Boolean` | `false` |
| block | 是否为块级元素 | `Boolean` | `false` |
| round | 是否为圆形按钮 | `Boolean` | `false` |
| square | 是否为方形按钮 | `Boolean` | `false` |
| disabled | 是否禁用按钮 | `Boolean` | `false` |
| hairline | 是否使用 0.5px 边框 | `Boolean` | `false` |
| loading | 是否显示为加载状态 | `Boolean` | `false` |
| loading-text | 加载状态提示文字 | `String` | - |
| loading-size | 加载图标大小 | `String` | `20px` |
| open-type | 微信开放能力，具体支持可参考 [微信官方文档](https://mp.weixin.qq.com/debug/wxadoc/dev/component/button.html) | `String` | - |
| app-parameter | 打开 APP 时，向 APP 传递的参数 | `String` | - |
| lang | 指定返回用户信息的语言，zh_CN 简体中文，<br>zh_TW 繁体中文，en 英文 | `String` | `en` |
| session-from | 会话来源 | `String` | - |
| business-id | 客服消息子商户 id | `Number` | - |
| send-message-title | 会话内消息卡片标题 | `String` | 当前标题 |
| send-message-path | 会话内消息卡片点击跳转小程序路径 | `String` | 当前分享路径 |
| send-message-img | sendMessageImg | `String` | 截图 |
| show-message-card | 显示会话内消息卡片 | `String` | `false` |

### Event

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| bind:click | 点击按钮且按钮状态不为加载或禁用时触发 | - |
| bind:getuserinfo | 用户点击该按钮时，会返回获取到的用户信息，<br>从返回参数的 detail 中获取到的值同 wx.getUserInfo | - |
| bind:contact | 客服消息回调 | - |
| bind:getphonenumber | 获取用户手机号回调 | - |
| bind:error | 当使用开放能力时，发生错误的回调 | - |
| bind:opensetting | 在打开授权设置页后回调 | - |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
| loading-class | 加载图标样式类 |

### 更新日志

| 版本 | 类型 | 内容 |
|-----------|-----------|-----------|
| 0.0.1 | feature | 新增组件 |
| 0.1.1 | feature | 新增 square 属性 |
| 0.3.0 | bugfix | 修复在加载状态下仍然显示文字的问题 |
| 0.3.4 | feature | 新增 id 属性 |
| 0.3.7 | feature | 新增 round 属性 |
