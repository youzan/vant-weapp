<template>
  <div>
    <img :src="image">
  </div>
</template>

<script>
const PREFIX = 'https://img.yzcdn.cn/vant-weapp/';
const MAP = {
  index: 'index-201808090730.png',
  actionsheet: 'actionsheet-201808092138.jpeg',
  badge: 'badge-201808092138.png',
  button: 'button-201808092138.png',
  card: 'card-201808092138.png',
  field: 'field-201808092138.png',
  cell: 'cell-201808092138.png',
  icon: 'icon-201808092138.png',
  col: 'layout-201808092138.png',
  loading: 'loading-201808092138.png',
  'notice-bar': 'notice-bar-201808092138.png',
  popup: 'popup-201808092138.png',
  panel: 'panel-201808092138.png',
  stepper: 'stepper-201808092138.png',
  search: 'search-201808092138.png',
  steps: 'steps-201808092138.png',
  switch: 'switch-201808092138.png',
  tag: 'tag-201808092138.png',
  'tree-select': 'tree-select-201808092138.png'
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
      console.log('currentPage', this.currentPage);
    };
  }
};
</script>

<style>
body {
  margin: 0;
  color: #333;
  line-height: 1;
  background-color: #f8f8f8;
  font-family: 'PingFang SC', Helvetica, 'STHeiti STXihei', 'Microsoft YaHei',
    Tohoma, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}

img {
  width: 100%;
  display: block;
  margin-top: -62px;
}
</style>
