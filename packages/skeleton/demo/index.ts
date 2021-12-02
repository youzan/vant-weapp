import { VantComponent } from '../../common/component';

VantComponent({
  data: {
    show: false,
  },

  methods: {
    onChange({ detail }) {
      this.setData({ show: detail });
    },
  },
});
