## Dialog 弹出框

Dialog 组件支持函数调用和组件调用两种形式

### 使用指南

在 app.json 或 index.json 中引入组件

es6
```json
"usingComponents": {
  "van-dialog": "path/to/vant-weapp/dist/dialog/index"
}
```

es5
```json
"usingComponents": {
  "van-dialog": "path/to/vant-weapp/lib/dialog/index"
}
```

### 代码演示

#### 消息提示

用于提示一些消息，只包含一个确认按钮

```html
<van-dialog id="van-dialog" />
```

```javascript
import Dialog from 'path/to/vant-weapp/dist/dialog/dialog';
// es5
// var Dialog = require('path/to/vant-weapp/lib/dialog/dialog');

Dialog.alert({
  title: '标题',
  message: '弹窗内容'
}).then(() => {
  // on close
});

Dialog.alert({
  message: '弹窗内容'
}).then(() => {
  // on close
});
```

#### 消息确认

用于确认消息，包含取消和确认按钮

```javascript
Dialog.confirm({
  title: '标题',
  message: '弹窗内容'
}).then(() => {
  // on confirm
}).catch(() => {
  // on cancel
});
```

#### 组件调用

通过组件调用 Dialog 时，可以实现自定义弹窗内容、异步关闭、监听微信开放能力回调事件，具体可以参考下面的示例

```html
<van-dialog
  use-slot
  async-close
  show="{{ show }}"
  show-cancel-button
  confirm-button-open-type="getUserInfo"
  bind:close="onClose"
  bind:getuserinfo="getUserInfo"
>
<van-field
  value="{{ username }}"
  label="用户名"
  placeholder="请输入用户名"
/>
<van-field
  value="{{ password }}"
  type="password"
  label="密码"
  :border="false"
  placeholder="请输入密码"
/>
</van-dialog>
```

```js
Page({
  data: {
    show: true,
    username: '',
    password: ''
  },

  onClose(event) {
    if (event.detail === 'confirm') {
      // 异步关闭弹窗
      setTimeout(() => {
        this.setData({
          show: false
        });
      }, 1000);
    } else {
      this.setData({
        show: false
      });
    }
  }
});
```


### 方法

| 方法名 | 参数 | 返回值 | 介绍 |
|-----------|-----------|-----------|-------------|
| Dialog | `options` | `Promise` | 展示弹窗 |
| Dialog.alert | `options` | `Promise` | 展示消息提示弹窗 |
| Dialog.confirm | `options` | `Promise` | 展示消息确认弹窗 |
| Dialog.setDefaultOptions | `options` | `void` | 修改默认配置，对所有 Dialog 生效 |
| Dialog.resetDefaultOptions | - | `void` | 重置默认配置，对所有 Dialog 生效 |
| Dialog.close | - | `void` | 关闭弹窗 |
| Dialog.stopLoading | - | `void` | 停止按钮的加载状态 |

### Options

通过函数调用 Dialog 时，支持传入以下选项：

