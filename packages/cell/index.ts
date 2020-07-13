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
          titleViewStyle: this.makeTitleStyle(this.data.titleStyle, value),
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
    titleStyle: {
      type: String,
      observer(value: string) {
        this.setData({
          titleViewStyle: this.makeTitleStyle(value, this.data.titleWidth),
        });
      },
    },
  },

  data: {
    rightIconName: 'arrow',
    titleViewStyle: '',
  },

  mounted() {
    const { arrowDirection, titleStyle, titleWidth } = this.data;
    this.setData({
      rightIconName: this.makeRightIconName(arrowDirection),
      titleViewStyle: this.makeTitleStyle(titleStyle, titleWidth),
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
    makeTitleStyle(titleStyle, titleWidth) {
      let titleViewStyle = '';
      // titleStyle 与 titleWidth 互斥，titleStyle 优先级更高
      if (titleStyle) {
        titleViewStyle = titleStyle;
      } else if (titleWidth) {
        titleViewStyle += `max-width: ${titleWidth}; min-width: ${titleWidth}; `;
      }
      return titleViewStyle;
    },
  },
});
