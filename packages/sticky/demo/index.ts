import { VantComponent } from '../../common/component';

VantComponent({
  data: {
    container: () => {},
    scrollTop: 0,
    offsetTop: 0,
  },

  mounted() {
    this.setData({
      container: () => this.createSelectorQuery().select('#container'),
    });
  },

  methods: {
    onScroll(event) {
      this.createSelectorQuery()
        .select('#scroller')
        .boundingClientRect((res) => {
          this.setData({
            scrollTop: event.detail.scrollTop,
            offsetTop: res.top,
          });
        })
        .exec();
    },
  },
});
