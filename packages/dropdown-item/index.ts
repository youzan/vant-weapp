import { VantComponent } from '../common/component';
import { addUnit } from '../common/utils';
import { Weapp } from 'definitions/weapp';

interface ToggleOptions {
  immediate?: Boolean;
}

VantComponent({
  field: true,

  relation: {
    name: 'dropdown-menu',
    type: 'ancestor',
    linked(target) {
      this.parent = target;
    },
    unlinked() {
      this.parent = null;
    }
  },

  props: {
    value: null,
    title: String,
    disabled: Boolean,
    titleClass: String,
    options: {
      type: Array,
      value: []
    }
  },

  data: {
    transition: true,
    showPopup: false,
    showWrapper: false
  },

  mounted() {
    this.initDataFromParent();
  },

  methods: {
    initDataFromParent() {
      if (!this.parent) {
        return;
      }

      const { data } = this.parent;
      const { zIndex, offset, direction, overlay, duration, activeCxolor, closeOnClickOverlay } = data;

      let wrapperStyle = `z-index: ${zIndex};`;

      if (direction === 'down') {
        wrapperStyle += `top: ${addUnit(offset)};`;
      } else {
        wrapperStyle += `bottom: ${addUnit(offset)};`;
      }

      this.setData({ wrapperStyle, overlay, duration, activeCxolor, closeOnClickOverlay });
    },

    onClose() {
      this.$emit('close');
    },

    onOptionTap(event: Weapp.Event) {
      this.setData({ showPopup: false });
      const { option } = event.currentTarget.dataset;

      if (option.value !== this.value) {
        this.$emit('input', option.value);
        this.$emit('change', option.value);
      }
    },

    toggle(show: Boolean = !this.showPopup, options: ToggleOptions = {}) {
      if (show === this.showPopup) {
        return;
      }

      let showWrapper = this.showWrapper;

      if (show) {
        // this.parent.updateOffset();
        showWrapper = true;
      }

      this.setData({ transition: !options.immediate, showPopup: show, showWrapper });
    }
  }
});
