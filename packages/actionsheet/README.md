## Actionsheet 行动按钮

### 使用指南
在 index.json 中引入组件
```json
{
  "usingComponents": {
    "zan-actionsheet": "path/to/zanui-weapp/dist/actionsheet/index"
  }
}
```

### 使用指南

```html
<button bindtap="openActionSheet">Open ActionSheet</button>
<view class="actionsheet-container">
  <!-- 监听自定义事件 cancel 和 actionclick，绑定回调函数 -->
  <zan-actionsheet
    show="{{ show }}"
    actions="{{ actions }}"
    cancel-text="{{ cancelText }}"
    cancel-with-mask="{{ cancelWithMask }}"
    bind:cancel="closeActionSheet"
    bind:actionclick="handleActionClick"
  >
  </zan-actionsheet>
</view>
```

```js
// 在 Page 中混入 Actionsheet 里面声明的方法
Page({
  data: {
    show: false,
    cancelWithMask: true,
    actions: [{
      name: '选项1',
      subname: '选项描述语1',
      loading: false
    }, {
      name: '选项2',
      subname: '选项描述语2',
      loading: false
    }, {
      name: '去分享',
      openType: 'share'
    }],
    cancelText: '关闭 Action'
  },
  openActionSheet() {
    this.setData({
      'show': true
    });
  },
  closeActionSheet() {
    this.setData({
      'show': false
    });
  },
  handleActionClick({ detail }) {
    // 获取被点击的按钮 index
    const { index } = detail;
  }
});
```


#### `Actionsheet` 支持的具体参数如下（ 传入时使用分隔线写法 ）
| 参数       | 说明      | 类型       | 默认值       | 必须      |
|-----------|-----------|-----------|-------------|-------------|
| show | 用来表示是否展示行动按钮 | Boolean | false | |
| actions | 指定弹层里的按钮 | Array  | [] | |
| cancelText | 行动按钮底部取消按钮的文案，不传则不显示取消按钮 | String  | | |
| cancelWithMask | 是否在点击背景时，关闭行动按钮 | Boolean  | false | |
| mask-class | 用于控制蒙层样式的外部类 | String  | | |
| container-class | 用于控制容器样式的外部类 | String  | | |

actions 的具体数据结构
```js
// actions 为数组结构传入
[{
  // 按钮文案
  name: '选项1',
  // 按钮描述文案，不传就不显示
  subname: '选项描述语1',
  // 按钮是否显示为 loading
  loading: false,
  // 按钮的微信开放能力
  // 具体支持可参考微信官方文档：https://mp.weixin.qq.com/debug/wxadoc/dev/component/button.html
  openType: 'share'
}]
```

