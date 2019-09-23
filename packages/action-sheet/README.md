# ActionSheet 上拉菜单

### 引入

在`app.json`或`index.json`中引入组件，详细介绍见[快速上手](#/quickstart#yin-ru-zu-jian)

```json
"usingComponents": {
  "van-action-sheet": "path/to/vant-weapp/dist/action-sheet/index"
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
        subname: '描述信息',
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

### 展示标题栏

通过设置`title`属性展示标题栏，同时可以使用插槽自定义菜单内容

```html
<van-action-sheet show="{{ show }}" title="标题">
  <view>内容</view>
<van-action-sheet/>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| actions | 菜单选项 | *Array* | `[]` | - |
| title | 标题 | *string* | - | - |
| z-index | z-index 层级 | *number* | `100` | - |
| cancel-text | 取消按钮文字 | *string* | - | - |
| round | 是否显示圆角 | *boolean* | `true` | 1.0.0 |
| overlay | 是否显示遮罩层 | *boolean* | - | - |
| close-on-click-overlay | 点击遮罩是否关闭菜单 | *boolean* | - | - |
| close-on-click-action | 是否在点击选项后关闭 | *boolean* | `true` | - |
| safe-area-inset-bottom | 是否为 iPhoneX 留出底部安全距离 | *boolean* | `true` | - |

### Events

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| bind:select | 选中选项时触发，禁用或加载状态下不会触发 | event.detail: 选项对应的对象 |
| bind:close | 关闭时触发 | - |
| bind:cancel | 取消按钮点击时触发 | - |
| bind:click-overlay | 点击遮罩层时触发 | - |

### actions

`API`中的`actions`为一个对象数组，数组中的每一个对象配置每一列，每一列有以下`key`：

| 键名 | 说明 | 类型 |
|-----------|-----------|-----------|
| name | 标题 | *string* |
| subname | 二级标题 | *string* |
| color | 选项文字颜色 | *string* |
| loading | 是否为加载状态 | *boolean* |
| disabled | 是否为禁用状态 | *boolean* |
| className | 为对应列添加额外的 class 类名 | *string* |
| openType | 微信开放能力，具体支持可参考 [微信官方文档](https://mp.weixin.qq.com/debug/wxadoc/dev/component/button.html) | *string* |
