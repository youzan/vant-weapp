import { VantComponent } from '../common/component';

VantComponent({
  relation: {
    name: 'index-bar',
    type: 'ancestor',
    linked(target) {
      this.parent = target;
    },
    unlinked() {
      this.parent = null;
    }
  },

  props: {
    useSlot: Boolean,
    index: {
      type: [String, Number]
    }
  },

  data: {
    active: false,
    zIndex: 2,
    wrapperStyle: '',
    anchorStyle: ''
  },

  mounted() {
  },

  methods: {}
});
