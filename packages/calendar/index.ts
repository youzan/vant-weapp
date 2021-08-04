import { VantComponent } from '../common/component';
import {
  ROW_HEIGHT,
  getPrevDay,
  getNextDay,
  getToday,
  compareDay,
  copyDates,
  calcDateNum,
  formatMonthTitle,
  compareMonth,
  getMonths,
  getDayByOffset,
} from './utils';

import Toast from '../toast/toast';
import { requestAnimationFrame } from '../common/utils';

const initialMinDate = getToday().getTime();
const initialMaxDate = (() => {
  const now = getToday();
  return new Date(
    now.getFullYear(),
    now.getMonth() + 6,
    now.getDate()
  ).getTime();
})();

VantComponent({
  props: {
    title: {
      type: String,
      value: '日期选择',
    },
    color: String,
    show: {
      type: Boolean,
      observer(val) {
        if (val) {
          this.initRect();
          this.scrollIntoView();
        }
      },
    },
    formatter: null,
    confirmText: {
      type: String,
      value: '确定',
    },
    rangePrompt: String,
    showRangePrompt: {
      type: Boolean,
      value: true,
    },
    defaultDate: {
      type: null,
      observer(val) {
        this.setData({ currentDate: val });
        this.scrollIntoView();
      },
    },
    allowSameDay: Boolean,
    confirmDisabledText: String,
    type: {
      type: String,
      value: 'single',
      observer: 'reset',
    },
    minDate: {
      type: null,
      value: initialMinDate,
    },
    maxDate: {
      type: null,
      value: initialMaxDate,
    },
    position: {
      type: String,
      value: 'bottom',
    },
    rowHeight: {
      type: null,
      value: ROW_HEIGHT,
    },
    round: {
      type: Boolean,
      value: true,
    },
    poppable: {
      type: Boolean,
      value: true,
    },
    showMark: {
      type: Boolean,
      value: true,
    },
    showTitle: {
      type: Boolean,
      value: true,
    },
    showConfirm: {
      type: Boolean,
      value: true,
    },
    showSubtitle: {
      type: Boolean,
      value: true,
    },
    safeAreaInsetBottom: {
      type: Boolean,
      value: true,
    },
    closeOnClickOverlay: {
      type: Boolean,
      value: true,
    },
    maxRange: {
      type: null,
      value: null,
    },
    firstDayOfWeek: {
      type: Number,
      value: 0,
    },
  },

  data: {
    subtitle: '',
    currentDate: null as any,
    scrollIntoView: '',
  },

  created() {
    this.setData({
      currentDate: this.getInitialDate(),
    });
  },

  mounted() {
    if (this.data.show || !this.data.poppable) {
      this.initRect();
      this.scrollIntoView();
    }
  },

  methods: {
    reset() {
      this.setData({ currentDate: this.getInitialDate() });
      this.scrollIntoView();
    },

    initRect() {
      if (this.contentObserver != null) {
        this.contentObserver.disconnect();
      }

      const contentObserver = this.createIntersectionObserver({
        thresholds: [0, 0.1, 0.9, 1],
        observeAll: true,
      });

      this.contentObserver = contentObserver;

      contentObserver.relativeTo('.van-calendar__body');
      contentObserver.observe('.month', (res) => {
        if (res.boundingClientRect.top <= res.relativeRect.top) {
          // @ts-ignore
          this.setData({ subtitle: formatMonthTitle(res.dataset.date) });
        }
      });
    },

    limitDateRange(
      date: number,
      minDate: number | null = null,
      maxDate: number | null = null
    ) {
      minDate = minDate || (this.data.minDate as number);
      maxDate = maxDate || (this.data.maxDate as number);
      if (compareDay(date, minDate) === -1) {
        return minDate;
      }
      if (compareDay(date, maxDate) === 1) {
        return maxDate;
      }
      return date;
    },

    getInitialDate(defaultDate: number | number[] | null = null) {
      const { type, minDate, maxDate } = this.data;

      const now = getToday().getTime();

      if (type === 'range') {
        if (!Array.isArray(defaultDate)) {
          defaultDate = [];
        }

        const [startDay, endDay] = defaultDate || [];

        const start = this.limitDateRange(
          startDay || now,
          minDate,
          getPrevDay(maxDate).getTime()
        );
        const end = this.limitDateRange(
          endDay || now,
          getNextDay(minDate).getTime()
        );
        return [start, end];
      }

      if (type === 'multiple') {
        if (Array.isArray(defaultDate)) {
          return defaultDate.map((date) => this.limitDateRange(date));
        }

        return [this.limitDateRange(now)];
      }

      if (!defaultDate || Array.isArray(defaultDate)) {
        defaultDate = now;
      }
      return this.limitDateRange(defaultDate);
    },

    scrollIntoView() {
      requestAnimationFrame(() => {
        const {
          currentDate,
          type,
          show,
          poppable,
          minDate,
          maxDate,
        } = this.data;
        // @ts-ignore
        const targetDate = type === 'single' ? currentDate : currentDate[0];
        const displayed = show || !poppable;
        if (!targetDate || !displayed) {
          return;
        }

        const months = getMonths(minDate, maxDate);

        months.some((month, index) => {
          if (compareMonth(month, targetDate) === 0) {
            this.setData({ scrollIntoView: `month${index}` });
            return true;
          }

          return false;
        });
      });
    },

    onOpen() {
      this.$emit('open');
    },

    onOpened() {
      this.$emit('opened');
    },

    onClose() {
      this.$emit('close');
    },

    onClosed() {
      this.$emit('closed');
    },

    onClickDay(event) {
      const { date } = event.detail;
      const { type, currentDate, allowSameDay } = this.data;

      if (type === 'range') {
        // @ts-ignore
        const [startDay, endDay] = currentDate;

        if (startDay && !endDay) {
          const compareToStart = compareDay(date, startDay);

          if (compareToStart === 1) {
            this.select([startDay, date], true);
          } else if (compareToStart === -1) {
            this.select([date, null]);
          } else if (allowSameDay) {
            this.select([date, date]);
          }
        } else {
          this.select([date, null]);
        }
      } else if (type === 'multiple') {
        let selectedIndex: number;

        // @ts-ignore
        const selected = currentDate.some((dateItem: number, index: number) => {
          const equal = compareDay(dateItem, date) === 0;
          if (equal) {
            selectedIndex = index;
          }
          return equal;
        });

        if (selected) {
          // @ts-ignore
          const cancelDate = currentDate.splice(selectedIndex, 1);
          this.setData({ currentDate });
          this.unselect(cancelDate);
        } else {
          // @ts-ignore
          this.select([...currentDate, date]);
        }
      } else {
        this.select(date, true);
      }
    },

    unselect(dateArray) {
      const date = dateArray[0];
      if (date) {
        this.$emit('unselect', copyDates(date));
      }
    },

    select(date, complete?: boolean) {
      if (complete && this.data.type === 'range') {
        const valid = this.checkRange(date);

        if (!valid) {
          // auto selected to max range if showConfirm
          if (this.data.showConfirm) {
            this.emit([
              date[0],
              getDayByOffset(date[0], this.data.maxRange - 1),
            ]);
          } else {
            this.emit(date);
          }
          return;
        }
      }

      this.emit(date);

      if (complete && !this.data.showConfirm) {
        this.onConfirm();
      }
    },

    emit(date) {
      const getTime = (date: Date | number) =>
        date instanceof Date ? date.getTime() : date;

      this.setData({
        currentDate: Array.isArray(date) ? date.map(getTime) : getTime(date),
      });
      this.$emit('select', copyDates(date));
    },

    checkRange(date) {
      const { maxRange, rangePrompt, showRangePrompt } = this.data;

      if (maxRange && calcDateNum(date) > maxRange) {
        if (showRangePrompt) {
          Toast({
            duration: 0,
            context: this,
            message: rangePrompt || `选择天数不能超过 ${maxRange} 天`,
          });
        }
        this.$emit('over-range');

        return false;
      }

      return true;
    },

    onConfirm() {
      if (
        this.data.type === 'range' &&
        !this.checkRange(this.data.currentDate)
      ) {
        return;
      }
      wx.nextTick(() => {
        // @ts-ignore
        this.$emit('confirm', copyDates(this.data.currentDate));
      });
    },
  },
});
