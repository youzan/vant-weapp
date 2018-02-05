<template>
  <div id="app">
    <doc-header :config="config.header" active="移动端" />
    <section class="doc-body">
      <div class="doc-menus">
        <side-menu :menus="config.routes || []" />
      </div>
      <router-view class="doc-content" />
    </section>
     <doc-footer :config="config.footer" />
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    config () {
      return this.$root.getConfig()
    }
  }
}
</script>

<style scoped>
.doc-body {
  display: flex;
}

@media (min-width: 1024px) {
  .doc-body {
    display: flex;
    width: 1024px;
    margin: 0 auto;
  }
}
.doc-menus {
  width: 200px;
}
.doc-content {
  flex: 1;
  padding: 15px;
}
</style>
