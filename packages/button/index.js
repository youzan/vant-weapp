import buttonBehaviors from '../behaviors/button';
import classnames from '../common/classnames';

const booleanProp = {
  type: Boolean,
  observer: 'setClasses'
};

Component({
  options: {
    addGlobalClass: true
  },

  externalClasses: ['custom-class', 'loading-class'],

  behaviors: [buttonBehaviors],

  properties: {
    type: {
      type: String,
      value: 'default',
      observer: 'setClasses'
    },
    size: {
      type: String,
      value: 'normal',
      observer: 'setClasses'
    },
    plain: booleanProp,
    block: booleanProp,
    square: booleanProp,
    loading: booleanProp,
    disabled: booleanProp
  },

  attached() {
    this.setClasses();
  },

  methods: {
    onClick() {
      if (!this.data.disabled && !this.data.loading) {
        this.triggerEvent('click');
      }
    },

    setClasses() {
      const { type, size, plain, disabled, loading, square, block } = this.data;
      this.setData({
        classes: classnames(`van-button--${type}`, `van-button--${size}`, {
          'van-button--block': block,
          'van-button--plain': plain,
          'van-button--square': square,
          'van-button--loading': loading,
          'van-button--disabled': disabled,
          'van-button--unclickable': disabled || loading
        })
      });
    }
  }
});
