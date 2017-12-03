## Popup 轻提示

### 使用指南
在 app.wxss 中引入组件库所有样式
```css
@import "path/to/zanui-weapp/dist/index.wxss";
```

在需要使用的页面里使用特定的 wxml 结构
```html
<!-- 在需要展示时，增加 zan-popup--show 类即可 -->
<view class="zan-popup zan-popup--show">
  <!-- 遮罩层，有需要可以在遮罩层上增加点击事件 -->
  <view class="zan-popup__mask"></view>
  <!-- 弹出层的内容放在此元素内 -->
  <view class="zan-popup__container"></view>
</view>
```

### 代码演示
#### popup 动画
popup 额外支持了 上下左右 四种动画方式，通过在顶层加指定的类即可。使用方式如下
```html
<!-- 从底部弹出的弹层 -->
<view class="zan-popup zan-popup--bottom">
  <!-- 填充 popup 内容 -->
</view>

<!-- 从顶部弹出的弹层 -->
<view class="zan-popup zan-popup--top">
  <!-- 填充 popup 内容 -->
</view>

<!-- 从左侧弹出的弹层 -->
<view class="zan-popup zan-popup--left">
  <!-- 填充 popup 内容 -->
</view>

<!-- 从右侧弹出的弹层 -->
<view class="zan-popup zan-popup--right">
  <!-- 填充 popup 内容 -->
</view>
```

#### 样式配置
popup 中内容区域的样式，可以通过自定义 zan-popup__container 或者内部元素来实现。
```html
<view class="zan-popup zan-popup--show">
  <!-- 遮罩层，有需要可以在遮罩层上增加点击事件 -->
  <view class="zan-popup__mask"></view>
  <!-- 弹出层的内容放在此元素内 -->
  <view class="zan-popup__container demo-contaienr" style="padding: 15px;"></view>
</view>
```
