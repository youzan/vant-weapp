import { VantComponent } from '../../common/component';
import Dialog from '../../dialog/dialog';

VantComponent({
  data: {
    checked: true,
    checked2: true,
  },

  methods: {
    onChange({ detail }) {
      this.setData({ checked: detail });
    },

    onChange2({ detail }) {
      Dialog.confirm({
        context: this,
        title: '提示',
        message: '是否切换开关？',
      }).then(() => {
        this.setData({ checked2: detail });
      });
    },
  },
});
