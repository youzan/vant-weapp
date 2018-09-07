import { create } from '../common/create';

create({
  props: {
    show: Boolean,
    mask: Boolean,
    customStyle: String,
    zIndex: {
      type: Number,
      value: 1
    }
  },

  methods: {
    onClick() {
      this.$emit('click');
    }
  }
});
