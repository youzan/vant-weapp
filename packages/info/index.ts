import { VantComponent } from '../common/component';

VantComponent({
  props: {
    dot: {
      type: Boolean,
      observer: 'updateShow',
    },
    info: {
      type: null,
      observer: 'updateShow',
    },
    customStyle: String
  },
  data: {
    show: false,
  },
  methods: {
    updateShow() {
      const { info, dot } = this.data;
      this.setData({
        show: (info !== null && info !== '') || dot,
      });
    }
  },
});
