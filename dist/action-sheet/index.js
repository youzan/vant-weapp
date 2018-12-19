import { VantComponent } from '../common/component';
import { iphonex } from '../mixins/iphonex';
VantComponent({
  mixins: [iphonex],
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
    }
  },
  methods: {
    onSelect: function onSelect(event) {
      var index = event.currentTarget.dataset.index;
      var item = this.data.actions[index];

      if (item && !item.disabled && !item.loading) {
        this.$emit('select', item);
      }
    },
    onCancel: function onCancel() {
      this.$emit('cancel');
    },
    onClose: function onClose() {
      this.$emit('close');
    }
  }
});