## Popup 轻提示

### 使用指南
在 app.wxss 中引入组件库所有样式
```css
@import "path/to/zanui-weapp/dist/index.wxss";
```

在需要使用的页面里引入组件库模板和脚本
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


