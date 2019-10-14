"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var behavior_1 = require("./behavior");
function observe(vantOptions, options) {
    var watch = vantOptions.watch;
    options.behaviors.push(behavior_1.behavior);
    if (watch) {
        var props_1 = options.properties || {};
        Object.keys(watch).forEach(function (key) {
            if (key in props_1) {
                var prop = props_1[key];
                if (prop === null || !('type' in prop)) {
                    prop = { type: prop };
                }
                prop.observer = watch[key];
                props_1[key] = prop;
            }
        });
        options.properties = props_1;
    }
}
exports.observe = observe;
