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
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (observer) {
                if (typeof observer === 'string') {
                    observer = this[observer];
                }
                observer.apply(this, args);
            }
            this.set();
        };
        props[key] = prop;
    });
}
exports.observeProps = observeProps;
