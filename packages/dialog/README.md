# Dialog 弹出框

### 介绍

弹出模态框，常用于消息提示、消息确认、在当前页面内完成特定的交互操作

弹出框组件支持函数调用和组件调用两种方式

### 引入

在`app.json`或`index.json`中引入组件，详细介绍见[快速上手](#/quickstart#yin-ru-zu-jian)

```json
"usingComponents": {
  "van-dialog": "@vant/weapp/dialog/index"
}
```

## 代码演示

### 消息提示

用于提示一些消息，只包含一个确认按钮

```html
<van-dialog id="van-dialog" />
```

```javascript
import Dialog from 'path/to/@vant/weapp/dist/dialog/dialog';

Dialog.alert({
  title: '标题',
  message: '弹窗内容',
}).then(() => {
  // on close
});

Dialog.alert({
  message: '弹窗内容',
}).then(() => {
  // on close
});
```

### 圆角样式

样式为圆角风格。

```html
<van-dialog id="van-dialog" />
```

```javascript
import Dialog from 'path/to/@vant/weapp/dist/dialog/dialog';

Dialog.alert({
  title: '标题',
  message: '弹窗内容',
  theme: 'round-button',
}).then(() => {
  // on close
});

Dialog.alert({
  message: '弹窗内容',
  theme: 'round-button',
}).then(() => {
  // on close
});
```

### 消息确认

用于确认消息，包含取消和确认按钮

```javascript
Dialog.confirm({
  title: '标题',
  message: '弹窗内容',
})
  .then(() => {
    // on confirm
  })
  .catch(() => {
    // on cancel
  });
```

### 异步关闭

设置`asyncClose`属性开启异步关闭，开启后可以手动调用`Dialog.close`方法关闭弹窗

```javascript
Dialog.confirm({
  title: '标题',
  message: '弹窗内容'
  asyncClose: true
})
  .then(() => {
    setTimeout(() => {
      Dialog.close();
    }, 1000);
  })
  .catch(() => {
    Dialog.close();
  });
```

### 组件调用

通过组件调用 Dialog 时，可以实现自定义弹窗内容、监听微信开放能力回调事件等功能，具体参考下例

```html
<van-dialog
  use-slot
  title="标题"
  show="{{ show }}"
  show-cancel-button
  confirm-button-open-type="getUserInfo"
  bind:close="onClose"
  bind:getuserinfo="getUserInfo"
>
  <image src="https://img.yzcdn.cn/1.jpg" />
</van-dialog>
```

```js
Page({
  data: {
    show: true,
  },

  getUserInfo(event) {
    console.log(event.detail);
  },

  onClose() {
    this.setData({ close: false });
  },
});
```

## API

### 方法

| 方法名 | 参数 | 返回值 | 介绍 |
| --- | --- | --- | --- |
| Dialog | `options` | `Promise` | 展示弹窗 |
| Dialog.alert | `options` | `Promise` | 展示消息提示弹窗 |
| Dialog.confirm | `options` | `Promise` | 展示消息确认弹窗 |
| Dialog.setDefaultOptions | `options` | `void` | 修改默认配置，对所有 Dialog 生效 |
| Dialog.resetDefaultOptions | - | `void` | 重置默认配置，对所有 Dialog 生效 |
| Dialog.close | - | `void` | 关闭弹窗 |
| Dialog.stopLoading | - | `void` | 停止按钮的加载状态 |

### Options

通过函数调用 Dialog 时，支持传入以下选项：

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| title | 标题 | _string_ | - | - |
| width | 弹窗宽度，默认单位为`px` | _string \| number_ | `320px` | 1.0.0 |
| message | 文本内容，支持通过`\n`换行 | _string_ | - | 1.0.0 |
| theme | 样式风格，可选值为`round-button` | _string_ | `default` |
| messageAlign | 内容对齐方式，可选值为`left` `right` | _string_ | `center` | - |
| zIndex | z-index 层级 | _number_ | `100` | - |
| className | 自定义类名，dialog 在自定义组件内时无效 | _string_ | '' | - |
| customStyle | 自定义样式 | _string_ | '' | - |
| selector | 自定义选择器 | _string_ | `van-dialog` | - |
| showConfirmButton | 是否展示确认按钮 | _boolean_ | `true` | - |
| showCancelButton | 是否展示取消按钮 | _boolean_ | `false` | - |
| confirmButtonText | 确认按钮的文案 | _string_ | `确认` | - |
| cancelButtonText | 取消按钮的文案 | _string_ | `取消` | - |
| overlay | 是否展示遮罩层 | _boolean_ | `true` | - |
| overlayStyle | 自定义遮罩层样式 | _object_ | - | 1.0.0 |
| closeOnClickOverlay | 点击遮罩层时是否关闭弹窗 | _boolean_ | `false` | - |
| asyncClose | 是否异步关闭弹窗，开启后需要手动控制弹窗的关闭 | _boolean_ | `false` | - |
| context | 选择器的选择范围，可以传入自定义组件的 this 作为上下文 | _object_ | 当前页面 | - |
| transition | 动画名称，可选值为`fade` `none` | _string_ | `scale` | - |
| confirmButtonOpenType | 确认按钮的微信开放能力，具体支持可参考 [微信官方文档](https://mp.weixin.qq.com/debug/wxadoc/dev/component/button.html) | _string_ | - | - |

### OpenType Options

使用`confirmButtonOpenType`后，支持以下选项：

| 参数 | 说明 | 类型 | 默认值 | open-type |
| --- | --- | --- | --- | --- |
| appParameter | 打开 APP 时，向 APP 传递的参数 | _string_ | - | `launchApp` |
| lang | 指定返回用户信息的语言，zh_CN 简体中文，<br>zh_TW 繁体中文，en 英文 | _string_ | `en` | `getUserInfo` |
| sessionFrom | 会话来源 | _string_ | - | `contact` |
| businessId | 客服消息子商户 id | _number_ | - | `contact` |
| sendMessageTitle | 会话内消息卡片标题 | _string_ | 当前标题 | `contact` |
| sendMessagePath | 会话内消息卡片点击跳转小程序路径 | _string_ | 当前分享路径 | `contact` |
| sendMessageImg | sendMessageImg | _string_ | 截图 | `contact` |
| showMessageCard | 显示会话内消息卡片 | _string_ | `false` | `contact` |

### Props

通过组件调用 Dialog 时，支持以下 Props:

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| show | 是否显示弹窗 | _boolean_ | - |
| title | 标题 | _string_ | - |
| width | 弹窗宽度，默认单位为`px` | _string \| number_ | `320px` | 1.0.0 |
| message | 文本内容，支持通过`\n`换行 | _string_ | - |
| theme | 样式风格，可选值为`round-button` | _string_ | `default` |
| message-align | 内容对齐方式，可选值为`left` `right` | _string_ | `center` |
| z-index | z-index 层级 | _number_ | `100` |
| class-name | 自定义类名，dialog 在自定义组件内时无效 | _string_ | '' |
| custom-style | 自定义样式 | _string_ | '' |
| show-confirm-button | 是否展示确认按钮 | _boolean_ | `true` |
| show-cancel-button | 是否展示取消按钮 | _boolean_ | `false` |
| confirm-button-text | 确认按钮的文案 | _string_ | `确认` |
| cancel-button-text | 取消按钮的文案 | _string_ | `取消` |
| confirm-button-color | 确认按钮的字体颜色 | _string_ | `#1989fa` |
| cancel-button-color | 取消按钮的字体颜色 | _string_ | `#333` |
| overlay | 是否展示遮罩层 | _boolean_ | `true` |
| overlay-style | 自定义遮罩层样式 | _object_ | - | 1.0.0 |
| close-on-click-overlay | 点击遮罩层时是否关闭弹窗 | _boolean_ | `false` |
| use-slot | 是否使用自定义内容的插槽 | _boolean_ | `false` |
| use-title-slot | 是否使用自定义标题的插槽 | _boolean_ | `false` |
| async-close | 是否异步关闭弹窗，开启后需要手动控制弹窗的关闭 | _boolean_ | `false` |
| transition | 动画名称，可选值为`fade` | _string_ | `scale` |
| confirm-button-open-type | 确认按钮的微信开放能力，具体支持可参考 [微信官方文档](https://mp.weixin.qq.com/debug/wxadoc/dev/component/button.html) | _string_ | - |

### OpenType Props

使用`confirm-button-open-type`后，支持以下 Props：

| 参数 | 说明 | 类型 | 默认值 | open-type |
| --- | --- | --- | --- | --- |
| app-parameter | 打开 APP 时，向 APP 传递的参数 | _string_ | - | `launchApp` |
| lang | 指定返回用户信息的语言，zh_CN 简体中文，<br>zh_TW 繁体中文，en 英文 | _string_ | `en` | `getUserInfo` |
| session-from | 会话来源 | _string_ | - | `contact` |
| business-id | 客服消息子商户 id | _number_ | - | `contact` |
| send-message-title | 会话内消息卡片标题 | _string_ | 当前标题 | `contact` |
| send-message-path | 会话内消息卡片点击跳转小程序路径 | _string_ | 当前分享路径 | `contact` |
| send-message-img | sendMessageImg | _string_ | 截图 | `contact` |
| show-message-card | 显示会话内消息卡片 | _string_ | `false` | `contact` |

### Events

| 事件 | 说明 | 回调参数 |
| --- | --- | --- |
| bind:close | 弹窗关闭时触发 | event.detail: 触发关闭事件的来源，<br>枚举为`confirm`,`cancel`,`overlay` |
| bind:confirm | 点击确认按钮时触发 | - |
| bind:cancel | 点击取消按钮时触发 | - |
| bind:getuserinfo | 点击确认按钮时，会返回获取到的用户信息，<br>从返回参数的 detail 中获取到的值同 wx.getUserInfo | - |
| bind:contact | 客服消息回调 | - |
| bind:getphonenumber | 获取用户手机号回调 | - |
| bind:error | 当使用开放能力时，发生错误的回调 | - |
| bind:opensetting | 在打开授权设置页后回调 | - |

### Slot

| 名称  | 说明                                                 |
| ----- | ---------------------------------------------------- |
| title | 自定义`title`显示内容，如果设置了`title`属性则不生效 |
