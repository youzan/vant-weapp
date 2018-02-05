<template>
  <aside class="side-menus" v-if="menus.length">
    <menu-item :menu="menu" v-for="menu in menus" :key="menu.path"></menu-item>
  </aside>
</template>

<script>
import MenuItem from './MenuItem'
export default {
  name: 'SideMneu',
  props: ['menus'],
  components: {MenuItem}
}
</script>

<style scoped>
  .side-menus {
    padding: 15px;
    width: 200px;
    padding: 20px 0;
    min-width: 240px;
    max-width: 240px;
  }

  .side-menus .side-menus {
    padding-left: 15px;
  }
</style>
