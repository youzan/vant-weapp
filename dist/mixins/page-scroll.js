import { isFunction } from '../common/validator';
import { getCurrentPage, isDef } from '../common/utils';
function onPageScroll(event) {
    const { vanPageScroller = [] } = getCurrentPage();
    vanPageScroller.forEach((scroller) => {
        if (typeof scroller === 'function') {
            // @ts-ignore
            scroller(event);
        }
    });
}
export function pageScrollMixin(scroller) {
    return Behavior({
        attached() {
            const page = getCurrentPage();
            if (!isDef(page)) {
                return;
            }
            const _scroller = scroller.bind(this);
            const { vanPageScroller = [] } = page;
            if (isFunction(page.onPageScroll) && page.onPageScroll !== onPageScroll) {
                vanPageScroller.push(page.onPageScroll.bind(page));
            }
            vanPageScroller.push(_scroller);
            page.vanPageScroller = vanPageScroller;
            page.onPageScroll = onPageScroll;
            this._scroller = _scroller;
        },
        detached() {
            const page = getCurrentPage();
            if (!isDef(page) || !isDef(page.vanPageScroller)) {
                return;
            }
            const { vanPageScroller } = page;
            const index = vanPageScroller.findIndex((v) => v === this._scroller);
            if (index > -1) {
                page.vanPageScroller.splice(index, 1);
            }
            this._scroller = undefined;
        },
    });
}
