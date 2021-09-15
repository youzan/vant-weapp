# Loading 加载

### 介绍

加载图标，用于表示加载中的过渡状态。

### 引入

在`app.json`或`index.json`中引入组件，详细介绍见[快速上手](#/quickstart#yin-ru-zu-jian)。

```json
"usingComponents": {
  "van-loading": "@vant/weapp/loading/index"
}
```

## 代码演示

### 加载类型

```html
<van-loading /> <van-loading type="spinner" />
```

### 自定义颜色

```html
<van-loading color="#1989fa" /> <van-loading type="spinner" color="#1989fa" />
```

### 加载文案

```html
<van-loading size="24px">加载中...</van-loading>
```

### 垂直排列

```html
<van-loading size="24px" vertical>加载中...</van-loading>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| color | 颜色 | _string_ | `#c9c9c9` |
| type | 类型，可选值为 `spinner` | _string_ | `circular` |
| size | 加载图标大小，默认单位为 `px` | _string \| number_ | `30px` |
| text-size `v1.0.0` | 文字大小，默认单位为为 `px` | _string \| number_ | `14px` |
| vertical `v1.0.0` | 是否垂直排列图标和文字内容 | _boolean_ | `false` |

### Slots

| 名称 | 说明     |
| ---- | -------- |
| -    | 加载文案 |

### 外部样式类

| 类名         | 说明         |
| ------------ | ------------ |
| custom-class | 根节点样式类 |
