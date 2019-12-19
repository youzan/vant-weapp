import { VantComponent } from '../common/component';
import { link } from '../mixins/link';
import { button } from '../mixins/button';
import { openType } from '../mixins/open-type';
import { Weapp } from 'definitions/weapp';

VantComponent({
  mixins: [link, button, openType],
  relation: {
    type: 'ancestor',
    name: 'goods-action',
    linked(parent) {
      this.parent = parent;
    }
  },
  props: {
    text: String,
    color: String,
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    type: {
      type: String,
      value: 'danger'
    }
  },

  mounted() {
    this.updateStyle();
  },

  methods: {
    onClick(event: Weapp.Event) {
      this.$emit('click', event.detail);
      this.jumpLink();
    },

    updateStyle() {
      const { children = [] } = this.parent;
      const { length } = children;
      const index = children.indexOf(this);
      let middle = false;
      if (length === 1) {
        middle = false;
      } else if (length === 2) {
        middle = index === 0;
      } else {
        middle = index === 0 || (index > 0 && index !== children.length - 1);
      }
      this.setData({
        isFirst: index === 0,
        isMiddle: middle,
        isLast: index === children.length - 1
      });
    }
  }
});
