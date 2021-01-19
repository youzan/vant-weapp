import { VantComponent } from '../common/component';
import { useParent } from '../common/relation';
import { button } from '../mixins/button';
import { link } from '../mixins/link';
import { openType } from '../mixins/open-type';
VantComponent({
  mixins: [link, button, openType],
  relation: useParent('goods-action'),
  props: {
    text: String,
    color: String,
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    type: {
      type: String,
      value: 'danger',
    },
  },
  methods: {
    onClick(event) {
      this.$emit('click', event.detail);
      this.jumpLink();
    },
    updateStyle() {
      if (this.parent == null) {
        return;
      }
      const { index } = this;
      const { children = [] } = this.parent;
      this.setData({
        isFirst: index === 0,
        isLast: index === children.length - 1,
      });
    },
  },
});
