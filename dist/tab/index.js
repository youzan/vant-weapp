import { VantComponent } from '../common/component';
VantComponent({
  relation: {
    name: 'tabs',
    type: 'ancestor'
  },
  props: {
    title: String,
    disabled: Boolean,
    dot: Boolean,
    info: null,
    titleStyle: String
  },
  data: {
    inited: false,
    active: false,
    animated: false,
    width: null
  },
  watch: {
    title: 'update',
    disabled: 'update',
    dot: 'update',
    info: 'update',
    titleStyle: 'update'
  },
  methods: {
    update: function update() {
      var parent = this.getRelationNodes('../tabs/index')[0];

      if (parent) {
        parent.updateTabs();
      }
    }
  }
});