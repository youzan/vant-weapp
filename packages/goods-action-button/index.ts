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
      const index = children.indexOf(this);

      this.setData({
        isFirst: index === 0,
        isLast: index === children.length - 1
      });
    }
  }
});
