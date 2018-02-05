<template>
  <doc-container>
    <doc-content>
      <component :is="component"></component>
    </doc-content>
  </doc-container>
</template>
<script>
import Vue from 'vue'
export default {
  data () {
    return {
      component: null
    }
  },
  created () {
    this.hasComponent(`x-${this.$route.name}`)
  },
  watch: {
    '$route' ({name}) {
      this.hasComponent(`x-${name}`)
    }
  },
  methods: {
    hasComponent (name) {
      if (Vue.component(name)) {
        this.component = name
      }
    }
  }
}
</script>
