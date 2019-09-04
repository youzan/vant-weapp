import { VantComponent } from '../common/component';

VantComponent({
  props: {
    size: {
      type: String,
      value: '30px',
      optionalTypes: [Number]
    },

    type: {
      type: String,
      value: 'circular'
    },
    color: {
      type: String,
      value: '#c9c9c9'
    }
  }
});
