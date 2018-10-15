import { link } from '../mixins/link';
import { VantComponent } from '../common/component';
VantComponent({
  mixins: [link],
  props: {
    text: String,
    info: String,
    icon: String
  },
  methods: {
    onClick: function onClick(event) {
      this.$emit('click', event.detail);
      this.jumpLink();
    }
  }
});