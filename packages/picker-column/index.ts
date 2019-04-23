import { VantComponent } from '../common/component';
import { isObj, range } from '../common/utils';

function isDisabled(option: any) {
  return isObj(option) && option.disabled;
}

function getOptionText(option: any, valueKey: string) {
  return isObj(option) && valueKey in option ? option[valueKey] : option;
}

VantComponent({
  classes: ['active-class'],

  props: {
    valueKey: String,
    className: String,
    itemHeight: Number,
    visibleItemCount: Number,
    initialOptions: {
      type: Array,
      value: []
    },
    defaultIndex: {
      type: Number,
      value: 0,
      observer(value) {
        this.setIndex(value);
      }
    }
  },

  data: {
    offset: 0,
    options: [],
    currentIndex: 0,
    animation: false
  },

  created() {
    const { defaultIndex, initialOptions } = this.data;

    this.set({
      currentIndex: defaultIndex,
      options: initialOptions
    }).then(() => this.setIndex(defaultIndex));
  },

  methods: {
    onChange(event: Weapp.Event) {
      if (!event.detail.source) {
        return;
      }

      this.offset = event.detail.y;
    },

    onTouchStart() {
      // open animate at first touch
      if (!this.data.animation) {
        this.set({ animation: true });
      }
    },

    onTouchEnd() {
      const { options = [], itemHeight, offset } = this.data;

      if (this.offset === offset) {
        return;
      }

      const index = range(
        Math.round(-this.offset / itemHeight),
        0,
        options.length - 1
      );
      this.setIndex(index, true);
    },

    onClickItem(event: Weapp.Event) {
      const { index } = event.currentTarget.dataset;
      this.setIndex(index, true);
    },

    adjustIndex(index: number) {
      const { options = [] } = this.data;
      const count = options.length;
      index = range(index, 0, count);

      for (let i = index; i < count; i++) {
        if (!isDisabled(options[i])) return i;
      }
      for (let i = index - 1; i >= 0; i--) {
        if (!isDisabled(options[i])) return i;
      }
      return 0;
    },

    setIndex(index: number, userAction: boolean) {
      const { itemHeight, currentIndex } = this.data;
      index = this.adjustIndex(index);
      const offset = -index * itemHeight;

      this.offset = offset;

      if (index !== currentIndex) {
        return this.set({ offset, currentIndex: index }).then(() => {
          userAction && this.$emit('change', index);
        });
      } else {
        return this.set({ offset });
      }
    },

    setValue(value: string) {
      const { options = [], valueKey } = this.data;

      const index = options.findIndex(
        (item: any) => getOptionText(item, valueKey) === value
      );
      return index !== -1 ? this.setIndex(index) : Promise.resolve();
    },

    getValue() {
      const { options = [], currentIndex } = this.data;
      return options[currentIndex];
    }
  }
});
