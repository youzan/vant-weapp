# ActionSheet 上拉菜单

### 引入

在`app.json`或`index.json`中引入组件，详细介绍见[快速上手](#/quickstart#yin-ru-zu-jian)

```json
"usingComponents": {
  "van-action-sheet": "path/to/@vant/weapp/dist/action-sheet/index"
}
```


## 代码演示

### 基础用法

需要传入一个`actions`的数组，数组的每一项是一个对象，对象属性见文档下方表格。

```html
<van-action-sheet
  show="{{ show }}"
  actions="{{ actions }}"
  bind:close="onClose"
  bind:select="onSelect"
/>
```

```javascript
Page({
  data: {
    show: false,
    actions: [
      {
        name: '选项'
      },
      {
        name: '选项'
      },
      {
        name: '选项',
        subname: '副文本',
        openType: 'share'
      }
    ]
  },

  onClose() {
    this.setData({ show: false });
  },

  onSelect(event) {
    console.log(event.detail);
  }
});
```

### 选项状态

选项可以设置为加载状态或禁用状态。

```html
<van-action-sheet
  show="{{ show }}"
  actions="{{ actions }}"
  cancel-text="取消"
/>
```

```javascript
Page({
  data: {
    show: false,
    actions: [
      { name: '选项', color: '07c160' },
      { loading: true },
      { name: '禁用选项', disabled: true }
    ]
  }
})
```

### 展示取消按钮

设置`cancel-text`属`性后，会在底部展示取消按钮，点击后关闭当前菜单

```html
<van-action-sheet
  show="{{ show }}"
  actions="{{ actions }}"
  cancel-text="取消"
/>
```

### 展示描述信息

设置`description`属性后，会在选项上方显示描述信息

```html
<van-action-sheet
  show="{{ show }}"
  :actions="actions"
  description="这是一段描述信息"
/>
```

### 展示标题栏

通过设置`title`属性展示标题栏，同时可以使用插槽自定义菜单内容

```html
<van-action-sheet show="{{ show }}" title="标题">
  <view>内容</view>
</van-action-sheet>
```

### 微信开放能力

需要传入一个`actions`的数组，数组的每一项是一个对象，对象属性见文档下方表格。

```html
<van-action-sheet
  show="{{ show }}"
  actions="{{ actions }}"
  bind:close="onClose"
  bind:getuserinfo="onGetUserInfo"
/>
```

```javascript
Page({
  data: {
    show: false,
    actions: [
      { name: '获取用户信息', color: '#07c160', openType: 'getUserInfo' },
    ]
  },

  onClose() {
    this.setData({ show: false });
  },

  onGetUserInfo(e) {
    console.log(e.detail)
  }
});
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| actions | 菜单选项 | *Array* | `[]` | - |
| title | 标题 | *string* | - | - |
| description | 选项上方的描述信息 | *string* | - | 1.0.0 |
| z-index | z-index 层级 | *number* | `100` | - |
| cancel-text | 取消按钮文字 | *string* | - | - |
| overlay | 是否显示遮罩层 | *boolean* | - | - |
| round | 是否显示圆角 | *boolean* | `true` | 1.0.0 |
| close-on-click-action | 是否在点击选项后关闭 | *boolean* | `true` | - |
| close-on-click-overlay | 点击遮罩是否关闭菜单 | *boolean* | - | - |
| safe-area-inset-bottom | 是否为 iPhoneX 留出底部安全距离 | *boolean* | `true` | - |

### Events

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| bind:select | 选中选项时触发，禁用或加载状态下不会触发 | event.detail: 选项对应的对象 |
| bind:close | 关闭时触发 | - |
| bind:cancel | 取消按钮点击时触发 | - |
| bind:click-overlay | 点击遮罩层时触发 | - |
| bind:getuserinfo | 用户点击该按钮时，会返回获取到的用户信息，回调的detail数据与wx.getUserInfo返回的一致，<a href="#/action-sheet#actions">openType</a>="getUserInfo"时有效 | - |
| bind:contact | 客服消息回调，<a href="#/action-sheet#actions">openType</a>="contact"时有效 | - |
| bind:getphonenumber | 获取用户手机号回调，<a href="#/action-sheet#actions">openType</a>="getPhoneNumber"时有效	 | - |
| bind:error | 当使用开放能力时，发生错误的回调，<a href="#/action-sheet#actions">openType</a>="launchApp"时有效 | - |
| bind:launchapp | 打开 APP 成功的回调，<a href="#/action-sheet#actions">openType</a>="launchApp"时有效 | - |
| bind:opensetting | 在打开授权设置页后回调，<a href="#/action-sheet#actions">openType</a>="openSetting"时有效 | - |

### actions

`API`中的`actions`为一个对象数组，数组中的每一个对象配置每一列，每一列有以下`key`：

| 键名 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-----------|
| name | 标题 | *string* | - |
| subname | 二级标题 | *string* | - |
| color | 选项文字颜色 | *string* | - |
| loading | 是否为加载状态 | *boolean* | - |
| disabled | 是否为禁用状态 | *boolean* | - |
| className | 为对应列添加额外的 class 类名 | *string* | - |
| openType | 微信开放能力，具体支持可参考 [微信官方文档](https://mp.weixin.qq.com/debug/wxadoc/dev/component/button.html) | *string* | - |
| lang | 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文 | *string* | `en` | 
| sessionFrom | 会话来源，openType="contact"时有效 | *string* | - |
| sendMessageTitle | 会话内消息卡片标题，openType="contact"时有效 | *string* | 当前标题 |
| sendMessagePath | 会话内消息卡片点击跳转小程序路径，openType="contact"时有效 | *string* | 当前分享路径 |
| sendMessageImg | 会话内消息卡片图片，openType="contact"时有效 | *string* | 截图 |
| showMessageCard | 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，openType="contact"时有效 | *string* | `false` |
| appParameter | 打开 APP 时，向 APP 传递的参数，openType=launchApp时有效 | *string* | - |
