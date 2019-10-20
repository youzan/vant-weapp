import { VantComponent } from '../common/component';
import { button } from '../mixins/button';
import { openType } from '../mixins/open-type';

VantComponent({
  mixins: [button, openType],

  classes: ['hover-class', 'loading-class'],

  data: {
    fitWeapp: 'aspectFit',
    FIT_MODE_MAP: {
      contain: 'aspectFit',
      cover: 'aspectFill',
      fill: 'scaleToFill',
      none: 'center',
      // 有点问题
      // 'scale-down':
    },
    loading: true,
    error: false
  },

  props: {
    src: String,
    width: String,
    height: String,
    fit: {
      type: String,
      value: 'aspectFit'
    },
    round: Boolean,
    lazyLoad: Boolean,
    useLoadingSlot: Boolean,
    useErrorSlot: Boolean,
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      const { FIT_MODE_MAP, fit } = this.data;

      this.setData({
        mode: FIT_MODE_MAP[fit]
      });
    },

    onLoad(event) {
      this.setData({
        loading: false
      });
      this.triggerEvent('load', event);
    },

    onError(event) {
      this.setData({
        loading: false,
        error: true,
      });
      this.triggerEvent('error', event);
    },

    onClick(event) {
      this.triggerEvent('click', event);
    },
  }
});
