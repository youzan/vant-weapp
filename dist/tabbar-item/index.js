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
    active: false,
    count: 0
  },
  methods: {
    onClick: function onClick() {
      var parent = this.getRelationNodes('../tabbar/index')[0];

      if (parent) {
        parent.onChange(this);
      }

      this.$emit('click');
    },
    setActive: function setActive(data) {
      var _this$data = this.data,
          active = _this$data.active,
          count = _this$data.count;

      if (active !== data.active || count !== data.count) {
        this.setData(data);
      }
    }
  }
});