# Panel 面板

### 引入

在`app.json`或`index.json`中引入组件，详细介绍见[快速上手](#/quickstart#yin-ru-zu-jian)。

```json
"usingComponents": {
  "van-panel": "@vant/weapp/panel/index"
}
```

## 代码演示

### 基础用法

面板只是一个容器，里面可以放入自定义的内容。

```html
<van-panel title="标题" desc="描述信息" status="状态">
  <view>内容</view>
</van-panel>
```

### 高级用法

使用`slot`自定义内容。

```html
<van-panel title="标题" desc="描述信息" status="状态">
  <view>内容</view>
  <view slot="footer">
    <van-button size="small">按钮</van-button>
    <van-button size="small" type="danger">按钮</van-button>
  </view>
</van-panel>
```

## API

### Props

| 参数   | 说明 | 类型     | 默认值 |
| ------ | ---- | -------- | ------ |
| title  | 标题 | _string_ | -      |
| desc   | 描述 | _string_ | -      |
| status | 状态 | _string_ | -      |

### Slot

| 名称   | 说明                                                           |
| ------ | -------------------------------------------------------------- |
| -      | 自定义内容                                                     |
| header | 自定义 header，如果设置了`title`、`desc`、`status`属性则不生效 |
| footer | 自定义 footer                                                  |

### 外部样式类

| 类名         | 说明         |
| ------------ | ------------ |
| custom-class | 根节点样式类 |
| header-class | 头部样式类   |
| footer-class | 底部样式类   |
