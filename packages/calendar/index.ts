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
import { Day } from './components/month/index';

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

const getTime = (date: Date | number) =>
  date instanceof Date ? date.getTime() : date;

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
    confirmDisabledText: {
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
      value: getToday().getTime(),
      observer(val) {
        this.setData({ currentDate: val });
        this.scrollIntoView();
      },
    },
    allowSameDay: Boolean,
    type: {
      type: String,
      value: 'single',
      observer: 'reset',
    },
    minDate: {
      type: Number,
      value: initialMinDate,
    },
    maxDate: {
      type: Number,
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
    minRange: {
      type: Number,
      value: 1,
    },
    firstDayOfWeek: {
      type: Number,
      value: 0,
    },
    readonly: Boolean,
    maxSimDays: {
      type: Number,
      value: 300
    }
  },

  data: {
    subtitle: '',
    currentDate: null as any,
    scrollIntoView: '',
    monthData:[],
    monthVisibleControl: false,
    monthHideMap: {}
  },

  watch: {
    minDate() {
      this.initRect();
    },
    maxDate() {
      this.initRect();
    },
  },

  created() {
    this.setData({
      currentDate: this.getInitialDate(this.data.defaultDate),
    });
  },

  mounted() {
    if (this.data.show || !this.data.poppable) {
      this.initRect();
      this.scrollIntoView();
    }
  },

  methods: {
      scrolling (e) {
          const me = this;
          if (me.data.timer) {
              clearTimeout(me.data.timer);
          }
          me.data.timer = setTimeout(()=>{
              const {minDate, maxDate} = me.data;
              let monthData: number[] = me.data.monthData;
              if (!monthData?.length) {
                  monthData = getMonths(minDate, maxDate)
              }
              const {scrollTop, scrollHeight} = e.detail;
              //  每一行的高度。
              const cHeight = scrollHeight / (monthData.length);
              //  当前所在月
              const curMonth = Math.floor(scrollTop / cHeight);
              const monthHideMap: {[key: string]: boolean} = {};
              for (let i = Math.max(0, curMonth - 1); i < Math.min(monthData.length, curMonth+3); i++) {
                  monthHideMap[i] = true;
              }
              me.setData({
                  // @ts-ignore
                  monthData,
                  scrollTop,
                  scrollHeight,
                  cHeight,
                  monthHideMap,
              })
              clearTimeout(this.data.timer);
          }, 200)
      },

    reset() {
      this.setData({ currentDate: this.getInitialDate(this.data.defaultDate) });
      this.scrollIntoView();
    },

    initRect() {
      //     新增 当minDate MaxDate区间大于 `maxSimDays` 天时，日历面板控制总节点数量，只显示当前选中前后三个月的月份日期。
        const {minDate, maxDate, maxSimDays, cHeight, scrollTop, scrollHeight} = this.data;
        if (minDate && maxDate && Math.abs(maxDate-minDate)>maxSimDays*24*60*60*1000) {
            let monthData: number[] = this.data.monthData;
            const monthHideMap: {[key: string]: boolean} = {};
            if (!monthData?.length) {
                monthData = getMonths(minDate, maxDate)
            }
            let minLoop = 0,maxLoop = 4;
            if (scrollTop && cHeight && scrollHeight) {
                let curMonth = Math.floor(scrollTop / cHeight);
                minLoop = Math.max(0, curMonth-1);
                maxLoop = Math.min(monthData.length, curMonth+3);
            }
            for (let i = minLoop; i < maxLoop; i++) {
                monthHideMap[i] = true;
            }

            this.setData({
                // @ts-ignore
                monthData: monthData,
                monthHideMap,
                monthVisibleControl: true,
            })
        }else {
            this.setData({
                monthVisibleControl: false,
            })
        }
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
      const { type, minDate, maxDate, allowSameDay } = this.data;

      if (!defaultDate) return [];

      const now = getToday().getTime();

      if (type === 'range') {
        if (!Array.isArray(defaultDate)) {
          defaultDate = [];
        }

        const [startDay, endDay] = defaultDate || [];

        const startDate = getTime(startDay || now);
        const start = this.limitDateRange(
          startDate,
          minDate,
          allowSameDay ? startDate : getPrevDay(new Date(maxDate)).getTime()
        );

        const date = getTime(endDay || now);
        const end = this.limitDateRange(
          date,
          allowSameDay ? date : getNextDay(new Date(minDate)).getTime()
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
        const { currentDate, type, show, poppable, minDate, maxDate } =
          this.data;
        if (!currentDate) return;
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
      if (this.data.readonly) {
        return;
      }

      let { date } = event.detail;
      const { type, currentDate, allowSameDay } = this.data;

      if (type === 'range') {
        // @ts-ignore
        const [startDay, endDay] = currentDate;

        if (startDay && !endDay) {
          const compareToStart = compareDay(date, startDay);

          if (compareToStart === 1) {
            const { days } = this.selectComponent('.month').data;
            days.some((day: Day, index) => {
              const isDisabled =
                day.type === 'disabled' &&
                getTime(startDay) < getTime(day.date) &&
                getTime(day.date) < getTime(date);
              if (isDisabled) {
                ({ date } = days[index - 1]);
              }
              return isDisabled;
            });
            this.select([startDay, date], true);
          } else if (compareToStart === -1) {
            this.select([date, null]);
          } else if (allowSameDay) {
            this.select([date, date], true);
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

    onClickSubtitle(event: WechatMiniprogram.TouchEvent) {
      this.$emit('click-subtitle', event);
    },
  },
});
