## Capsule 胶囊

### 使用指南
在 index.json 中引入组件
```json
{
  "usingComponents": {
    "zan-capsule": "path/to/zanui-weapp/dist/capsule/index"
  }
}
```

### 代码演示
Panel 提供了一块白色的展示区域，使用方式如下
```html
<zan-capsule color="#38f" leftText="1折扣" rightText="限购一份" />
```
| 参数       | 说明      | 类型       | 默认值       | 必须      |
|-----------|-----------|-----------|-------------|-------------|
| type | capsule的主体颜色，可选值：danger | String | '' | |
| color | 自定义capsule颜色 | String | - | |
| leftText | 左侧文案 | String | - | |
| rightText | 右侧文案 | String | - | |
