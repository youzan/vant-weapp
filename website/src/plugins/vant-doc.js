import {
  Header,
  Footer,
  Content,
  Container
} from 'vant-doc'
export default {
  install (vue) {
    vue.component('doc-container', Container)
    vue.component('doc-content', Content)
    vue.component('doc-header', Header)
    vue.component('doc-footer', Footer)
  }
}
