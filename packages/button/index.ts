import { VantComponent } from '../common/component';
import { button } from '../mixins/button';
import { openType } from '../mixins/open-type';

VantComponent({
  mixins: [button, openType],

  classes: ['hover-class', 'loading-class'],

  props: {
    plain: Boolean,
    block: Boolean,
    round: Boolean,
    square: Boolean,
    loading: Boolean,
    hairline: Boolean,
    disabled: Boolean,
    loadingText: String,
    vanBtnStyle: Object,
    type: {
      type: String,
      value: 'default'
    },
    size: {
      type: String,
      value: 'normal'
    },
    loadingSize: {
      type: String,
      value: '20px'
    }
  },

  data: {
    btnStyle: ''
  },

  watch: {
    vanBtnStyle(value) {
      if (!value) {
        return ''
      }
      let btnStyle = ''
      for (let i in value) {
        btnStyle += i.replace(/([A-Z])/g, "-$1").toLowerCase() + ':' + value[i] + ';'
      }
      this.set({
        btnStyle
      })
    }
  },

  methods: {
    onClick() {
      if (!this.data.disabled && !this.data.loading) {
        this.$emit('click');
      }
    }
  }
});
