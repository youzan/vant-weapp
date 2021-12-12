import { VantComponent } from '../../common/component';
import Notify from '../../notify/notify';

VantComponent({
  methods: {
    onChange(event) {
      Notify({
        context: this,
        type: 'primary',
        message: `切换至第${event.detail}项`,
      });
    },
  },
});
