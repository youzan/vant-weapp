export const touch = Behavior({
    methods: {
        touchStart(event) {
            const touch = event.touches[0];
            this.direction = '';
            this.deltaX = 0;
            this.deltaY = 0;
            this.offsetX = 0;
            this.offsetY = 0;
            this.startX = touch.clientX;
            this.startY = touch.clientY;
        },
        touchMove(event) {
            const touch = event.touches[0];
            this.deltaX = touch.clientX - this.startX;
            this.deltaY = touch.clientY - this.startY;
            this.offsetX = Math.abs(this.deltaX);
            this.offsetY = Math.abs(this.deltaY);
            this.direction =
                this.offsetX > this.offsetY
                    ? 'horizontal'
                    : this.offsetX < this.offsetY
                        ? 'vertical'
                        : '';
        }
    }
});
