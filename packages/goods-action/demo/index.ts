import { VantComponent } from '../../common/component';
import Toast from '../../toast/toast';

VantComponent({
  methods: {
    onClickIcon() {
      Toast({ context: this, message: '点击图标' });
    },

    onClickButton() {
      Toast({ context: this, message: '点击按钮' });
    },
  },
});
