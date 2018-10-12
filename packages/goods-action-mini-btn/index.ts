import { VantComponent } from '../common/component';

VantComponent({
  classes: [
    'icon-class'
  ],

  props: {
    url: String,
    text: String,
    info: String,
    icon: String,
    bindClickEventName: String,
    replace: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    onClick(event: Weapp.Event) {
      const { bindClickEventName } = this.data;
      this.$emit('click', {...event.detail, bindClickEventName});
    }
  }
});
