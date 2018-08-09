'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var DEFAULT_DATA = {
  show: false,
  message: '',
  icon: '',
  image: '',
  mask: false
};

var SUPPORT_TYPE = ['loading', 'success', 'fail'];

Component({
  data: _extends({}, DEFAULT_DATA),

  methods: {
    show: function show(options) {
      var toastOptions = _extends({}, options);

      var icon = options.icon || '';
      var image = options.image || '';
      if (SUPPORT_TYPE.indexOf(options.type) > -1) {
        icon = options.type;
        image = '';
      }

      this.setData(_extends({}, toastOptions, {
        icon: icon,
        image: image
      }));
    },
    clear: function clear() {
      this.setData(_extends({}, DEFAULT_DATA));
    }
  }
});