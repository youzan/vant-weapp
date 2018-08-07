'use strict';

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
        return Object.assign({}, step, {
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