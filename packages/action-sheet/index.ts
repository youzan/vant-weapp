import { VantComponent } from '../common/component';
import { safeArea } from '../mixins/safe-area';
import { Weapp } from 'definitions/weapp';

VantComponent({
  mixins: [safeArea()],

  props: {
    show: Boolean,
    title: String,
    cancelText: String,
    zIndex: {
      type: Number,
      value: 100
    },
    actions: {
      type: Array,
      value: []
    },
    overlay: {
      type: Boolean,
      value: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      value: true
    },
    closeOnClickAction: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    onSelect(event: Weapp.Event) {
      const { index } = event.currentTarget.dataset;
      const item = this.data.actions[index];
      if (item && !item.disabled && !item.loading) {
        this.$emit('select', item);
        if (this.data.closeOnClickAction) {
          this.onCancel();
        }
      }
    },

    onCancel() {
      this.$emit('cancel');
    },

    onClose() {
      this.$emit('close');
    }
  }
});
