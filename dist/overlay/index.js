import { VantComponent } from '../common/component';
VantComponent({
  props: {
    show: Boolean,
    customStyle: String,
    duration: {
      type: Number,
      optionalTypes: [String],
      value: 300,
    },
    zIndex: {
      type: Number,
      value: 1,
    },
    lockScroll: {
      type: Boolean,
      value: true,
    },
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
    // for prevent touchmove
    noop() {},
  },
});
