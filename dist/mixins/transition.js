import { isObj } from '../common/utils';
const getClassNames = (name) => ({
    enter: `van-${name}-enter van-${name}-enter-active enter-class enter-active-class`,
    'enter-to': `van-${name}-enter-to van-${name}-enter-active enter-to-class enter-active-class`,
    leave: `van-${name}-leave van-${name}-leave-active leave-class leave-active-class`,
    'leave-to': `van-${name}-leave-to van-${name}-leave-active leave-to-class leave-active-class`
});
const nextTick = () => new Promise(resolve => setTimeout(resolve, 1000 / 30));
export const transition = function (showDefaultValue) {
    return Behavior({
        properties: {
            customStyle: String,
            // @ts-ignore
            show: {
                type: Boolean,
                value: showDefaultValue,
                observer: 'observeShow'
            },
            // @ts-ignore
            duration: {
                type: null,
                value: 300,
                observer: 'observeDuration'
            },
            name: {
                type: String,
                value: 'fade'
            }
        },
        data: {
            type: '',
            inited: false,
            display: false
        },
        attached() {
            if (this.data.show) {
                this.enter();
            }
        },
        methods: {
            observeShow(value) {
                if (value) {
                    this.enter();
                }
                else {
                    this.leave();
                }
            },
            enter() {
                const { duration, name } = this.data;
                const classNames = getClassNames(name);
                const currentDuration = isObj(duration) ? duration.enter : duration;
                this.status = 'enter';
                Promise.resolve()
                    .then(nextTick)
                    .then(() => {
                    this.checkStatus('enter');
                    this.setData({
                        inited: true,
                        display: true,
                        classes: classNames.enter,
                        currentDuration
                    });
                })
                    .then(nextTick)
                    .then(() => {
                    this.checkStatus('enter');
                    this.setData({
                        classes: classNames['enter-to']
                    });
                })
                    .catch(() => { });
            },
            leave() {
                const { duration, name } = this.data;
                const classNames = getClassNames(name);
                const currentDuration = isObj(duration) ? duration.leave : duration;
                this.status = 'leave';
                Promise.resolve()
                    .then(nextTick)
                    .then(() => {
                    this.checkStatus('leave');
                    this.setData({
                        classes: classNames.leave,
                        currentDuration
                    });
                })
                    .then(() => setTimeout(() => this.onTransitionEnd(), currentDuration))
                    .then(nextTick)
                    .then(() => {
                    this.checkStatus('leave');
                    this.setData({
                        classes: classNames['leave-to']
                    });
                })
                    .catch(() => { });
            },
            checkStatus(status) {
                if (status !== this.status) {
                    throw new Error(`incongruent status: ${status}`);
                }
            },
            onTransitionEnd() {
                if (!this.data.show) {
                    this.set({ display: false });
                    this.$emit('transitionend');
                }
            }
        }
    });
};
