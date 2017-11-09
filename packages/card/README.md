## Card 卡片

### 使用指南
在 app.wxss 中引入组件库所有样式
```css
@import "path/to/zanui-weapp/dist/index.wxss";
```

### 代码演示

#### 基础用法
卡片可以用于左侧图片，右侧描述信息的展示。
`zan-card` 由 `zan-card__thumb` 和 `zan-card__detail` 组成。分别负责左侧图片展示和右侧内容区域展示
如下，是一个商品信息的展示：
```html
<view class="zan-card">
  <!-- 卡片左侧商品图片 -->
  <view class="zan-card__thumb">
    <image class="zan-card__img"
      src="https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg"
      mode="aspectFit"
    ></image>
  </view>
  <!-- 卡片右侧详情描述 -->
  <view class="zan-card__detail">
    <!-- 商品标题行 -->
    <!-- 每行可以使用 zan-card__detail-row 来控制展示区域 -->
    <!-- 每行里面可以用 zan-card__left-col zan-card__right-col 来控制左右展示 -->
    <view class="zan-card__detail-row">
      <view class="zan-card__right-col">¥ 999.99</view>
      <view class="zan-card__left-col zan-ellipsis--l2">
         红烧牛肉【虚拟商品】【有库存】【有sku】
      </view>
    </view>
    <!-- 商品附属信息展示行 -->
    <view class="zan-card__detail-row zan-c-gray-darker">
      <view class="zan-card__right-col">x2</view>
      <view class="zan-card__left-col">
        3000克 50%
      </view>
    </view>
    <!-- 商品操作按钮相关 -->
    <view class="zan-card__detail-row zan-c-gray-darker">
      <view class="zan-card__left-col zan-c-red">已发货</view>
    </view>
  </view>
</view>
```

