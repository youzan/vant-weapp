import { VantComponent } from '../common/component';

VantComponent({
  data: {
    show: false,
    type: 'text',
    mask: false,
    message: '',
    zIndex: 1000,
    position: 'middle',
    forbidClick: false,
    loadingType: 'circular',
  },
  methods: {
    // for prevent touchmove
    noop() {},
  },
});
