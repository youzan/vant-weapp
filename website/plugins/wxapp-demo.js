import WxappDemo from './components/WxappPage'
import './styles/main.css'
export default {
  install (vue) {
    vue.component('wxapp-demo', WxappDemo)
  }
}
