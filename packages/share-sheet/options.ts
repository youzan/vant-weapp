import { VantComponent } from '../common/component';

VantComponent({
  props: {
    options: Array,
    showBorder: Boolean,
  },

  methods: {
    onSelect(event) {
      const { index } = event.currentTarget.dataset;
      const option = this.data.options[index];
      this.$emit('select', { ...option, index });
    },
  },
});
