"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function observeProps(props) {
    if (!props) {
        return;
    }
    Object.keys(props).forEach(function (key) {
        var prop = props[key];
        if (prop === null || !('type' in prop)) {
            prop = { type: prop };
        }
        var observer = prop.observer;
        prop.observer = function () {
            if (observer) {
                if (typeof observer === 'string') {
                    observer = this[observer];
                }
                observer.apply(this, arguments);
            }
            this.set();
        };
        props[key] = prop;
    });
}
exports.observeProps = observeProps;
