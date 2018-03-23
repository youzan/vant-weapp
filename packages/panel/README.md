## Panel 面板组件

### 使用指南
在 index.json 中引入组件
```json
{
  "usingComponents": {
    "Panel": "/packages/Panel/panel"
  }
}
```

### 代码演示
Panel 提供了一块白色的展示区域，使用方式如下
```js
Page({
  data: {
    title: '我是🦀',
    hideTop: true,
    hideBorder: true
  }
  // ...
});
```
```html
<Panel
  title='我是标题'
>
  <view>内容</view>
</Panel>
<Panel
  title={{title}}
  hide-top={{hideTop}}
>
  <view>内容</view>
</Panel>
<Panel
  title={{title}}
  hide-border={{hideBorder}}
>
  <view>内容</view>
</Panel>
```
