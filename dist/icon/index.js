import { isSrc as _isSrc } from '../common/utils';
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
    isSrc: function isSrc() {
      return _isSrc(this.data.name);
    }
  },
  methods: {
    onClick: function onClick() {
      this.$emit('click');
    }
  }
});