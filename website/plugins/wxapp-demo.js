import WxappDemo from './components/WxappPage'; // eslint-disable-line
import './styles/main.css';

export default {
  install(vue) {
    vue.component('wxapp-demo', WxappDemo);
  }
};
