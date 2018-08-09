'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Component({
  externalClasses: ['custom-class'],

  properties: {
    icon: String,
    steps: {
      type: Array,
      observer: function observer() {
        this.formatSteps();
      }
    },
    active: {
      type: Number,
      observer: function observer() {
        this.formatSteps();
      }
    },
    direction: {
      type: String,
      value: 'horizontal'
    },
    activeColor: {
      type: String,
      value: '#06bf04'
    }
  },

  attached: function attached() {
    this.formatSteps();
  },


  methods: {
    formatSteps: function formatSteps() {
      var _this = this;

      var steps = this.data.steps;

      var formattedSteps = steps.map(function (step, index) {
        return _extends({}, step, {
          status: _this.getStatus(index)
        });
      });

      this.setData({
        formattedSteps: formattedSteps
      });
    },
    getStatus: function getStatus(index) {
      var active = this.data.active;


      if (index < active) {
        return 'finish';
      } else if (index === active) {
        return 'process';
      }

      return '';
    }
  }
});