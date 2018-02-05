<template>
  <div class="demo" :class="activeCodeType">
    <h3 v-if="types.length">示例代码</h3>
    <div class="demo-view-qrcode">
      <img src="https://camo.githubusercontent.com/b3e6c0c62d421ef5df9d7e9b8366e6287c0464b7/68747470733a2f2f696d672e797a63646e2e636e2f7075626c69635f66696c65732f323031372f31302f33302f35353464643934306562316132363964346163393133336537386165333231662e6a70673f696d61676556696577322f322f772f3330302f682f333030" />
      <div>微信扫一扫</div>
    </div>
    <!-- <div class="code-type-tabs">
      <div class="code-type-tab" @click="activeCodeType = $type" v-for="$type in types" :key="$type">
        {{$type}}
      </div>
    </div> -->
    <div class="demo-code">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['demoTypes'],
  data () {
    return {
      types: [],
      activeCodeType: ''
    }
  },
  created () {
    this.types = this.demoTypes ? this.demoTypes.split(',') : []
    this.activeCodeType = this.types ? this.types[0] : ''
  }
}
</script>
<style scoped>
code.language-wxml::after {
  content: 'WXML';
}

code.language-js::after {
  content: 'JS';
}

code.language-wxss::after {
  content: 'WXSS';
}

code.language-json::after {
  content: 'JSON';
}
/* .demo {
  margin-top: 15px;
}
.demo-code {
  height: 500px;
  overflow: auto;
  background-color: #f5f7fa;
}
.code-type-tabs {
  display: flex;
  justify-content: center;
  text-align: center;
}
.code-type-tab {
  flex: 1;
}
.language-js, .language-wxml, .language-wxss, .language-json {
  display: none;
}
.js .language-js {
  display: block;
}
.json .language-json {
  display: block;
}
.wxml .language-wxml {
  display: block;
}
.wxss .language-wxss {
  display: block;
}
pre + pre {
  margin-top: 0;
} */
</style>
