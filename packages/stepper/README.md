## Stepper 计数器

### 使用指南
在 index.json 中引入组件
```json
{
  "usingComponents": {
    "zan-stepper": "path/to/zanui-weapp/dist/stepper/index"
  }
}
```

### 代码演示

#### 基础用法
`Stepper` 组件通过传入的 stepper 对象控制，内部数据格式如下：
```js
Page({
  data: {
    stepper: {
      // 当前 stepper 数字
      stepper: 1,
      // 最小可到的数字
      min: 1,
      // 最大可到的数字
      max: 1,
      // 尺寸
      size: 'small'
    }
  },

  handleZanStepperChange({
    // stepper 代表操作后，应该要展示的数字，需要设置到数据对象里，才会更新页面展示
    detail: stepper
  }) {
    this.setData({
      'stepper.stepper': stepper
    });
  }
});
```

当一个 `Stepper` 中，min 超过 max，就会导致组件被置灰。

当 stepper 被点击时，需要监听`change`事件，处理计数器值的改变。

```js
<zan-stepper
  stepper="{{ stepper.stepper }}"
  min="{{ stepper.min }}"
  max="{{ stepper.max }}"
  bind:change="handleZanStepperChange"
>
</zan-stepper>
```

### API

| 参数       | 说明      | 类型       | 默认值       | 必须      |
|-----------|-----------|-----------|-------------|-------------|
| size | 计数器尺寸：small、middle、large | String | middle | |
| stepper | 计数器的值 | Number | `1` | 必须 |
| min | 计数器最小值 | Number | `1` | |
| max | 计数器最大值 | Number | 无穷大 | |
| step | 步数 | Number | `1` | |

### Event

| 事件名称       | 说明      | 回调参数       |
|-----------|-----------|-----------|
| change | 当绑定值变化时触发的事件 | `{ index, stepper }` |
| minus | 点击减少按钮时触发 | - |
| plus | 点击增加按钮时触发 | - |
