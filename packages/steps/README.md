## Steps 步骤条

### 使用指南

在 app.json 或 index.json 中引入组件

es6
```json
"usingComponents": {
  "van-steps": "path/to/vant-weapp/dist/steps/index"
}
```

es5
```json
"usingComponents": {
  "van-steps": "path/to/vant-weapp/lib/steps/index"
}
```

### 代码演示

#### 基础用法

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

#### 竖向步骤条
可以通过设置`direction`属性来改变步骤条的显示方式

```html
<van-steps
  steps="{{ steps }}"
  active="{{ active }}"
  direction="vertical"
  active-color="#f44"
/>
```

### Steps API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| active | 当前步骤 | `Number` | 0 |
| direction | 显示方向，可选值为 `horizontal` `vertical` | `String` | `horizontal` |
| active-color | 激活状态颜色 | `String` | `#07c160` |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
