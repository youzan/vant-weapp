# SubmitBar 提交订单栏

### 引入

在`app.json`或`index.json`中引入组件，详细介绍见[快速上手](#/quickstart#yin-ru-zu-jian)

```json
"usingComponents": {
  "van-submit-bar": "path/to/@vant/weapp/dist/submit-bar/index"
}
```

## 代码演示

### 基础用法

```html
<van-submit-bar
  price="{{ 3050 }}"
  button-text="提交订单"
  bind:submit="onSubmit"
/>
```

### 禁用状态

禁用状态下不会触发`submit`事件

```html
<van-submit-bar
  disabled
  price="{{ 3050 }}"
  button-text="提交订单"
  tip="您的收货地址不支持同城送, 我们已为您推荐快递"
  tip-icon="https://img.yzcdn.cn/1.png"
  bind:submit="onSubmit"
/>
```

### 加载状态

加载状态下不会触发`submit`事件

```html
<van-submit-bar
  loading
  price="{{ 3050 }}"
  button-text="提交订单"
  bind:submit="onSubmit"
/>
```

### 高级用法

通过插槽插入自定义内容

```html
<van-submit-bar
  price="{{ 3050 }}"
  button-text="提交订单"
  bind:submit="onClickButton"
  tip="{{ true }}"
>
  <van-tag type="primary">标签</van-tag>
  <view slot="tip">
    您的收货地址不支持同城送, <text>修改地址</text>
  </view>
</van-submit-bar>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| price | 价格（单位分） | *number* | - | - |
| label | 价格文案 | *string* | `合计：` | - |
| suffix-label | 价格右侧文案 | *string* | - | - |
| button-text | 按钮文字 | *string* | - | - |
| button-type | 按钮类型 |  *string* | `danger` | - |
| tip | 提示文案 | *string \| boolean* | - | - |
| tip-icon | 图标名称或图片链接，可选值见 [Icon 组件](#/icon) | *string* | - | - |
| disabled | 是否禁用按钮 | *boolean* | `false` | - |
| loading | 是否显示加载中的按钮 | *boolean* | `false` | - |
| currency | 货币符号 | *string* | `¥` | - |
| safe-area-inset-bottom | 是否为 iPhoneX 留出底部安全距离 | *boolean* | `true` | - |
| decimal-length | 价格小数点后位数 | *number* | `2` | - |

### Events

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| submit | 按钮点击事件回调 | - |

### Slot

| 名称 | 说明 |
|-----------|-----------|
| - | 自定义订单栏左侧内容 |
| top | 自定义订单栏上方内容 |
| tip | 提示文案中的额外操作和说明 |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
| price-class | 价格样式类 |
| button-class | 按钮样式类 |
| bar-class | 订单栏样式类 |
