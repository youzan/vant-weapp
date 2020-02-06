# Cell 单元格

### 引入

在`app.json`或`index.json`中引入组件，详细介绍见[快速上手](#/quickstart#yin-ru-zu-jian)

```json
"usingComponents": {
  "van-cell": "path/to/@vant/weapp/dist/cell/index",
  "van-cell-group": "path/to/@vant/weapp/dist/cell-group/index"
}
```

## 代码演示

### 基础用法

`Cell`可以单独使用，也可以与`CellGroup`搭配使用。`CellGroup`可以为`Cell`提供上下外边框。

```html
<van-cell-group>
  <van-cell title="单元格" value="内容" />
  <van-cell title="单元格" value="内容" label="描述信息" border="{{ false }}" />
</van-cell-group>
```

### 单元格大小

通过`size`属性可以控制单元格的大小

```html
<van-cell title="单元格" value="内容" size="large" />
<van-cell title="单元格" value="内容" size="large" label="描述信息" />
```

### 展示图标

通过`icon`属性在标题左侧展示图标

```html
<van-cell title="单元格" icon="location-o" />
```

### 展示箭头

设置`is-link`属性后会在单元格右侧显示箭头，并且可以通过`arrow-direction`属性控制箭头方向

```html
<van-cell title="单元格" is-link />
<van-cell title="单元格" is-link value="内容" />
<van-cell title="单元格" is-link value="内容" arrow-direction="down" />
```

### 页面跳转

可以通过`url`属性进行页面跳转，通过`link-type`属性控制跳转类型

```html
<van-cell
  is-link
  title="单元格"
  link-type="navigateTo"
  url="/pages/dashboard/index"
/>
```

### 分组标题

通过`CellGroup`的`title`属性可以指定分组标题

```html
<van-cell-group title="分组1">
  <van-cell title="单元格" value="内容" />
</van-cell-group>
<van-cell-group title="分组2">
  <van-cell title="单元格" value="内容" />
</van-cell-group>
```

### 使用插槽

如以上用法不能满足你的需求，可以使用插槽来自定义内容

```html
<van-cell value="内容" icon="shop-o" is-link>
  <view slot="title">
    <view class="van-cell-text">单元格</view>
    <van-tag type="danger">标签</van-tag>
  </view>
</van-cell>
<van-cell title="单元格">
  <van-icon slot="right-icon" name="search" class="custom-icon" />
</van-cell>
```

### 垂直居中

通过`center`属性可以让`Cell`的左右内容都垂直居中

```html
<van-cell center title="单元格" value="内容" label="描述信息" />
```

## API

### CellGroup Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| title | 分组标题 | *string* | `-` | - |
| border | 是否显示外边框 | *boolean* | `true` | - |

### CellGroup 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |

### Cell Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| icon | 左侧图标名称或图片链接，可选值见 [Icon 组件](#/icon) | *string* | - | - |
| title | 左侧标题 | *string \| number* | - |
| title-width | 标题宽度，须包含单位 | *string* | - | - |
| value | 右侧内容 | *string \| number* | - | - |
| label | 标题下方的描述信息 | *string* | - | - |
| size | 单元格大小，可选值为 `large` | *string* | - | - |
| border | 是否显示下边框 | *boolean* | `true` | - |
| center | 是否使内容垂直居中 | *boolean* | `false` | - |
| url | 点击后跳转的链接地址 | *string* | - | - |
| link-type | 链接跳转类型，可选值为 `redirectTo` `switchTab` `reLaunch` | *string* | `navigateTo` | - |
| clickable | 是否开启点击反馈 | *boolean* | `false` | - |
| is-link | 是否展示右侧箭头并开启点击反馈 | *boolean* | `false` | - |
| required | 是否显示表单必填星号 | *boolean* | `false` | - |
| arrow-direction | 箭头方向，可选值为 `left` `up` `down` | *string* | - | - |
| use-label-slot | 是否使用 label slot | *boolean* | `false` | - |

### Cell Event

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| bind:click | 点击单元格时触发 | - |

### Cell Slot

| 名称 | 说明 |
|-----------|-----------|
| - | 自定义`value`显示内容，如果设置了`value`属性则不生效 |
| title | 自定义`title`显示内容，如果设置了`title`属性则不生效 |
| label | 自定义`label`显示内容，需要设置 `use-label-slot`属性 |
| icon | 自定义`icon`显示内容，如果设置了`icon`属性则不生效 |
| right-icon | 自定义右侧按钮，默认是`arrow`，如果设置了`is-link`属性则不生效 |

### Cell 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
| title-class | 标题样式类 |
| label-class | 描述信息样式类 |
| value-class | 右侧内容样式类 |
