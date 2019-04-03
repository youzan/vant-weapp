## ActionSheet 上拉菜单

### 使用指南
在 app.json 或 index.json 中引入组件

es6
```json
"usingComponents": {
  "van-action-sheet": "path/to/vant-weapp/dist/action-sheet/index"
}
```

es5
```json
"usingComponents": {
  "van-action-sheet": "path/to/vant-weapp/lib/action-sheet/index"
}
```

### 代码演示

#### 基础用法
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
        name: '分享',
        subname: '描述信息',
        openType: 'share'
      },
      {
        loading: true
      },
      {
        name: '禁用选项',
        disabled: true
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

#### 带取消按钮的 ActionSheet

如果传入了`cancelText`属性，且不为空，则会在下方显示一个取消按钮，点击会将当前`ActionSheet`关闭。

```html
<van-action-sheet
  show="{{ show }}"
  actions="{{ actions }}"
  cancel-text="取消"
  bind:close="onClose"
/>
```

#### 带标题的 ActionSheet

如果传入了`title`属性，且不为空，则另外一种样式的`ActionSheet`，里面内容需要自定义。

```html
<van-action-sheet show="{{ show }}" title="支持以下配送方式">
  <view>一些内容</view>
</van-action-sheet>
```

### API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| actions | 菜单选项 | `Array` | `[]` |
| title | 标题 | `String` | - |
| z-index | z-index 层级 | `Number` | `100` |
| cancel-text | 取消按钮文字 | `String` | - |
| overlay | 是否显示遮罩层 | `Boolean` | - |
| close-on-click-overlay | 点击遮罩是否关闭菜单 | `Boolean` | - |
| safe-area-inset-bottom | 是否为iPhoneX留出底部安全距离 | `Boolean` | `true` |

### Event

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| bind:select | 选中选项时触发，禁用或加载状态下不会触发 | event.detail: 选项对应的对象 |
| bind:close | 关闭时触发 | - |
| bind:cancel | 取消按钮点击时触发 | - |

### actions

`API`中的`actions`为一个对象数组，数组中的每一个对象配置每一列，每一列有以下`key`：

| key | 说明 |
|-----------|-----------|
| name | 标题 |
| subname | 二级标题 |
| loading | 是否为加载状态 |
| disabled | 是否为禁用状态 |
| className | 为对应列添加额外的 class 类名 |
| openType | 微信开放能力，具体支持可参考 [微信官方文档](https://mp.weixin.qq.com/debug/wxadoc/dev/component/button.html) |
