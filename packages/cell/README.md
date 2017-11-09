## Cell 单元格

### 使用指南
在 app.wxss 中引入组件库所有样式
```css
@import "path/to/zanui-weapp/dist/index.wxss";
```

### 代码演示

#### 基础用法
`zan-cell` 有三部分组成：
顶部 Icon：`zan-cell__icon`
主内容区：`zan-cell__bd`
附属内容：`zan-cell__ft`

```html
<view class="zan-cell">
  <view class="zan-cell__icon zan-icon zan-icon-check"></view>
  <view class="zan-cell__bd">单行列表</view>
  <view class="zan-cell__ft">详细信息</view>
</view>
```

当然，也可以在内容区增加附加描述
```html
<view class="zan-cell">
  <view class="zan-cell__bd">
    <view class="zan-cell__text">单行列表</view>
    <view class="zan-cell__desc">附加描述</view>
  </view>
  <view class="zan-cell__ft">详细信息</view>
</view>
```

#### 带箭头的单元格
在根元素上增加 `zan-cell--access`，可以在右侧显示出箭头。
```html
<view class="zan-cell zan-cell--access">
  <view class="zan-cell__bd">单行列表</view>
  <view class="zan-cell__ft"></view>
</view>
```

#### 带开关的单元格
增加 `zan-cell--switch`，更好的适配带有开关的情况
```html
<view class="zan-cell zan-cell--switch">
  <view class="zan-cell__bd">开关</view>
  <view class="zan-cell__ft">
    <template is="zan-switch" data="{{ checked }}"/>
  </view>
</view>
```
