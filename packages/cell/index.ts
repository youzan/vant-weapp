import { link } from '../mixins/link';
import { VantComponent } from '../common/component';
import { Weapp } from 'definitions/weapp';

VantComponent({
  classes: [
    'title-class',
    'label-class',
    'value-class',
    'right-icon-class',
    'hover-class',
  ],

  mixins: [link],

  props: {
    title: null,
    value: null,
    icon: String,
    size: String,
    label: String,
    center: Boolean,
    isLink: Boolean,
    required: Boolean,
    clickable: Boolean,
    titleWidth: {
      type: String,
      observer(value: string) {
        this.setData({
          titleStyle: this.makeTitleStyle(value, this.data.spacing),
        });
      },
    },
    customStyle: String,
    arrowDirection: {
      type: String,
      observer(value: string) {
        this.setData({
          rightIconName: this.makeRightIconName(value),
        });
      },
    },
    useLabelSlot: Boolean,
    border: {
      type: Boolean,
      value: true,
    },
    spacing: {
      type: String,
      observer(value: string) {
        this.setData({
          titleStyle: this.makeTitleStyle(this.data.titleWidth, value),
        });
      },
    },
  },

  data: {
    rightIconName: 'arrow',
    titleStyle: '',
  },

  mounted() {
    const { arrowDirection, titleWidth, spacing } = this.data;
    this.setData({
      rightIconName: this.makeRightIconName(arrowDirection),
      titleStyle: this.makeTitleStyle(titleWidth, spacing),
    });
  },

  methods: {
    onClick(event: Weapp.Event) {
      this.$emit('click', event.detail);
      this.jumpLink();
    },
    makeRightIconName(arrowDirection) {
      return arrowDirection ? `arrow-${arrowDirection}` : 'arrow';
    },
    makeTitleStyle(titleWidth, spacing) {
      let titleStyle = '';
      if (titleWidth) {
        titleStyle += `max-width: ${titleWidth}; min-width: ${titleWidth}; `;
      }
      if (spacing) {
        titleStyle += `margin-right: ${spacing}; `;
      }
      return titleStyle;
    },
  },
});
