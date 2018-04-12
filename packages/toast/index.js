const DEFAULT_DATA = {
  show: false,
  message: '',
  icon: '',
  image: '',
  mask: false
};

const SUPPORT_TYPE = ['loading', 'success', 'fail'];

Component({
  data: {
    ...DEFAULT_DATA
  },

  methods: {
    show(options) {
      const toastOptions = { ...options };

      let icon = options.icon || '';
      let image = options.image || '';
      if (SUPPORT_TYPE.indexOf(options.type) > -1) {
        icon = options.type;
        image = '';
      }

      this.setData({
        ...toastOptions,
        icon,
        image
      });
    },

    clear() {
      this.setData({
        ...DEFAULT_DATA
      });
    }
  }
});
