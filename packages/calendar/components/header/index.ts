import { VantComponent } from '../../../common/component';

VantComponent({
  props: {
    title: {
      type: String,
      value: '日期选择',
    },
    subtitle: String,
    showTitle: Boolean,
    showSubtitle: Boolean,
    firstDayOfWeek: {
      type: Number,
      observer: 'initWeekDay',
    },
    weekdays: {
      type: Array,
      observer(val) {
        this.initWeekDay(val);
      },
    },
  },

  data: {
    formateWeekdays: [] as Array<string>,
  },

  methods: {
    initWeekDay(val) {
      const firstDayOfWeek = this.data.firstDayOfWeek || 0;
      if (!Array.isArray(val)) {
        const defaultWeeks = ['日', '一', '二', '三', '四', '五', '六'];
        this.setData({
          formateWeekdays: [
            ...defaultWeeks.slice(firstDayOfWeek, 7),
            ...defaultWeeks.slice(0, firstDayOfWeek),
          ],
        });
      } else {
        this.setData({
          formateWeekdays: [
            ...val.slice(firstDayOfWeek, 7),
            ...val.slice(0, firstDayOfWeek),
          ],
        });
      }
    },

    onClickSubtitle(event: WechatMiniprogram.TouchEvent) {
      this.$emit('click-subtitle', event);
    },
  },
});
