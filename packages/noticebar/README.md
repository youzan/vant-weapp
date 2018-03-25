## Noticebar 通告栏

### 使用指南
在 index.json 中引入组件
```json
{
  "usingComponents": {
    "zan-noticebar": "path/to/zanui-weapp/dist/noticebar/index"
  }
}
```

在 index.js 中声明组件数据
```js
// 在 Page 中声明 Noticebar 依赖的展示数据
Page({
  data: {
    text: 'xxx',
    scrollable: 'xxx',
    ...
  }
})
```

### 代码演示
`Noticebar` 组件支持滚动和静止两种展示方式，通过 text 传入展示文案

### 静止公告栏
```html
<zan-noticebar
  text="{{ text }}"
/>
```

### 滚动通告栏
```html
<zan-noticebar
  text="{{ text }}"
  scrollable="true"
/>
```

### 延时滚动通告栏
```html
<zan-noticebar
  text="{{ text }}"
  scrollable="true"
  delay="{{ delay }}"
/>
```

### 改变滚动通告栏滚动速度
```html
<zan-noticebar
  text="{{ text }}"
  scrollable="true"
  speed="{{ speed }}"
/>
```

### 自定义通告栏字体颜色和背景色
```html
<zan-noticebar
  text="{{ text }}"
  color="{{ color }}"
  background-color="{{ backgroundColor }}"
/>
```

### 添加左侧icon通告栏
```html
<zan-noticebar
  text="{{ text }}"
  left-icon="https://img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png"
/>
```

### 可关闭通告栏
```html
<zan-noticebar
  text="{{ text }}"
  mode="closeable"
/>
```

| 参数       | 说明      | 类型       | 默认值       | 可选值     |
|-----------|-----------|-----------|-------------|-------------|
| text | 通告栏展示文案 | String | - | |
| mode | 通告栏模式 | String | '' | `closeable` |
| delay | 滚动延时时间 | Number | 0 | |
| speed | 滚动速度 | Number | 40 | |
| scrollable | 是否可滚动 | Boolean | false | |
| leftIcon | 左侧图标 | String | - | |
| color | 通告栏字体颜色 | String | `#f60` | |
| backgroundColor | 通告栏背景色 | String | `#fff7cc` |
