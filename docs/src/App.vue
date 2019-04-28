<template>
  <van-doc
    active="小程序组件"
    :config="config"
    :simulator="simulator"
  >
    <router-view />
  </van-doc>
</template>

<script>
import docConfig from './doc.config';

const UNSHARED = [
  'common',
  'quickstart',
  'changelog',
  'intro',
  'transition'
];

const MAPPER = {
  'action-sheet': 'actionsheet'
};

export default {
  computed: {
    config() {
      return docConfig;
    },

    simulator() {
      let { path } = this.$route.meta;

      if (!UNSHARED.includes(path)) {
        if (MAPPER[path]) {
          path = MAPPER[path];
        }

        return `https://youzan.github.io/vant/mobile.html?hide_nav=1&weapp=1#/zh-CN/${path}`;
      }

      return `./preview.html#${path}`;
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
