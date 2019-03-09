import { VantComponent } from '../common/component';
import { touch } from '../mixins/touch';
VantComponent({
    mixins: [touch],
    props: {
        disabled: Boolean,
        useButtonSlot: Boolean,
        activeColor: String,
        inactiveColor: String,
        max: {
            type: Number,
            value: 100
        },
        min: {
            type: Number,
            value: 0
        },
        step: {
            type: Number,
            value: 1
        },
        value: {
            type: Number,
            value: 0
        },
        barHeight: {
            type: String,
            value: '2px'
        }
    },
    watch: {
        value(value) {
            this.updateValue(value, false);
        }
    },
    created() {
        this.updateValue(this.data.value);
    },
    methods: {
        onTouchStart(event) {
            if (this.data.disabled)
                return;
            this.touchStart(event);
            this.startValue = this.format(this.data.value);
        },
        onTouchMove(event) {
            if (this.data.disabled)
                return;
            this.touchMove(event);
            this.getRect('.van-slider').then(rect => {
                const diff = this.deltaX / rect.width * 100;
                this.updateValue(this.startValue + diff, false, true);
            });
        },
        onTouchEnd() {
            if (this.data.disabled)
                return;
            this.updateValue(this.data.value, true);
        },
        onClick(event) {
            if (this.data.disabled)
                return;
            this.getRect(rect => {
                const value = (event.detail.x - rect.left) / rect.width * 100;
                this.updateValue(value, true);
            });
        },
        updateValue(value, end, drag) {
            value = this.format(value);
            this.set({
                value,
                barStyle: `width: ${value}%; height: ${this.data.barHeight};`
            });
            if (drag) {
                this.$emit('drag', { value });
            }
            if (end) {
                this.$emit('change', value);
            }
        },
        format(value) {
            const { max, min, step } = this.data;
            return Math.round(Math.max(min, Math.min(value, max)) / step) * step;
        }
    }
});
