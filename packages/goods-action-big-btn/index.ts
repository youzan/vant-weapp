import { VantComponent } from '../common/component';

VantComponent({
  props: {
    url: String,
    text: String,
    bindClickEventName: String,
    primary: {
      type: Boolean,
      value: false
    },
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
