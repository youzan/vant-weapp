import { isSrc } from '../common/utils';
import { VantComponent } from '../common/component';

VantComponent({
  props: {
    info: null,
    name: String,
    size: String,
    color: String,
    customStyle: String,
    classPrefix: {
      type: String,
      value: 'van-icon'
    }
  },

  computed: {
    isSrc() {
      return isSrc(this.data.name);
    }
  },

  methods: {
    onClick() {
      this.$emit('click');
    }
  }
});
