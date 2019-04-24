import { VantComponent } from '../common/component';
import { RED } from '../common/color';
import { safeArea } from '../mixins/safe-area';
VantComponent({
    mixins: [safeArea()],
    props: {
        text: String,
        color: {
            type: String,
            value: '#fff'
        },
        backgroundColor: {
            type: String,
            value: RED
        },
        duration: {
            type: Number,
            value: 3000
        },
        zIndex: {
            type: Number,
            value: 110
        }
    },
    methods: {
        show() {
            const { duration } = this.data;
            clearTimeout(this.timer);
            this.set({
                show: true
            });
            if (duration > 0 && duration !== Infinity) {
                this.timer = setTimeout(() => {
                    this.hide();
                }, duration);
            }
        },
        hide() {
            clearTimeout(this.timer);
            this.set({
                show: false
            });
        }
    }
});
