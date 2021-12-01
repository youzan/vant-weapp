import { VantComponent } from '../../common/component';

VantComponent({
  data: {
    checkbox1: true,
    checkbox2: true,
    checkbox3: true,
    checkboxLabel: true,
    checkboxSize: true,
    checkboxShape: true,
    list: ['a', 'b', 'c'],
    result: ['a', 'b'],
    result2: [],
    result3: [],
    result4: [],
    activeIcon: 'https://img.yzcdn.cn/vant/user-active.png',
    inactiveIcon: 'https://img.yzcdn.cn/vant/user-inactive.png',
  },

  methods: {
    onChange(event) {
      const { key } = event.currentTarget.dataset;
      this.setData({ [key]: event.detail });
    },

    toggle(event) {
      const { index } = event.currentTarget.dataset;
      const checkbox = this.selectComponent(`.checkboxes-${index}`);
      checkbox.toggle();
    },

    noop() {},
  },
});
