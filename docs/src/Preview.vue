<template>
  <div>
    <img class="preview-image" :src="image">
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
  index: 'index-201808121630.png',
  'action-sheet': 'action-sheet-201809071648.png',
  area: 'area-20181015.png',
  badge: 'badge-201808092138.png',
  button: 'button-20181015.png',
  card: 'card-201808092138.png',
  col: 'layout-201808092138.png',
  cell: 'cell-201808092138.png',
  dialog: 'dialog-201809071648.png',
  field: 'field-201808092138.png',
  'goods-action': 'goods-action-20181015.png',
  icon: 'icon-201808092138.png',
  loading: 'loading-201808092138.png',
  'nav-bar': 'nav-bar-201808110751.png',
  'notice-bar': 'notice-bar-20181015.png',
  notify: 'notify-201808112050.png',
  panel: 'panel-201808092138.png',
  popup: 'popup-201808092138.png',
  progress: 'progress-201808232055.png',
  radio: 'radio_201809271357.png',
  slider: 'slider-201808221024.png',
  stepper: 'stepper-201808092138.png',
  search: 'search-201808092138.png',
  steps: 'steps-20181015.png',
  switch: 'switch-201808092138.png',
  'switch-cell': 'switch-cell-201808221124.png',
  'submit-bar': 'submit-bar-a-201809271357.png',
  tab: 'tab-20181015.png',
  tag: 'tag-201808092138.png',
  tabbar: 'tabbar-201808160922.png',
  toast: 'toast-201808191046.png',
  transition: 'transition-20180821.png',
  'tree-select': 'tree-select-201808092138.png',
  checkbox: 'checkbox-20180928-1.png'
};

export default {
  data() {
    return {
      currentPage: null
    };
  },

  computed: {
    image() {
      if (this.currentPage === null) {
        return '';
      }
      return PREFIX + (MAP[this.currentPage] || MAP.index);
    }
  },

  created() {
    window.switchImage = path => {
      path = path.replace('/', '');
      this.currentPage = path;
    };
  }
};
</script>

<style lang="less">
body {
  margin: 0;
  color: #333;
  line-height: 1;
  background-color: #f8f8f8;
  font-family: 'PingFang SC', Helvetica, 'STHeiti STXihei', 'Microsoft YaHei',
    Tohoma, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.preview {
  &-image {
    width: 100%;
    display: block;
    margin-top: -62px;
  }

  &-popup {
    opacity: 0;
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, .95);
    transition: .3s;
    text-align: center;

    &:hover {
      opacity: 1;
    }
  }

  &-content {
    left: 0;
    top: 50%;
    width: 100%;
    height: 200px;
    position: absolute;
    text-align: center;
    transform: translateY(-60%);
    user-select: none;

    img {
      width: 180px;
      height: 180px;
      margin-bottom: 15px;
      display: inline-block;
    }

    p {
      margin: 0;
      color: #34495e;
      line-height: 1.5;
      font-size: 16px;
    }
  }
}
</style>
