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

  mounted: function() {
    this.updateStyle();
  },

  methods: {
    onClick(event: Weapp.Event) {
      this.$emit('click', event.detail);
      this.jumpLink();
    },
    updateStyle() {
      const parent = this.parent;
      const { children = [] }= parent;
      const index = children.indexOf(this);
      const length = children.length;
      let customClass = '';
      if( index === 0 ) {
        customClass += 'first';
      }
      if (index === length - 1) {
        customClass += ' last';
      }
      this.setData({  customClass });
    }
  }
});
