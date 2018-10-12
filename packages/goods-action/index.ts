import { VantComponent } from '../common/component';

VantComponent({
  classes: [
    'icon-class'
  ],

  props: {
    btnList: Array
  },

  methods: {
    onClick(event: Weapp.Event) {
      const { bindClickEventName } = event.detail;
      if (bindClickEventName) {
        this.$emit('click', event.detail);
      }
    }
  }
});
