<template name="zan-loadmore">

  <block wx:if="{{nomore}}">
    <view class="zan-loadmore zan-loadmore--nomore">
      <view class="zan-loadmore__tips">
        <view class="zan-loadmore__dot"></view>
      </view>
    </view>
  </block>

  <block wx:elif="{{nodata}}">
    <view class="zan-loadmore zan-loadmore--nodata">
      <view class="zan-loadmore__tips">{{ nodata_str || '暂无数据' }}</view>
    </view>
  </block>

  <block wx:elif="{{loading}}">
    <view class="zan-loadmore">
      <view class="zan-loading"></view>
      <view class="zan-loadmore__tips">加载中...</view>
    </view>
  </block>

</template>
