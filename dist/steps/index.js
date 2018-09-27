import { VantComponent } from '../common/component';
VantComponent({
  props: {
    icon: String,
    steps: Array,
    active: Number,
    direction: {
      type: String,
      value: 'horizontal'
    },
    activeColor: {
      type: String,
      value: '#06bf04'
    }
  },
  watch: {
    steps: 'formatSteps',
    active: 'formatSteps'
  },
  created: function created() {
    this.formatSteps();
  },
  methods: {
    formatSteps: function formatSteps() {
      var _this = this;

      var steps = this.data.steps;
      steps.forEach(function (step, index) {
        step.status = _this.getStatus(index);
      });
      this.setData({
        steps: steps
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