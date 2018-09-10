import { create } from '../common/create';

create({
  props: {
    info: null,
    icon: String,
    dot: Boolean
  },

  relations: {
    '../tabbar/index': {
      type: 'ancestor'
    }
  },

  data: {
    active: false,
    count: 0
  },

  methods: {
    onClick() {
      const parent = this.getRelationNodes('../tabbar/index')[0];
      if (parent) {
        parent.onChange(this);
      }
      this.$emit('click');
    },

    setActive(data) {
      const { active, count } = this.data;
      if (active !== data.active || count !== data.count) {
        this.setData(data);
      }
    }
  }
});
