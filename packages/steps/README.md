# Steps 步骤条

### 引入

在`app.json`或`index.json`中引入组件，详细介绍见[快速上手](#/quickstart#yin-ru-zu-jian)

```json
"usingComponents": {
  "van-steps": "path/to/@vant/weapp/dist/steps/index"
}
```

## 代码演示

### 基础用法

```html
<van-steps
  steps="{{ steps }}"
  active="{{ active }}"
/>
```

```javascript
Page({
  data: {
    steps: [
      {
        text: '步骤一',
        desc: '描述信息'
      },
      {
        text: '步骤二',
        desc: '描述信息'
      },
      {
        text: '步骤三',
        desc: '描述信息'
      },
      {
        text: '步骤四',
        desc: '描述信息'
      }
    ]
  }
});
```

### 自定义样式
可以通过 `active-icon` 和 `active-color` 属性设置激活状态下的图标和颜色

```html
<van-steps
  steps="{{ steps }}"
  active="{{ active }}"
  active-icon="success"
  active-color="#38f"
/>
```

### 竖向步骤条
可以通过设置`direction`属性来改变步骤条的显示方式

```html
<van-steps
  steps="{{ steps }}"
  active="{{ active }}"
  direction="vertical"
  active-color="#ee0a24"
/>
```

## API

### Steps Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| active | 当前步骤 | *number* | 0 | - |
| direction | 显示方向，可选值为 `horizontal` `vertical` | *string* | `horizontal` | - |
| active-color | 激活状态颜色 | *string* | `#07c160` | - |
| inactive-color | 未激活状态颜色 | *string* | `#969799` | - |
| active-icon | 激活状态底部图标，可选值见 [Icon 组件](#/icon) | *string* | `checked` | - |
| inactive-icon | 未激活状态底部图标，可选值见 [Icon 组件](#/icon) | *string* | - | - |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
| desc-class | 描述信息样式类 |
