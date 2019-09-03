import { VantComponent } from '../common/component';

VantComponent({
  props: {
    info: null,
    size: String,
    color: String,
    customStyle: String,
    classPrefix: {
      type: String,
      value: 'van-icon'
    },
    name: {
      type: String,
      observer(val) {
        this.setData({
          isImageName: val.indexOf('/') !== -1
        });
      }
    }
  },

  methods: {
    onClick() {
      this.$emit('click');
    }
  }
});
