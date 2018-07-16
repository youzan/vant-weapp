## Badge 徽章

### 使用指南
在 index.json 中引入组件
```json
{
  "usingComponents": {
    "zan-badge": "path/to/zanui-weapp/dist/badge/index"
  }
}
```

### 代码演示

#### 基础用法
```html
<view class="badge-container">
  <zan-badge>10</zan-badge>
</view>
```

#### 自定义参数
```html
<view class="badge-container">
  <zan-badge
    color="{{ color }}"
    background-color="{{ backgroundColor }}"
    font-size="{{ fontSize }}"
    box-shadow="{{ boxShadow }}"
  >10</zan-badge>
</view>
```

```css
.badge-container {
  width: 100px;
  height: 100px;
}
```

### API
| 参数 | 说明 | 类型 | 默认值 |
|-----|-----|-----|-----|
| color | 字体颜色 | String | `#fff`
| background-color | 背景颜色 | String | `#f44`
| font-size | 字体大小 | Number | 10
| box-shadow | 同css box-shadow语法 | String | `0 0 0 2px #fff`
