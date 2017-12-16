## Helper 基础样式

### 使用指南
在 app.wxss 中引入组件库所有样式
```css
@import "path/to/zanui-weapp/dist/index.wxss";
```

### 代码演示
直接在元素上增加指定 class 即可
```html
<view class="zan-pull-right">zan-pull-right: 往右靠</view>
```

具体可用类名如下：

**字体大小**

`zan-font-8` 文字以8像素大小展示

`zan-font-10` 文字以10像素大小展示

`zan-font-12` 文字以12像素大小展示

`zan-font-14` 文字以14像素大小展示

`zan-font-16` 文字以16像素大小展示

`zan-font-18` 文字以18像素大小展示

`zan-font-20` 文字以20像素大小展示

`zan-font-22` 文字以22像素大小展示

`zan-font-24` 文字以24像素大小展示

`zan-font-30` 文字以30像素大小展示

**字体颜色**

`zan-c-red` 文字以红色展示

`zan-c-gray` 文字以浅灰色展示

`zan-c-gray-dark` 文字以灰色展示

`zan-c-gray-darker` 文字以深灰色展示

`zan-c-black` 文字以黑色展示

`zan-c-blue` 文字以蓝色展示

`zan-c-green` 文字以绿色展示

**字体样式**

`zan-pull-right` 文字往右靠

`zan-text-deleted` 文字显示删除效果

`zan-font-bold` 文字加粗显示

**其他**

`zan-arrow` 展示向右侧箭头，以 absolute 布局，需要在外层加上 relative 来定位

`zan-ellipsis` 文字过长点点点显示

`zan-ellipsis--l2` 文字过长点点点显示，最多显示两行

`zan-ellipsis--l3` 文字过长点点点显示，最多显示三行
