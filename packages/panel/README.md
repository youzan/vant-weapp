## Panel 面板组件

### 使用指南
在 index.json 中引入组件
```json
{
  "usingComponents": {
    "zan-panel": "path/to/zanui-weapp/dist/panel/index"
  }
}
```

### 代码演示
Panel 提供了一块白色的展示区域，使用方式如下
```html
<zan-panel title='我是标题'>
  <view>内容</view>
</zan-panel>
```
| 参数       | 说明      | 类型       | 默认值       | 必须      |
|-----------|-----------|-----------|-------------|-------------|
| title | panel的标题 | String | - | |
| hide-border | 内容区隐藏边框 | Boolean | - | |


