import { VantComponent } from '../common/component';

VantComponent({
  props: {
    row: {
      type: Number,
      value: 0
    },
    title: {
      type: Boolean,
      value: false
    },
    avatar: {
      type: Boolean,
      value: false
    },
    loading: {
      type: Boolean,
      value: true
    },
    animate: {
      type: Boolean,
      value: true
    },
    avatarSize: {
      type: String,
      value: '32px'
    },
    avatarShape: {
      type: String,
      value: 'round'
    },
    titleWidth: {
      type: String,
      value: '40%'
    },
    rowWidth: {
      type: Array || String,
      value: '100%',
      observer(val) {
        this.setData({ isArray: val instanceof Array });
      }
    }
  },

  data: {
    isArray: false
  }
});
