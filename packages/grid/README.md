# Grid 宫格

### 介绍

宫格可以在水平方向上把页面分隔成等宽度的区块，用于展示内容或进行页面导航

### 引入

在`app.json`或`index.json`中引入组件，详细介绍见[快速上手](#/quickstart#yin-ru-zu-jian)

```json
"usingComponents": {
  "van-grid": "path/to/@vant/weapp/dist/grid/index",
  "van-grid-item": "path/to/@vant/weapp/dist/grid-item/index"
}
```

> Vant Weapp 1.0 版本开始支持此组件，升级方式参见[快速上手](#/quickstart)

## 代码演示

### 基本用法

通过`icon`属性设置格子内的图标，`text`属性设置文字内容

```html
<van-grid>
  <van-grid-item icon="photo-o" text="文字" />
  <van-grid-item icon="photo-o" text="文字" />
  <van-grid-item icon="photo-o" text="文字" />
  <van-grid-item icon="photo-o" text="文字" />
</van-grid>
```

### 自定义列数

默认一行展示四个格子，可以通过`column-num`自定义列数

```html
<van-grid column-num="3">
  <van-grid-item icon="photo-o" text="文字" wx:for="{{ 6 }}" />
</van-grid>
```

### 自定义内容

通过插槽可以自定义格子展示的内容

```html
<van-grid column-num="3" border="{{ false }}">
  <van-grid-item use-slot wx:for="{{ 3 }}" wx:for-item="index">
    <image
      style="width: 100%; height: 90px;"
      src="https://img.yzcdn.cn/vant/apple-{{ index + 1 }}.jpg"
    />
  </van-grid-item>
</van-grid>
```

### 正方形格子

设置`square`属性后，格子的高度会和宽度保持一致

```html
<van-grid square>
  <van-grid-item icon="photo-o" text="文字" wx:for="{{ 8 }}" />
</van-grid>
```

### 格子间距

通过`gutter`属性设置格子之间的距离

```html
<van-grid gutter="{{ 10 }}">
  <van-grid-item icon="photo-o" text="文字" wx:for="{{ 8 }}" />
</van-grid>
```

### 页面跳转

可以通过`url`属性进行页面跳转，通过`link-type`属性控制跳转类型

```html
<van-grid clickable column-num="2">
  <van-grid-item
    icon="home-o"
    link-type="navigateTo"
    url="/pages/dashboard/index"
    text="Navigate 跳转"
  />
  <van-grid-item
    icon="search"
    link-type="reLaunch"
    url="/pages/dashboard/index"
    text="ReLaunch 跳转"
  />
</van-grid>
```

### 提示信息

设置`dot`属性后，会在图标右上角展示一个小红点。设置`info`属性后，会在图标右上角展示相应的徽标

```html
<van-grid column-num="2">
  <van-grid-item icon="home-o" text="文字" dot />
  <van-grid-item icon="search" text="文字" info="99+" />
</van-grid>
```

## API

### Grid Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| column-num | 列数 | *number* | `4` | - |
| gutter | 格子之间的间距，默认单位为`px` | *string \| number* | `0` | - |
| border | 是否显示边框 | *boolean* | `true` | - |
| center | 是否将格子内容居中显示 | *boolean* | `true`  | - |
| square | 是否将格子固定为正方形 | *boolean* | `false` | - |
| clickable  | 是否开启格子点击反馈 | *boolean* | `false` | - |
| use-slot | 是否使用自定义内容的插槽 | *boolean* | `false` |

### GridItem Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| text | 文字 | *string* | - | - |
| icon | 图标名称或图片链接，可选值见 [Icon 组件](#/icon) | *string* | - | - |
| dot | 是否显示图标右上角小红点 | *boolean* | `false` | - |
| info | 图标右上角徽标的内容 | *string \| number* | - | - |
| url | 点击后跳转的链接地址 | *string* | - | -    |
| link-type | 链接跳转类型，可选值为 `redirectTo` `switchTab` `reLaunch` | *string* | `navigateTo` | - |

### GridItem Events

| 事件名 | 说明 | 回调参数 |
|-----------|-----------|-----------|
| bind:click | 点击格子时触发 | - |

### GridItem Slots

| 名称 | 说明 |
|-----------|-----------|
| - | 自定义宫格的所有内容，需要设置`use-slot`属性 |
| icon | 自定义图标，如果设置了`use-slot`或者`icon`属性则不生效 |
| text | 自定义文字，如果设置了`use-slot`或者`text`属性则不生效 |
