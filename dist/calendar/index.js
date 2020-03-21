import { VantComponent } from '../common/component';
import { ROW_HEIGHT, getNextDay, compareDay, copyDates, calcDateNum, formatMonthTitle, compareMonth, getMonths } from './utils';
import Toast from '../toast/toast';
VantComponent({
    props: {
        title: {
            type: String,
            value: '日期选择'
        },
        color: String,
        show: {
            type: Boolean,
            observer(val) {
                if (val) {
                    this.initRect();
                    this.scrollIntoView();
                }
            }
        },
        formatter: null,
        confirmText: {
            type: String,
            value: '确定'
        },
        rangePrompt: String,
        defaultDate: {
            type: [Number, Array],
            observer(val) {
                this.setData({ currentDate: val });
                this.scrollIntoView();
            }
        },
        allowSameDay: Boolean,
        confirmDisabledText: String,
        type: {
            type: String,
            value: 'single',
            observer: 'reset'
        },
        minDate: {
            type: null,
            value: Date.now()
        },
        maxDate: {
            type: null,
            value: new Date(new Date().getFullYear(), new Date().getMonth() + 6, new Date().getDate()).getTime()
        },
        position: {
            type: String,
            value: 'bottom'
        },
        rowHeight: {
            type: [Number, String],
            value: ROW_HEIGHT
        },
        round: {
            type: Boolean,
            value: true
        },
        poppable: {
            type: Boolean,
            value: true
        },
        showMark: {
            type: Boolean,
            value: true
        },
        showTitle: {
            type: Boolean,
            value: true
        },
        showConfirm: {
            type: Boolean,
            value: true
        },
        showSubtitle: {
            type: Boolean,
            value: true
        },
        safeAreaInsetBottom: {
            type: Boolean,
            value: true
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: true
        },
        maxRange: {
            type: [Number, String],
            value: null
        }
    },
    data: {
        subtitle: '',
        currentDate: null,
        scrollIntoView: ''
    },
    created() {
        this.setData({
            currentDate: this.getInitialDate()
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
                observeAll: true
            });
            this.contentObserver = contentObserver;
            contentObserver.relativeTo('.van-calendar__body');
            contentObserver.observe('.month', res => {
                if (res.boundingClientRect.top <= res.relativeRect.top) {
                    // @ts-ignore
                    this.setData({ subtitle: formatMonthTitle(res.dataset.date) });
                }
            });
        },
        getInitialDate() {
            const { type, defaultDate, minDate } = this.data;
            if (type === 'range') {
                const [startDay, endDay] = defaultDate || [];
                return [
                    startDay || minDate,
                    endDay || getNextDay(new Date(minDate)).getTime()
                ];
            }
            if (type === 'multiple') {
                return [defaultDate || minDate];
            }
            return defaultDate || minDate;
        },
        scrollIntoView() {
            setTimeout(() => {
                const { currentDate, type, show, poppable, minDate, maxDate } = this.data;
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
            }, 100);
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
                const [startDay, endDay] = currentDate;
                if (startDay && !endDay) {
                    const compareToStart = compareDay(date, startDay);
                    if (compareToStart === 1) {
                        this.select([startDay, date], true);
                    }
                    else if (compareToStart === -1) {
                        this.select([date, null]);
                    }
                    else if (allowSameDay) {
                        this.select([date, date]);
                    }
                }
                else {
                    this.select([date, null]);
                }
            }
            else if (type === 'multiple') {
                let selectedIndex;
                const selected = currentDate.some((dateItem, index) => {
                    const equal = compareDay(dateItem, date) === 0;
                    if (equal) {
                        selectedIndex = index;
                    }
                    return equal;
                });
                if (selected) {
                    currentDate.splice(selectedIndex, 1);
                    this.setData({ currentDate });
                }
                else {
                    this.select([...currentDate, date]);
                }
            }
            else {
                this.select(date, true);
            }
        },
        select(date, complete) {
            const getTime = (date) => (date instanceof Date ? date.getTime() : date);
            this.setData({
                currentDate: Array.isArray(date) ? date.map(getTime) : getTime(date)
            });
            this.$emit('select', copyDates(date));
            if (complete && this.data.type === 'range') {
                const valid = this.checkRange();
                if (!valid) {
                    return;
                }
            }
            if (complete && !this.data.showConfirm) {
                this.onConfirm();
            }
        },
        checkRange() {
            const { maxRange, currentDate, rangePrompt } = this.data;
            if (maxRange && calcDateNum(currentDate) > maxRange) {
                Toast(rangePrompt || `选择天数不能超过 ${maxRange} 天`);
                return false;
            }
            return true;
        },
        onConfirm() {
            if (this.data.type === 'range' && !this.checkRange()) {
                return;
            }
            wx.nextTick(() => {
                this.$emit('confirm', copyDates(this.data.currentDate));
            });
        }
    }
});
