<template>
  <div>
    <img :src="image">
  </div>
</template>

<script>
const PREFIX = 'https://img.yzcdn.cn/vant-weapp/';
const MAP = {
  index: 'index-201808090730.png'
};

export default {
  computed: {
    image() {
      return PREFIX + MAP.index;
    }
  }
};
</script>

<style>
body {
  margin: 0;
  color: #333;
  line-height: 1;
  background-color: #f8f8f8;
  font-family: 'PingFang SC', Helvetica, 'STHeiti STXihei', 'Microsoft YaHei', Tohoma, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}

img {
  width: 100%;
  display: block;
  margin-top: -62px;
}
</style>
