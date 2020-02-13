import { VantComponent } from '../common/component';

VantComponent({
  props: {
    dot: Boolean,
    info: null,
    size: null,
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

  data: {
    // hack baidu
    style: 'display: inline-flex;align-items: center;justify-content: center;',
  },

  methods: {
    onClick() {
      this.$emit('click');
    }
  }
});
