import { VantComponent } from '../common/component';
VantComponent({
  classes: ['bar-class', 'price-class', 'button-class'],
  props: {
    tip: null,
    type: Number,
    price: null,
    label: String,
    loading: Boolean,
    disabled: Boolean,
    buttonText: String,
    currency: {
      type: String,
      value: '¥'
    },
    buttonType: {
      type: String,
      value: 'danger'
    },
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    }
  },
  computed: {
    hasPrice: function hasPrice() {
      return typeof this.data.price === 'number';
    },
    priceStr: function priceStr() {
      return (this.data.price / 100).toFixed(2);
    },
    tipStr: function tipStr() {
      var tip = this.data.tip;
      return typeof tip === 'string' ? tip : '';
    },
    barClass: function barClass() {
      var _this$data = this.data,
          isIPhoneX = _this$data.isIPhoneX,
          safeAreaInsetBottom = _this$data.safeAreaInsetBottom;
      return this.classNames('van-submit-bar__bar', 'bar-class', {
        'van-submit-bar__bar--safe': safeAreaInsetBottom && isIPhoneX
      });
    }
  },
  methods: {
    onSubmit: function onSubmit(event) {
      this.$emit('submit', event.detail);
    }
  }
});