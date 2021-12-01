import { VantComponent } from '../../common/component';

VantComponent({
  data: {
    show1: false,
    show2: false,
    show3: false,
    show4: false,
    show5: false,
    show6: false,
    action1: [
      { name: '选项' },
      { name: '选项' },
      { name: '选项', subname: '描述信息' },
    ],
    action2: [
      { name: '着色选项', color: '#ee0a24' },
      { loading: true },
      { name: '禁用选项', disabled: true },
    ],
    action6: [
      { name: '获取用户信息', color: '#07c160', openType: 'getUserInfo' },
    ],
  },

  methods: {
    toggle(type) {
      this.setData({
        [type]: !this.data[type],
      });
    },

    toggleActionSheet1() {
      this.toggle('show1');
    },

    toggleActionSheet2() {
      this.toggle('show2');
    },

    toggleActionSheet3() {
      this.toggle('show3');
    },

    toggleActionSheet4() {
      this.toggle('show4');
    },

    toggleActionSheet5() {
      this.toggle('show5');
    },

    toggleActionSheet6() {
      this.toggle('show6');
    },

    onGetUserInfo(e) {
      console.log(e.detail);
    },
  },
});
