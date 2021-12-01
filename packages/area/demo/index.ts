import { VantComponent } from '../../common/component';
import Toast from '../../toast/toast';

const db = wx.cloud?.database();

VantComponent({
  data: {
    areaList: {},
    loading: true,
    value: 330302,
  },

  mounted() {
    db?.collection('region')
      .limit(1)
      .get()
      .then((res) => {
        if (res.data && res.data.length > 0) {
          this.setData({
            loading: false,
            areaList: res.data[0],
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setData({
          loading: false,
        });
      });
  },

  methods: {
    onChange(event) {
      const { values } = event.detail;

      Toast({
        context: this,
        message: values.map((item) => item.name).join('-'),
      });
    },

    onConfirm(event) {
      console.log(event);
    },

    onCancel(event) {
      console.log(event);
    },
  },
});
