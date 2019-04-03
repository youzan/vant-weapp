"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var behavior_1 = require("./behavior");
var props_1 = require("./props");
function observe(vantOptions, options) {
    var watch = vantOptions.watch, computed = vantOptions.computed;
    options.behaviors.push(behavior_1.behavior);
    if (watch) {
        var props_2 = options.properties || {};
        Object.keys(watch).forEach(function (key) {
            if (key in props_2) {
                var prop = props_2[key];
                if (prop === null || !('type' in prop)) {
                    prop = { type: prop };
                }
                prop.observer = watch[key];
                props_2[key] = prop;
            }
        });
        options.properties = props_2;
    }
    if (computed) {
        options.methods = options.methods || {};
        options.methods.$options = function () { return vantOptions; };
        if (options.properties) {
            props_1.observeProps(options.properties);
        }
    }
}
exports.observe = observe;