| 参数 | 说明 | 类型 | 默认值 | 生效时机 |
|-----------|-----------|-----------|-------------|-------------|
| title | 标题 | `String` | - |
| message | 内容 | `String` | - |
| messageAlign | 内容对齐方式，可选值为`left` `right` | `String` | `center` |
| zIndex | z-index 层级 | `Number` | `100` |
| selector | 自定义选择器 | `String` | `van-dialog` |
| showConfirmButton | 是否展示确认按钮 | `Boolean` | `true` |
| showCancelButton | 是否展示取消按钮 | `Boolean` | `false` |
| confirmButtonText | 确认按钮的文案 | `String` | `确认` |
| cancelButtonText | 取消按钮的文案 | `String` | `取消` |
| confirmButtonOpenType | 确认按钮的微信开放能力，具体支持可参考 [微信官方文档](https://mp.weixin.qq.com/debug/wxadoc/dev/component/button.html) | `String` | - |
| overlay | 是否展示蒙层 | `Boolean` | `true` |
| closeOnClickOverlay | 点击蒙层时是否关闭弹窗 | `Boolean` | `false` |
| asyncClose | 是否异步关闭弹窗，开启后需要手动控制弹窗的关闭 | `Boolean` | `false` |
| context | 选择器的选择范围，可以传入自定义组件的 this 作为上下文 | `Object` | 当前页面 |
| transition | 动画名称，可选值为`fade` `none` | `String` | `scale` |
| app-parameter | 打开 APP 时，向 APP 传递的参数 | `String` | - | `confirmButtonOpenType="launchApp"` |
| lang | 指定返回用户信息的语言，zh_CN 简体中文，<br>zh_TW 繁体中文，en 英文 | `String` | `en` | `confirmButtonOpenType="getUserInfo"` |
| session-from | 会话来源 | `String` | - | `confirmButtonOpenType="contact"` |
| business-id | 客服消息子商户 id | `Number` | - |
| send-message-title | 会话内消息卡片标题 | `String` | 当前标题 | `confirmButtonOpenType="contact"` |
| send-message-path | 会话内消息卡片点击跳转小程序路径 | `String` | 当前分享路径 | `confirmButtonOpenType="contact"` |
| send-message-img | sendMessageImg | `String` | 截图 | `confirmButtonOpenType="contact"` |
| show-message-card | 显示会话内消息卡片 | `String` | `false` | `confirmButtonOpenType="contact"` |

### API

通过组件调用 Dialog 时，支持以下 API：

| 参数 | 说明 | 类型 | 默认值 | 生效时机 |
|-----------|-----------|-----------|-------------|-------------|
| show | 是否显示弹窗 | `Boolean` | - |
| title | 标题 | `String` | - |
| message | 内容 | `String` | - |
| message-align | 内容对齐方式，可选值为`left` `right` | `String` | `center` |
| z-index | z-index 层级 | `Number` | `100` |
| show-confirm-button | 是否展示确认按钮 | `Boolean` |  `true` |
| show-cancel-button | 是否展示取消按钮 | `Boolean` |  `false` |
| confirm-button-text | 确认按钮的文案 | `String` |  `确认` |
| cancel-button-text | 取消按钮的文案 | `String` | `取消` |
| confirm-button-open-type | 确认按钮的微信开放能力，具体支持可参考 [微信官方文档](https://mp.weixin.qq.com/debug/wxadoc/dev/component/button.html) | `String` | - |
| overlay | 是否展示蒙层 | `Boolean` | `true` |
| close-on-click-overlay | 点击蒙层时是否关闭弹窗 | `Boolean` | `false` |
| use-slot | 是否使用自定义内容的插槽 | `Boolean` | `false` |
| async-close | 是否异步关闭弹窗，开启后需要手动控制弹窗的关闭 | `Boolean` | `false` |
| transition | 动画名称，可选值为`fade` | `String` | `scale` |
| app-parameter | 打开 APP 时，向 APP 传递的参数 | `String` | - | `confirm-button-open-type="launchApp"` |
| lang | 指定返回用户信息的语言，zh_CN 简体中文，<br>zh_TW 繁体中文，en 英文 | `String` | `en` | `confirm-button-open-type="getUserInfo"` |
| session-from | 会话来源 | `String` | - | `confirm-button-open-type="contact"` |
| business-id | 客服消息子商户 id | `Number` | - |
| send-message-title | 会话内消息卡片标题 | `String` | 当前标题 | `confirm-button-open-type="contact"` |
| send-message-path | 会话内消息卡片点击跳转小程序路径 | `String` | 当前分享路径 | `confirm-button-open-type="contact"` |
| send-message-img | sendMessageImg | `String` | 截图 | `confirm-button-open-type="contact"` |
| show-message-card | 显示会话内消息卡片 | `String` | `false` | `confirm-button-open-type="contact"` |

### Event

| 事件 | 说明 | 回调参数 |
|-----------|-----------|-----------|
| bind:close | 弹窗关闭时触发 | event.detail: 触发关闭事件的来源，<br>枚举为`confirm`,`cancel`,`overlay` |
| bind:confirm | 点击确认按钮时触发 | - |
| bind:cancel | 点击取消按钮时触发 | - |
| bind:getuserinfo | 点击确认按钮时，会返回获取到的用户信息，<br>从返回参数的 detail 中获取到的值同 wx.getUserInfo | - |
| bind:contact | 客服消息回调 | - |
| bind:getphonenumber | 获取用户手机号回调 | - |
| bind:error | 当使用开放能力时，发生错误的回调 | - |
| bind:opensetting | 在打开授权设置页后回调 | - |
