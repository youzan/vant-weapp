import { VantComponent } from '../common/component';
import { isSameSecond, parseFormat, parseTimeData } from './utils';

VantComponent({
  props: {
    time: {
      type: Number,
      observer: 'reset',
    },
    format: {
      type: String,
      value: 'HH:mm:ss'
    },
    useCustom: {
      type: Boolean,
      value: false,
    },
    autoStart: {
      type: Boolean,
      value: true,
    },
    millisecond: {
      type: Boolean,
      value: false,
    },
  },

  data: {
    timeData: parseTimeData(0),
    formattedTime: '0'
  },

  methods: {
    // 开始
    start() {
      if (this.counting) {
        return;
      }

      this.counting = true;
      this.endTime = Date.now() + this.remain;
      this.tick();
    },

    // 暂停
    pause() {
      this.counting = false;
      clearTimeout(this.tid);
    },

    // 重置
    reset() {
      this.pause();
      this.remain = this.data.time;
      this.setRemain(this.remain);

      if (this.data.autoStart) {
        this.start();
      }
    },

    tick() {
      if (this.data.millisecond) {
        this.microTick();
      } else {
        this.macroTick();
      }
    },

    microTick() {
      this.tid = setTimeout(() => {
        this.setRemain(this.getRemain());

        if (this.remain !== 0) {
          this.microTick();
        }
      }, 100);
    },

    macroTick() {
      this.tid = setTimeout(() => {
        const remain = this.getRemain();

        if (!isSameSecond(remain, this.remain) || remain === 0) {
          this.setRemain(remain);
        }

        if (this.remain !== 0) {
          this.macroTick();
        }
      }, 1000);
    },

    getRemain() {
      return Math.max(this.endTime - Date.now(), 0);
    },

    setRemain(remain) {
      this.remain = remain;
      const timeData = parseTimeData(remain);
      this.$emit('change', timeData);
      this.setData({
        formattedTime: parseFormat(this.data.format, timeData)
      });

      if (remain === 0) {
        this.pause();
        this.$emit('finish');
      }
    }
  }
});
