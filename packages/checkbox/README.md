## Checkbox 复选框

### 使用指南
在 index.json 中引入组件
```json
{
  "usingComponents": {
    "zan-checkbox": "/packages/checkbox/index"
  }
}
```

### 代码演示

#### 基础用法

```html
<zan-checkbox
  checkbox-class="checkbox-demo"
  bindchange="handleCheckboxChange"
>复选框</zan-checkbox>
```

#### 基础用法

```html
<zan-checkbox
  checkbox-class="checkbox-demo"
  bindchange="handleCheckboxChange"
>复选框</zan-checkbox>
```

#### 禁用状态

```html
<zan-checkbox
  checkbox-class="checkbox-demo"
  disabled
  checked="{{ true }}"
>复选框</zan-checkbox>
```

#### 禁用内容部分点击事件

```html
<zan-checkbox
  checkbox-class="checkbox-demo"
  label-disabled
>复选框</zan-checkbox>
```

#### Checkbox组

```html
<zan-checkbox-group>
  <zan-checkbox
    wx:for="{{ items }}"
    wx:for-item="item"
    wx:for-index="index"
    wx:key="{{ value }}"
    checked="{{ item.checked }}"
    data-index="{{ index }}"
    bindchange="handleCheckboxChange"
  >复选框 {{ item.name }}</zan-checkbox>
</zan-checkbox-group>
```

```js
Page({
  data: {
    items: [
      {value: 'a'},
      {value: 'b', checked: true},
      {value: 'c'},
    ]
  }
});
```

#### 列表模式

```html
<zan-checkbox type="list">复选框 a</zan-checkbox>
<zan-checkbox type="list">复选框 b</zan-checkbox>
<zan-checkbox type="list">复选框 c</zan-checkbox>
```

### 参数
| 参数       | 说明      | 类型       | 默认值       | 必须      |
|-----------|-----------|-----------|-------------|-------------|
| checked | 是否选中 | Boolean| false | |
| disabled | 是否可用 | Boolean| false | |
| labelDisabled | 文字区域是否可选 | Boolean | false | |
| type | 显示类型 | String | - | |

### 事件

| 事件名称       | 说明      | 回调参数       |
| ---- | --- | ---|
| change | 数值改变时修改 | checked值|
