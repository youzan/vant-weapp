# Circle 环形进度条

### 引入

在`app.json`或`index.json`中引入组件，详细介绍见[快速上手](#/quickstart#yin-ru-zu-jian)

```json
"usingComponents": {
  "van-circle": "path/to/@vant/weapp/dist/circle/index"
}
```

## 代码演示

### 基础用法

`value`属性表示进度条的目标进度。

```html
<van-circle value="{{ 30 }}" text="text" />
```

### 宽度定制

通过`stroke-width`属性来控制进度条宽度

```html
<van-circle value="{{ value }}" stroke-width="6" text="宽度定制" />
```

### 颜色定制

通过`color`属性来控制进度条颜色，`layer-color`属性来控制轨道颜色

```html
<van-circle
  value="{{ value }}"
  layer-color="#eeeeee"
  color="#ee0a24"
  text="颜色定制"
/>
```

### 渐变色

`color`属性支持传入对象格式来定义渐变色

```html
<van-circle value="{{ value }}" color="{{ gradientColor }}" text="渐变色" />
```

```javascript
Page({
  data: {
    value: 25,
    gradientColor: {
      '0%': '#ffd01e',
      '100%': '#ee0a24'
    }
  }
});
```

### 逆时针方向

将`clockwise`设置为`false`，进度会从逆时针方向开始

```html
<van-circle
  value="{{ value }}"
  color="#07c160"
  clockwise="{{ false }}"
  text="逆时针"
/>
```

### 大小定制

通过`size`属性设置圆环直径

```html
<van-circle value="{{ value }}" size="120" text="大小定制" />
```

## API

### Props

| 参数         | 说明                                   | 类型               | 默认值    | 版本 |
| ------------ | -------------------------------------- | ------------------ | --------- | ---- |
| value        | 目标进度                               | *number*          | `0`     | -    |
| size         | 圆环直径，默认单位为 `px`              | *number* | `100`     | -    |
| color        | 进度条颜色，传入对象格式可以定义渐变色 | *string \| object* | `#1989fa` | -    |
| layer-color  | 轨道颜色                               | *string*           | `#fff`    | -    |
| fill         | 填充颜色                               | *string*           | -    | -    |
| speed        | 动画速度（单位为 value/s）             | *number*           | `50`      | -    |
| text         | 文字                                   | *string*           | -         | -    |
| stroke-width | 进度条宽度                             | *number*           | `4`      | -    |
| clockwise    | 是否顺时针增加                         | *boolean*          | `true`    | -    |

### Slots

| 名称    | 说明           |
| ------- | -------------- |
| - | 自定义文字内容，如果设置了`fill`，插槽内容会被原生组件覆盖 |
