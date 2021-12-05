import { VantComponent } from '../../common/component';
import Toast from '../../toast/toast';

VantComponent({
  methods: {
    onClickButton() {
      Toast({
        context: this,
        message: '点击按钮',
      });
    },
    onClickLink() {
      Toast({
        context: this,
        message: '修改地址',
      });
    },
  },
});
