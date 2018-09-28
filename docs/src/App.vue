<template>
  <van-doc :config="config" simulator="./preview.html" active="小程序组件">
    <router-view />
  </van-doc>
</template>

<script>
import docConfig from './doc.config';

export default {
  computed: {
    config() {
      return docConfig;
    }
  }
};
</script>

<style lang="less">
.van-doc-intro {
  text-align: center;
  font-family: "Dosis", "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;

  &__youzan {
    width: 32px;
    height: 32px;
    display: block;
    margin: 25px 0 0;
  }

  &__logo {
    width: 120px;
    height: 120px;
  }

  h2 {
    font-size: 32px;
    line-height: 60px;
    font-weight: normal;
  }

  p {
    font-size: 15px;
    color: #455a64;
  }
}
</style>
