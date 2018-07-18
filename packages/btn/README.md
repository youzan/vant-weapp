## Button 按钮

### 使用指南
在 json 文件中配置button组件
```json
"usingComponents": {
  "zan-button": "path/to/zanui-weapp/dist/btn/index"
}
```

### 代码演示

#### 基础用法
```html
<zan-button>取消订单</zan-button>
```

#### 按钮类型
按钮支持额外的三种类型 primary, danger, warn
```html
<zan-button type="primary">确认付款</zan-button>
<zan-button type="danger">确认付款</zan-button>
<zan-button type="warn">确认付款</zan-button>
```

#### 按钮大小
按钮支持额外三种大小 large, small, mini
```html
<zan-button size="large">确认付款</zan-button>
<zan-button size="small">取消订单</zan-button>
<zan-button size="mini">确认付款</zan-button>
```

#### 其他
按钮镂空状态
```html
<zan-button plain>确认付款</zan-button>
```

按钮加载状态
```html
<zan-button loading>确认付款</zan-button>
```

按钮禁用状态
```html
<zan-button disabled>确认付款</zan-button>
```

### 配合 button-group 使用
通过配合 zan-button-group 使用，可以让按钮之间自动有合适的间距出现，使用方式如下

1.在 json 文件中配置 button-group 组件
```json
"usingComponents": {
  "zan-button": "path/to/zanui-weapp/dist/btn/index",
  "zan-button-group": "path/to/zanui-weapp/dist/btn-group/index"
}
```
2.在 wxml 中直接引入
```html
<zan-button-group>
  <zan-button>确认付款</zan-button>
  <zan-button>再考虑下</zan-button>
</zan-button-group>
```

![](https://img.yzcdn.cn/public_files/2017/02/08/1b1e39ed3dc6b63519a68ba1e2650cfc.png)

### 属性

| 名称     | 类型    | 是否必须  | 默认  | 描述   |
|---------|---------|----------|------|-------|
| type    | String  | 否       | 空 | 按钮类型，值有primary、warn、danger |
| size    | String  | 否       | 空 | 按钮大小，值有large、small、mini |
| plain   | Boolean | 否       | false | 按钮是否镂空，默认为false |
| disabled | Boolean | 否      | false | 按钮是否禁用，默认为false |
| loading | Boolean | 否       | false | 按钮加载状态，默认为false |
| openType | String | 否       | - | 微信开放能力 |
| appParameter | String | 否   | - | 打开 APP 时，向 APP 传递的参数 |
| hoverStartTime | Number | 否   | 20 | 按住后多久出现点击态，单位毫秒	 |
| hoverStayTime | Number | 否   | 70 | 手指松开后点击态保留时间，单位毫秒	 |
| lang | String | 否   | en | 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文 |
| sessionFrom | String | 否   | - | 会话来源 |
| sendMessageTitle | String | 否   | 当前标题 | 会话内消息卡片标题 |
| sendMessagePath | String | 否   | 当前分享路径 | 会话内消息卡片点击跳转小程序路径	 |
| sendMessageImg | String | 否   | 截图 | 会话内消息卡片图片 |
| showMessageCard | String | 否   | false | 显示会话内消息卡片 |

### 事件
| 事件名称       | 说明      | 回调参数       |
|-----------|-----------|-----------|
|  btnclick  | 按钮在可用状态被点击时触发 | |
|  disabledclick  | 在传入的 disabled 为 true 时，点击按钮会触发此事件 | |
|  getuserinfo  | 用户点击该按钮时，会返回获取到的用户信息，从返回参数的detail中获取到的值同wx.getUserInfo | |
|  contact  | 客服消息回调 | |
|  getphonenumber  | 获取用户手机号回调 | |
|  error  | 当使用开放能力时，发生错误的回调 | |
