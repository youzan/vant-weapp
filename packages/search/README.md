## Search 搜索

### 使用指南
在 index.json 中引入组件
```json
{
  "usingComponents": {
    "zan-search": "/packages/search/index"
  }
}
```

### 代码演示

```wxml
<zan-search
  placeholder="搜索..."
  keyword="{{ inputValue }}"
  placeholder="搜索商品"
  focus="{{ focus }}"
  bindchange="searchChange"
  bindsearch="searchDone"
/>
```

```js
data: {
  inputValue: '',
  focus: true
},
searchChange(e) {
  this.setData({
    inputValue: e.detail.value
  });
},

searchDone(e) {
  console.log('search', e.detail.value)
}
```

### 使用slot

```js
<zan-search
  placeholder="搜索..."
  useCancel
>
  <picker
    slot="input"
    mode="selector"
    range="{{ range }}"
    value="{{ rangeIndex }}"
    bindchange="pickerChange"
    class="zan-search__selector"
    style="width: 60px"
    wx:if="{{ range.length > 0}}"
  >
    <view class="picker">{{ range[rangeIndex] }}</view>
  </picker>
</zan-search>
```

### API

#### 参数
| 名称             | 类型        | 是否必须 | 默认  | 描述                                                |
| ---------------- | ----------- | -------- | ----- | --------------------------------------------------- |
| keyword          | String      | 否       | 无    | 默认搜索关键字                                      |
| disabled         | Boolean     | 否       | false | 是否禁用                                          |
| focus            | Boolean     | 否       | false | 是否获取焦点                                       |
| useCancel        | Boolean     | 否       | false | 是否显示取消按钮                                    |
| cancelText       | String      | 否       | 取消  | 取消按钮文字                                        |                          |
| placeholder      | String      | 否       | 无    | 输入框占位字符串                                    |
| cancelStyle      | String      | 否       | 无     | “取消”的样式                                      |
| inputStyle       | String      | 否       | 无     | “输入框”的样式
| searchStyle      | String      | 否       | 无     | “整个搜索”的样式

#### 事件

| 名称             | 类型        | 是否必须 | 默认  | 描述
| ---------------- | ----------- | -------- | ----- | ------|
| bindcancel       | EventHandle | 否       | 无    | 取消按钮点击时触发
| bindsearch       | EventHandle | 否       | 无    | 键盘点击确认时触发
| bindchange       | EventHandle | 否       | 无    | 内容改变时触发
| bindblur       | EventHandle | 否       | 无    | 焦点丢失时触发
| bindfocus       | EventHandle | 否       | 无    | 焦点聚焦时触发
