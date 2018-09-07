import { create } from '../common/create';

create({
  relations: {
    '../badge-group/index': {
      type: 'ancestor'
    }
  },

  props: {
    info: Number,
    title: String
  },

  methods: {
    onClick() {
      const group = this.getRelationNodes('../badge-group/index')[0];
      if (group) {
        group.setActive(this);
      }
    },

    setActive(active) {
      this.setData({ active });
    }
  }
});
