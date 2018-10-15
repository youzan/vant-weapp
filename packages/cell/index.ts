import { link } from '../mixins/link';
import { VantComponent } from '../common/component';

VantComponent({
  classes: [
    'title-class',
    'label-class',
    'value-class'
  ],

  mixins: [link],

  props: {
    title: null,
    value: null,
    icon: String,
    label: String,
    center: Boolean,
    isLink: Boolean,
    required: Boolean,
    clickable: Boolean,
    titleWidth: String,
    customStyle: String,
    border: {
      type: Boolean,
      value: true
    }
  },

  computed: {
    cellClass(): string {
      const { data } = this;
      return this.classNames('custom-class', 'van-cell', {
        'van-cell--center': data.center,
        'van-cell--required': data.required,
        'van-cell--borderless': !data.border,
        'van-cell--clickable': data.isLink || data.clickable
      });
    },

    titleStyle(): string {
      const { titleWidth } = this.data;
      return titleWidth ? `max-width: ${titleWidth};min-width: ${titleWidth}` : '';
    }
  },

  methods: {
    onClick(event: Weapp.Event) {
      this.$emit('click', event.detail);
      this.jumpLink();
    }
  }
});
