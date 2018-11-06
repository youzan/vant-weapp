## Cell 单元格

### 使用指南

在 app.json 或 index.json 中引入组件
```json
"usingComponents": {
  "van-cell": "path/to/vant-weapp/dist/cell/index",
  "van-cell-group": "path/to/vant-weapp/dist/cell-group/index"
}
```

### 代码演示

#### 基础用法

`cell-group`组件是承载`cell`组件的容器，对于容器中的最后一个 cell，需要将 border 属性设置成 `false`

```html
<van-cell-group>
  <van-cell title="单元格" value="内容" />
  <van-cell title="单元格" value="内容" label="描述信息" border="{{ false }}" />
</van-cell-group>
```

#### 只设置value
只设置`value`时会向左对齐

```html
<van-cell-group>
  <van-cell value="内容" border="{{ false }}" />
</van-cell-group>
```

#### 展示图标
通过`icon`属性在标题左侧展示图标

```html
<van-cell-group>
  <van-cell title="单元格" icon="location" border="{{ false }}" />
</van-cell-group>
```


#### 展示箭头
传入`is-link`属性则会在右侧显示箭头，并且可以通过传入`arrow-direction`属性控制箭头方向

```html
<van-cell-group>
  <van-cell title="单元格" is-link />
  <van-cell title="单元格" is-link value="内容" />
  <van-cell
    title="单元格"
    is-link
    arrow-direction="down"
    value="内容"
    border="{{ false }}"
    url="/pages/dashboard/index"
  />
</van-cell-group>
```

#### 高级用法
如以上用法不能满足你的需求，可以使用对应的`slot`来自定义显示的内容

```html
<van-cell-group>
  <van-cell value="内容" icon="shop" is-link>
    <view slot="title">
      <span class="van-cell-text">单元格</span>
      <van-tag type="danger">标签</van-tag>
    </view>
  </van-cell>
  <van-cell title="单元格" icon="location" is-link />
  <van-cell title="单元格" border="{{ false }}">
    <van-icon slot="right-icon" name="search" class="van-cell__right-icon" />
  </van-cell>
</van-cell-group>
```

### CellGroup API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| border | 是否显示外边框 | `Boolean` | `true` |

### CellGroup 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |

### Cell API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| icon | 左侧图标，可选值见 Icon 组件 | `String` | - |
| title | 左侧标题 | `String | Number` | - |
| title-width | 标题宽度，须包含单位 | `String` | - |
| value | 右侧内容 | `String | Number` | - |
| label | 标题下方的描述信息 | `String` | - |
| border | 是否显示下边框 | `Boolean` | `true` |
| center | 是否使内容垂直居中 | `Boolean` | `false` |
| url | 跳转链接 | `String` | - |
| link-type | 链接跳转类型，可选值为 `redirectTo` `switchTab` `reLaunch` | `String` | `navigateTo` |
| clickable | 是否开启点击反馈 | `Boolean` | `false` |
| is-link | 是否展示右侧箭头并开启点击反馈 | `Boolean` | `false` |
| required | 是否显示表单必填星号 | `Boolean` | `false` |
| arrow-direction | 箭头方向，可选值为 `left` `up` `down` | `String` | - |

### Cell Event

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| bind:click | 点击 cell 时触发 | - |

### Cell Slot

| 名称 | 说明 |
|-----------|-----------|
| - | 自定义显示内容 |
| icon | 自定义`icon`，如果设置了`icon`属性则不生效 |
| title | 自定义`title`，如果设置了`title`属性则不生效 |
| right-icon | 自定义右侧按钮，默认是`arrow`，如果设置了`is-link`属性则不生效 |

### Cell 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
| title-class | 标题样式类 |
| label-class | 描述信息样式类 |
| value-class | 右侧内容样式类 |

### 更新日志

| 版本 | 类型 | 内容 |
|-----------|-----------|-----------|
| 0.0.1 | feature | 新增组件 |
| 0.3.3 | bugfix | 修复 value 为空时 title 最大宽度错误的问题 |
| 0.3.4 | bugfix | 修复使用 title 插槽时长度错误的问题 |
