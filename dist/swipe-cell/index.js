import { VantComponent } from '../common/component';
import { touch } from '../mixins/touch';
const THRESHOLD = 0.3;
VantComponent({
    props: {
        disabled: Boolean,
        leftWidth: {
            type: Number,
            value: 0
        },
        rightWidth: {
            type: Number,
            value: 0
        },
        asyncClose: Boolean
    },
    mixins: [touch],
    data: {
        catchMove: true
    },
    created() {
        this.offset = 0;
    },
    methods: {
        open(position) {
            const { leftWidth, rightWidth } = this.data;
            const offset = position === 'left' ? leftWidth : -rightWidth;
            this.swipeMove(offset);
        },
        close() {
            this.swipeMove(0);
        },
        swipeMove(offset = 0) {
            this.offset = offset;
            const transform = `translate3d(${offset}px, 0, 0)`;
            const transition = this.draging
                ? 'none'
                : '.6s cubic-bezier(0.18, 0.89, 0.32, 1)';
            this.set({
                wrapperStyle: `
        -webkit-transform: ${transform};
        -webkit-transition: ${transition};
        transform: ${transform};
        transition: ${transition};
      `
            });
        },
        swipeLeaveTransition() {
            const { leftWidth, rightWidth } = this.data;
            const { offset } = this;
            if (rightWidth > 0 && -offset > rightWidth * THRESHOLD) {
                this.open('right');
            }
            else if (leftWidth > 0 && offset > leftWidth * THRESHOLD) {
                this.open('left');
            }
            else {
                this.swipeMove(0);
            }
        },
        startDrag(event) {
            if (this.data.disabled) {
                return;
            }
            this.draging = true;
            this.startOffset = this.offset;
            this.firstDirection = '';
            this.touchStart(event);
        },
        noop() { },
        onDrag(event) {
            if (this.data.disabled) {
                return;
            }
            this.touchMove(event);
            if (!this.firstDirection) {
                this.firstDirection = this.direction;
                this.set({ catchMove: this.firstDirection === 'horizontal' });
            }
            if (this.firstDirection === 'vertical') {
                return;
            }
            const { leftWidth, rightWidth } = this.data;
            const offset = this.startOffset + this.deltaX;
            if ((rightWidth > 0 && -offset > rightWidth) ||
                (leftWidth > 0 && offset > leftWidth)) {
                return;
            }
            this.swipeMove(offset);
        },
        endDrag() {
            if (this.data.disabled) {
                return;
            }
            this.draging = false;
            this.swipeLeaveTransition();
        },
        onClick(event) {
            const { key: position = 'outside' } = event.currentTarget.dataset;
            this.$emit('click', position);
            if (!this.offset) {
                return;
            }
            if (this.data.asyncClose) {
                this.$emit('close', { position, instance: this });
            }
            else {
                this.swipeMove(0);
            }
        }
    }
});
