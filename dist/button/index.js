import { VantComponent } from '../common/component';
import { button } from '../mixins/button';
import { openType } from '../mixins/open-type';
VantComponent({
  classes: ['loading-class'],
  mixins: [button, openType],
  props: {
    plain: Boolean,
    block: Boolean,
    round: Boolean,
    square: Boolean,
    loading: Boolean,
    disabled: Boolean,
    type: {
      type: String,
      value: 'default'
    },
    size: {
      type: String,
      value: 'normal'
    }
  },
  methods: {
    onClick: function onClick() {
      if (!this.data.disabled && !this.data.loading) {
        this.$emit('click');
      }
    }
  }
});