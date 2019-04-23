"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var basic_1 = require("../mixins/basic");
var index_1 = require("../mixins/observer/index");
function mapKeys(source, target, map) {
    Object.keys(map).forEach(function (key) {
        if (source[key]) {
            target[map[key]] = source[key];
        }
    });
}
function VantComponent(vantOptions) {
    if (vantOptions === void 0) { vantOptions = {}; }
    var _a;
    var options = {};
    mapKeys(vantOptions, options, {
        data: 'data',
        props: 'properties',
        mixins: 'behaviors',
        methods: 'methods',
        beforeCreate: 'created',
        created: 'attached',
        mounted: 'ready',
        relations: 'relations',
        destroyed: 'detached',
        classes: 'externalClasses'
    });
    var relation = vantOptions.relation;
    if (relation) {
        options.relations = Object.assign(options.relations || {}, (_a = {},
            _a["../" + relation.name + "/index"] = relation,
            _a));
    }
    // add default externalClasses
    options.externalClasses = options.externalClasses || [];
    options.externalClasses.push('custom-class');
    // add default behaviors
    options.behaviors = options.behaviors || [];
    options.behaviors.push(basic_1.basic);
    // map field to form-field behavior
    if (vantOptions.field) {
        options.behaviors.push('wx://form-field');
    }
    // add default options
    options.options = {
        multipleSlots: true,
        addGlobalClass: true
    };
    index_1.observe(vantOptions, options);
    Component(options);
}
exports.VantComponent = VantComponent;
