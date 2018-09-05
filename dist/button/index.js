import buttonBehaviors from '../behaviors/button';
import classnames from '../common/classnames';

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
    plain: {
      type: Boolean,
      observer: 'setClasses'
    },
    disabled: {
      type: Boolean,
      observer: 'setClasses'
    },
    loading: {
      type: Boolean,
      observer: 'setClasses'
    },
    block: {
      type: Boolean,
      observer: 'setClasses'
    },
    square: {
      type: Boolean,
      observer: 'setClasses'
    }
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
