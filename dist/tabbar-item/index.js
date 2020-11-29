import { VantComponent } from '../common/component';
VantComponent({
  props: {
    info: null,
    name: null,
    icon: String,
    dot: Boolean,
    iconPrefix: {
      type: String,
      value: 'van-icon',
    },
  },
  relation: {
    name: 'tabbar',
    type: 'ancestor',
    current: 'tabbar-item',
  },
  data: {
    active: false,
  },
  methods: {
    onClick() {
      const { parent } = this;
      if (parent) {
        const index = parent.children.indexOf(this);
        const active = this.data.name || index;
        if (active !== this.data.active) {
          parent.$emit('change', active);
        }
      }
      this.$emit('click');
    },
    updateFromParent() {
      const { parent } = this;
      if (!parent) {
        return;
      }
      const index = parent.children.indexOf(this);
      const parentData = parent.data;
      const { data } = this;
      const active = (data.name || index) === parentData.active;
      const patch = {};
      if (active !== data.active) {
        patch.active = active;
      }
      if (parentData.activeColor !== data.activeColor) {
        patch.activeColor = parentData.activeColor;
      }
      if (parentData.inactiveColor !== data.inactiveColor) {
        patch.inactiveColor = parentData.inactiveColor;
      }
      if (Object.keys(patch).length > 0) {
        this.setData(patch);
      }
    },
  },
});
