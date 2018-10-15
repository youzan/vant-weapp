import { VantComponent } from '../common/component';
VantComponent({
  props: {
    info: null,
    icon: String,
    dot: Boolean
  },
  relation: {
    name: 'tabbar',
    type: 'ancestor'
  },
  data: {
    active: false
  },
  methods: {
    onClick: function onClick() {
      var parent = this.getRelationNodes('../tabbar/index')[0];

      if (parent) {
        parent.onChange(this);
      }

      this.$emit('click');
    },
    setActive: function setActive(active) {
      if (this.data.active !== active) {
        this.setData({
          active: active
        });
      }
    }
  }
});