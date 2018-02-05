<template>
  <nav class="menu-item" :class="{active: menu.name === $route.name}">
    <router-link v-if="!menu.children" :to="{path: menu.path}">{{menu.__label || menu.name}}</router-link>
    <a class="no-href" v-if="menu.children">{{menu.__label || menu.name}}</a>
    <menu-item :menu="menu" :key="menu.path" v-for="menu in menu.children"></menu-item>
  </nav>
</template>

<script>
export default {
  name: 'menu-item',
  props: ['menu']
}
</script>

<style scoped>
  .menu-item a {
    margin: 0;
    display: block;
    color: #455a64;
    font-size: 16px;
    padding: 8px 20px;
    line-height: 24px;
    transition: all .3s;
  }
  .menu-item a.no-href {
    color: #455a64bd;
  }
  .menu-item.active {
    color: #38f;
    background-color: #f5f7fa;
  }
</style>
