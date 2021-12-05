import { VantComponent } from '../../common/component';

VantComponent({
  data: {
    show: {
      success: true,
      primary: true,
    },
  },

  methods: {
    onClose(event) {
      this.setData({
        [`show.${event.target.id}`]: false,
      });
    },
  },
});
