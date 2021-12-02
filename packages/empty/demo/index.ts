import { VantComponent } from '../../common/component';

VantComponent({
  data: {
    activeTab: 0,
  },

  methods: {
    onChange(event) {
      this.setData({
        activeTab: event.detail.name,
      });
    },
  },
});
