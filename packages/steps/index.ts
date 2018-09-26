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

  created() {
    this.formatSteps();
  },

  methods: {
    formatSteps() {
      const { steps } = this.data;
      steps.forEach((step, index) => {
        step.status = this.getStatus(index);
      });
      this.setData({ steps });
    },

    getStatus(index) {
      const { active } = this.data;

      if (index < active) {
        return 'finish';
      } else if (index === active) {
        return 'process';
      }

      return '';
    }
  }
});
