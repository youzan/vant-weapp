import { VantComponent } from '../common/component';
import { Weapp } from 'definitions/weapp';

VantComponent({
  field: true,

  props: {
    value: null,
    icon: String,
    title: String,
    label: String,
    border: Boolean,
    checked: Boolean,
    loading: Boolean,
    disabled: Boolean,
    activeColor: String,
    inactiveColor: String,
    useLabelSlot: Boolean,
    size: {
      type: String,
      value: '24px'
    },
    activeValue: {
      type: null,
      value: true
    },
    inactiveValue: {
      type: null,
      value: false
    }
  },

  watch: {
    checked(value) {
      this.set({ value });
    }
  },

  created() {
    this.set({ value: this.data.checked });
  },

  methods: {
    onChange(event: Weapp.Event) {
      this.$emit('change', event.detail);
    }
  }
});
