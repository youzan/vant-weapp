## Popup 弹出层

### 使用指南
在 index.json 中引入组件
```json
{
  "usingComponents": {
    "zan-popup": "path/to/zanui-weapp/dist/popup/index"
  }
}
```

### 代码演示
可以在页面任意位置上使用 zan-popup 标签。通过 show 可以控制弹窗是否展示
```html
<zan-popup show="{{ show }}"></zan-popup>
```
#### popup 动画
popup 额外支持了 上下左右 四种动画方式，通过增加 type 属性即可控制。使用方式如下
```html
<!-- 从底部弹出的弹层 -->
<zan-popup type="bottom" show="{{ show }}"></zan-popup>

<!-- 从顶部弹出的弹层 -->
<zan-popup type="top" show="{{ show }}"></zan-popup>

<!-- 从左侧弹出的弹层 -->
<zan-popup type="left" show="{{ show }}"></zan-popup>

<!-- 从右侧弹出的弹层 -->
<zan-popup type="right" show="{{ show }}"></zan-popup>
```

#### 控制显示，隐藏

```html
<zan-popup show="{{ isShow }}" bindclose="togglePopup"></zan-popup>
```

```js
data: {
  isShow: false
},
togglePopup() {
  this.setData({
    isShow: !this.data.isShow
  });
}
```

### 具体参数和事件
#### 参数说明
| 参数       | 说明      | 类型       | 默认值       | 必须      |
|-----------|-----------|-----------|-------------|-------------|
| show | 是否显示弹出层 | Boolean | false | |
| overlay | 是否显示遮罩层 | Boolean | true | |
| closeOnClickOverlay | 遮罩层点击时，是否触发关闭事件 | Boolean | true | |
| type | 弹出层动画方式, 可选`center`, `left`, `right`, `top`, `bottom` | String | center | |

#### 事件说明
| 事件名       | 说明      | 参数       |
|-----------|-----------|-----------|
| click-overlay | 遮罩层点击触发 |  |
| close | 遮罩层关闭时触发 |  |
