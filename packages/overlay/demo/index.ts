import { VantComponent } from '../../common/component';

VantComponent({
  data: {
    show: false,
    showEmbedded: false,
  },

  methods: {
    onClickShow() {
      this.setData({ show: true });
    },

    onClickHide() {
      this.setData({ show: false });
    },

    onClickShowEmbedded() {
      this.setData({ showEmbedded: true });
    },

    onClickHideEmbedded() {
      this.setData({ showEmbedded: false });
    },

    noop() {},
  },
});
