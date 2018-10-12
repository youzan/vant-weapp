## goodsAction 商品页行动点

### 使用指南
在 index.json 中引入组件
```json
"usingComponents": {
  "van-goods-action": "path/to/vant-weapp/dist/goods-action/index"
}
```

### 代码演示

#### 基础用法

```html
<van-goods-action 
 btn-list="{{ btnList }}" 
 bind:click="onClick" 
/>
```

```javascript
Page({
  data: {
    btnList: [
      {
        type: 'mini',
        icon: 'chat',
        text: '客服',
        bindClickEventName: 'onClickChatBtn'
      },
      {
        type: 'mini',
        icon: 'cart',
        text: '购物车',
        info: 5,
        url: '/pages/submit-bar/index',
        replace: true
      },
      {
        type: 'big',
        text: '加入购物车',
        bindClickEventName: 'onClickBuyBtn'
      },
      {
        type: 'big',
        text: '立即购买',
        primary: true,
        url: '/pages/submit-bar/index',
        replace: false
      }
    ]
  },

  onClick(event) {
    const { bindClickEventName } = event.detail;
    this[`${bindClickEventName}`]();
  },

  onClickChatBtn() {
    console.log('点击图标');
  },

  onClickBuyBtn() {
    console.log('点击按钮');
  }
});
````

### API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| btn-list | 按钮列表 |  `Array` | - |

#### btn-list
| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| type | 按钮类型，可选值为 `mini` `big` | `String` | - |
| text | 按钮文字 | `String` | - |
| icon | 图标 | `String` | - |
| info | 图标右上角提示信息 | `String | Number` | - |
| url | 跳转链接 | `String` | - |
| replace | 跳转时是否替换当前 history | `String` | `false` |
| primary | 是否主行动按钮，主行动按钮默认为红色 | `Boolean` | `false` |

### Event

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| click | 按钮点击事件回调 | - |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| icon-class | icon按钮样式类 |

### 更新日志

| 版本 | 类型 | 内容 |
|-----------|-----------|-----------|
| 0.3.6 | feature | 新增组件 |
