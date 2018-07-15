## Radio 单选框

### 使用指南
在 index.json 中引入组件
```json
{
  "usingComponents": {
    "zan-radio": "/packages/radio/index"
  }
}
```

### 代码演示

#### 基础数据结构

```js
items: [
  {name: 'USA', value: '美国'},
  {name: 'BRA', value: '巴西', disabled: true },
  {name: 'CHN', value: '中国', checked: 'true'}
]
```

#### 基础用法

```html
<zan-radio items="{{ items }}"></zan-radio>
```

#### 禁用状态

```html
<zan-radio items="{{ items }}"></zan-radio>
```

```js
Page({
  data: {
    items: [
      {name: 'USA', value: '美国'},
      {name: 'BRA', value: '巴西', disabled: true },
      {name: 'CHN', value: '中国', checked: 'true'}
    ]
  }
})
```

#### 自定义样式

```html
<zan-radio
  items="{{ items }}"
  radio-color="radio-color"
  radio-class="radio-demo"
></zan-radio>
```

```css
.radio-demo {
  font-size: 12px !important;
}

.radio-color {
  color: red !important;
}
```

#### 事件

```html
<zan-panel title='事件'>
  <zan-radio
    items="{{ items }}"
    bind:change="handleRadioChange"
  ></zan-radio>
</zan-panel>
```

```js
Page({
  handleRadioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail)
  }
})
```

#### 列表模式

```html
<zan-radio items="{{ items }}" type="list"></zan-radio>
```

### 参数
| 参数       | 说明      | 类型       | 默认值       | 必须      |
|-----------|-----------|-----------|-------------|-------------|
| items | 单选数组 | Array | [] | - |
| type | 显示类型: list | String | - | |
| radio-class | radio样式类| String| -|
| radio-color | radio选中颜色 | String | #06bf04|

### 事件

| 事件名称       | 说明      | 回调参数       |
| ---- | --- | ---|
| change | 数值改变时触发 | event |
