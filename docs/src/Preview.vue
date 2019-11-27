<template>
  <div>
    <img :class="['preview-image', `preview-image--${imageName}`]" :src="image">
    <div class="preview-popup">
      <div class="preview-content">
        <img src="https://img.yzcdn.cn/vant-weapp/qrcode-201808101114.jpg">
        <p>微信扫码体验</p>
      </div>
    </div>
  </div>
</template>

<script>
const PREFIX = 'https://img.yzcdn.cn/vant-weapp/';
const MAP = {
  index: 'index-20190715.png',
  transition: 'transition-20180821.png'
};

export default {
  computed: {
    imageName() {
      return location.hash.slice(1);
    },
    image() {
      return PREFIX + (MAP[this.imageName] || MAP.index);
    }
  }
};
</script>

<style lang="less">
body {
  margin: 0;
  color: #323233;
  font-family: 'PingFang SC', Helvetica, 'STHeiti STXihei', 'Microsoft YaHei', Tohoma, Arial, sans-serif;
  line-height: 1;
  background-color: #f7f8fa;
  -webkit-font-smoothing: antialiased;
}

.preview {
  &-image {
    display: block;
    width: 100%;

    &--transition {
      margin-top: -62px;
    }
  }

  &-popup {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    text-align: center;
    background-color: rgba(255, 255, 255, .95);
    opacity: 0;
    transition: .3s;

    &:hover {
      opacity: 1;
    }
  }

  &-content {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 200px;
    text-align: center;
    transform: translateY(-60%);
    user-select: none;

    img {
      display: inline-block;
      width: 180px;
      height: 180px;
      margin-bottom: 15px;
    }

    p {
      margin: 0;
      color: #34495e;
      font-size: 16px;
      line-height: 1.5;
    }
  }
}
</style>
