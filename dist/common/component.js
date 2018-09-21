import { basic } from '../mixins/basic';
import { observe } from '../mixins/observer/index';
function mapKeys(source, target, map) {
    Object.keys(map).forEach(key => {
        target[map[key]] = source[key];
    });
}
function VantComponent(sfc) {
    const options = {};
    mapKeys(sfc, options, {
        data: 'data',
        props: 'properties',
        mixins: 'behaviors',
        methods: 'methods',
        beforeCreate: 'created',
        created: 'attached',
        mounted: 'ready',
        destroyed: 'detached',
        relations: 'relations',
        classes: 'externalClasses'
    });
    // add default externalClasses
    options.externalClasses = options.externalClasses || [];
    options.externalClasses.push('custom-class');
    // add default behaviors
    options.behaviors = options.behaviors || [];
    options.behaviors.push(basic);
    // map field to form-field behavior
    if (sfc.field) {
        options.behaviors.push('wx://form-field');
    }
    // add default options
    options.options = {
        multipleSlots: true,
        addGlobalClass: true
    };
    observe(sfc, options);
    Component(options);
}
export { VantComponent };
