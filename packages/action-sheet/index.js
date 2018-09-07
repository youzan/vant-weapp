import { create } from '../common/create';

create({
  props: {
    show: Boolean,
    title: String,
    cancelText: String,
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
    onSelect(event) {
      const { index } = event.currentTarget.dataset;
      const item = this.data.actions[index];
      if (item && !item.disabled && !item.loading) {
        this.$emit('select', item);
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
