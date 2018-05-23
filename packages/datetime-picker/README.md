## DatetimePicker 时间选择

使用 picker 组件开发的时间日期组件，弥补小程序 picker 自身对于快速时间选择的不支持

### 示例代码

```json
{
  "usingComponents": {
    "zan-date-picker": "../../dist/datetime-picker/index"
  }
}
```

```wxml
<zan-date-picker
  bindchange="change"  
  bindcancel="cancel"
  placeholder="请选择一个时间"
  placeholder-class="my-customer-class-name"
  format="你选择了YYYY年MM月DD日HH点mm分ss秒"
/>
```

### 属性与事件

| 名称              | 类型      | 是否必须 | 默认                | 描述                                                                                                  |
| ----------------- | --------- | -------- | ------------------- | ----------------------------------------------------------------------------------------------------- |
| value             | null      | `否`     | 当前时间            | 初始化时间，传入的值会被 Date 构造函数转换为一个 Date 对象，不合法的值将抛出一个错误                  |
| placeholder-class | `String`  | `否`     | 无                  | 自定义类，可改变 placeholder 样式，其他类无效，`picker-view` 为 true 时不支持                         |
| placeholder       | `String`  | `否`     | 请选择时间          | 设置 picker 的 placeholder                                                                            |
| not-use           | `Array`   | `否`     | 无                  | 不需要显示的列 可选择`years`, `months`, `days`, `hours`, `minutes`, `seconds`中的多个                 |
| native            | `Boolean` | `否`     | 无                  | 使用原生 picker，还是自定义的 picker（自定义 picker 滚动不如原生）                                    |
| picker-view       | `Boolean` | `否`     | 无                  | 如果为 true，相当于 picker-view 组件                                                                  |
| format            | `String`  | `否`     | YYYY-MM-DD HH:mm:ss | 设置选中的时间显示的格式，支持 _YYYY，yyyy，YY，yy，MM，M，DD，dd，D，d，HH， hh，H，h，mm，m，ss，s_ |
| bindchange        | `String`  | `是`     | 无                  | 用户点击`确认`触发该事件，返回值为按“年，月，日，时，分，秒”顺序的数组，可以通过`detail.value`获取    |
| bindcancel        | `String`  | `否`     | 无                  | 用户点击`取消`触发该事件                                                                              |

### 方法

| 名称         | 参数 | 描述 |
| ------------ | ---- | ---- |
| getFormatStr |  无    |  返回 `format` 格式的字符串，在 `picker-view` 为 true 时比较实用  |

### 增强优化

* 支持可选择时间区域限制
* 滚动优化
